// cypress.config.js
const { defineConfig } = require('cypress');
const imaps = require('imap-simple');
const { simpleParser } = require('mailparser');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://vps-3696213-x.dattaweb.com',
    testIsolation: true,
    watchForFileChanges: false,
    pageLoadTimeout: 60000,
    defaultCommandTimeout: 8000,
    chromeWebSecurity: false,

    blockHosts: [
      '*.google-analytics.com',
      '*.googletagmanager.com',
      '*.doubleclick.net',
      '*.facebook.com',
      '*.hotjar.com',
      '*.intercom.io',
      '*.gstatic.com',
      '*.fonts.gstatic.com'
    ],

    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.name === 'chrome') {
          launchOptions.args.push(
            '--disable-gpu',
            '--disable-dev-shm-usage',
            '--no-sandbox'
          );
        }
        return launchOptions;
      });

      // helpers IMAP 
      async function connectIMAP(email, appPassword) {
        const imapConfig = {
          imap: {
            user: email,
            password: appPassword,
            host: 'imap.gmail.com',
            port: 993,
            tls: true,
            authTimeout: 15000,
            // >>> FIX TLS para redes con proxy/AV que inyectan certificados <<<
            tlsOptions: {
              rejectUnauthorized: false,
              servername: 'imap.gmail.com'
            }
          }
        };
        return imaps.connect(imapConfig);
      }

      function buildGmailRaw(subjectLike, fromHint) {
        const q = [];
        q.push('newer_than:2d');
        if (subjectLike && String(subjectLike).trim()) {
          q.push(`subject:"${String(subjectLike).trim()}"`);
        }
        if (fromHint && String(fromHint).trim()) {
          q.push(`from:${String(fromHint).trim()}`);
        }
        return q.join(' ');
      }

      async function searchInBox(conn, boxName, subjectLike, fromHint) {
        try {
          await conn.openBox(boxName);
        } catch {
          return [];
        }
        const since = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toUTCString();
        const opts = { bodies: ['HEADER', 'TEXT', ''], markSeen: false };

        let results = [];
        const raw = buildGmailRaw(subjectLike, fromHint);
        if (raw) {
          try { results = await conn.search([['X-GM-RAW', raw]], opts); } catch {}
        }
        if (!results || results.length === 0) {
          try { results = await conn.search(['ALL', ['SINCE', since]], opts); } catch {}
        }
        return results || [];
      }

      function extractHtmlFromParts(parts) {
        const bodyPart = parts.find(p => p.which === '') || parts.find(p => p.which === 'TEXT');
        return bodyPart?.body || '';
      }

      const LINK_RE = /(https?:\/\/[^\s"'<>]+\/auth\/resetPassword\?[^"'<>]+)/i;

      //  TASKS 
      on('task', {
        async gmailPeek({ limit = 15 } = {}) {
          const email = config.env.GMAIL_ADDRESS;
          const appPassword = config.env.GMAIL_APP_PASSWORD;
          if (!email || !appPassword) throw new Error('Faltan GMAIL_ADDRESS / GMAIL_APP_PASSWORD');

          const conn = await connectIMAP(email, appPassword);
          const boxesToTry = ['INBOX', '[Gmail]/All Mail', '[Gmail]/Spam'];
          const subjects = [];

          for (const box of boxesToTry) {
            let results = [];
            try { results = await searchInBox(conn, box); } catch {}
            results.slice().reverse().forEach(item => {
              const header = item.parts.find(p => p.which === 'HEADER')?.body || {};
              const subj = (header.subject && header.subject[0]) || '(sin asunto)';
              subjects.push(`[${box}] ${subj}`);
            });
            if (subjects.length >= limit) break;
          }

          await conn.end();
          return subjects.slice(0, limit);
        },

        async gmailLastResetLink({ subjectLike, fromHint, timeoutMs = 120000 } = {}) {
          const email = config.env.GMAIL_ADDRESS;
          const appPassword = config.env.GMAIL_APP_PASSWORD;
          if (!email || !appPassword) throw new Error('Faltan GMAIL_ADDRESS / GMAIL_APP_PASSWORD');

          const started = Date.now();

          async function poll() {
            const conn = await connectIMAP(email, appPassword);
            const boxesToTry = ['INBOX', '[Gmail]/All Mail', '[Gmail]/Spam'];

            for (const box of boxesToTry) {
              let results = [];
              try { results = await searchInBox(conn, box, subjectLike, fromHint); } catch {}

              for (const item of results.slice().reverse()) {
                const raw = extractHtmlFromParts(item.parts);
                let html = '';
                try {
                  const parsed = await simpleParser(raw);
                  html = parsed.html || parsed.textAsHtml || parsed.text || raw || '';
                } catch {
                  html = raw || '';
                }
                const m = html && html.match(LINK_RE);
                if (m) {
                  await conn.end();
                  return m[1];
                }
              }
            }

            await conn.end();

            if (Date.now() - started > timeoutMs) {
              throw new Error('No llegó/No se encontró el correo con el link de reset dentro del timeout (INBOX/All Mail/Spam).');
            }
            await new Promise(r => setTimeout(r, 3000));
            return poll();
          }

          return poll();
        }
      });

      return config;
    }
  }
});

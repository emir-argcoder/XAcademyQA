// cypress/support/commands.js
import { SELECTORES } from './constantesRestablec'

// HELPERS 
const _asLista = (a) => (Array.isArray(a) ? a : [a]).filter(Boolean)

// timeout por defecto 3s
const _verTextos = (asserts, timeout = 3000) =>
  _asLista(asserts).forEach((t) =>
    cy.contains(t, { matchCase: false, timeout }).should('be.visible')
  );

const _verInputsReset = () => {
  cy.get(SELECTORES.restablecerConfirmacion.campoNuevaContraseña)
    .scrollIntoView()
    .should('be.visible')
  cy.get(SELECTORES.restablecerConfirmacion.campoConfirmarContraseña)
    .scrollIntoView()
    .should('be.visible')
  cy.get(SELECTORES.restablecerConfirmacion.botonGuardar)
    .scrollIntoView()
    .should('be.visible')
}

// DEBUG GMAIL (lista últimos mails)
Cypress.Commands.add('gmailPeek', (limit = 10, box = 'INBOX') => {
  return cy.task('gmailPeek', { limit, box })
})

// PANTALLA INICIAL 
Cypress.Commands.add('irYVerPantallaInicialReset', () => {
  cy.log('🔹 CP001 - Ir a forgotPassword')
  cy.visit(SELECTORES.urls.login)
  cy.get(SELECTORES.login.linkOlvidaste).click()

  cy.url().should('include', SELECTORES.urls.restablecer);
  cy.get(SELECTORES.restablecer.campoEmail).scrollIntoView().should('be.visible')
  cy.get(SELECTORES.restablecer.botonEnviar).scrollIntoView().should('be.visible')
  cy.log('✅ CP001 OK')
})

// CP002: ver toast (si aparece), esperar POST y redirect
Cypress.Commands.add('enviarEmailDeRecupero', (email, asserts = null) => {
  cy.log('🔹 CP002 - Enviar email de recupero');
  cy.intercept('POST', '**/api/backend/auth/forgot-password').as('forgot')

  cy.get(SELECTORES.restablecer.campoEmail).clear().type(email);
  cy.get(SELECTORES.restablecer.botonEnviar).should('not.be.disabled').click()

  // breve pausa para que monte el toast
  cy.wait(500);

  // validación del toast (si se pidió)
  if (asserts) {
    const re = new RegExp(String(asserts).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')
    cy.contains(re, { timeout: 6000, includeShadowDom: true }).should('be.visible')
  }

  // backend OK
  cy.wait('@forgot').its('response.statusCode').should('be.oneOf', [200, 201, 204])

  // redirect a login
  cy.location('pathname', { timeout: 20000 }).should('match', /\/auth\/login$/)
  cy.log('✅ CP002 OK')
});

Cypress.Commands.add('debeSeguirEnPantallaInicialReset', () => {
  cy.url().should('include', SELECTORES.urls.restablecer);
  cy.get(SELECTORES.restablecer.campoEmail).scrollIntoView().should('be.visible')
  cy.get(SELECTORES.restablecer.botonEnviar).scrollIntoView().should('be.visible')
})

// Validación nativa 
Cypress.Commands.add('assertValidationMessage', (selector, asserts) => {
  cy.get(selector).then(($el) => {
    const msg = $el[0].validationMessage || ''
    expect(msg).to.contain(asserts)
  })
})

// GMAIL: obtener link y abrir pantalla de confirmación 
Cypress.Commands.add('gmail_obtenerResetUrl', (opts = {}) => {
  const subjectLike = opts.subjectLike || Cypress.env('RESET_SUBJECT_HINT') || null
  const fromHint    = opts.fromHint    || Cypress.env('RESET_FROM_HINT')    || null
  const timeoutMs   = opts.timeoutMs   || 90000
  return cy.task('gmailLastResetLink', { subjectLike, fromHint, timeoutMs })
})

Cypress.Commands.add('abrirPantallaConfirmacionDesdeGmail', (opts = {}) => {
  cy.log('🔹 CP003 - Abrir link de restablecimiento (Gmail)')
  return cy.gmail_obtenerResetUrl(opts).then((resetUrl) => {
    expect(resetUrl, 'resetUrl desde Gmail').to.match(/^https?:\/\/.+\/auth\/resetPassword\?/)
    cy.visit(resetUrl)
    cy.url().should('include', SELECTORES.urls.restablecerConfirmacion)
    _verInputsReset()
    cy.log('✅ CP003 OK')
  })
})

Cypress.Commands.add('debeSeguirEnPantallaConfirmacion', () => {
  cy.url().should('include', SELECTORES.urls.restablecerConfirmacion)
  _verInputsReset()
})

// ACCIÓN FINAL + MENSAJES 
Cypress.Commands.add('guardarNuevaContraseña', (pwd, pwd2) => {
  cy.get(SELECTORES.restablecerConfirmacion.campoNuevaContraseña)
    .scrollIntoView()
    .clear()
    .type(pwd)
  cy.get(SELECTORES.restablecerConfirmacion.campoConfirmarContraseña)
    .scrollIntoView()
    .clear()
    .type(pwd2)
  cy.get(SELECTORES.restablecerConfirmacion.botonGuardar)
    .scrollIntoView()
    .click()
})

Cypress.Commands.add('verMensajes', (asserts) => _verTextos(asserts)); // usa tu JSON (éxito o error)

// ORQUESTADOR MINI (1 sola función para todos los CP) 
Cypress.Commands.add('ejecutarCasoReset', (caso, data) => {
  const t = (caso?.título || '').trim()

  // CP001
  if (/^CP001\b/i.test(t)) return cy.irYVerPantallaInicialReset()

  // CP002
  if (/^CP002\b/i.test(t)) {
    cy.irYVerPantallaInicialReset()
    return cy.enviarEmailDeRecupero(caso.email, caso.asserts)
  }

  // CP003
  if (/^CP003\b/i.test(t)) {
    return cy.abrirPantallaConfirmacionDesdeGmail({ subjectLike: 'restablecer', timeoutMs: 90000 })
  }

  // CP004
  if (/^CP004\b/i.test(t)) {
    const pwd2 = caso.confirmarContraseña || caso.cofirmarContraseña || caso.nuevaContraseña
    cy.guardarNuevaContraseña(caso.nuevaContraseña, pwd2)
    return cy.verMensajes(caso.asserts)
  }

  // CP005, CP006, CP007 (negativos de email)
  if (/^CP00[5-7]\b/i.test(t)) {
    cy.log(`🔹 ${t.split(' - ')[0]} - Negativo (email inválido/no registrado/no verificado)`)
    cy.irYVerPantallaInicialReset()
    cy.enviarEmailDeRecupero(caso.email, null)
    cy.verMensajes(caso.asserts)
    return cy.debeSeguirEnPantallaInicialReset()
  }

  // CP009 / CP010 / CP0010 / CC10  (negativos en nueva/confirmar contraseña)
  if (/^(CP009|CP010|CP0010|CC10)\b/i.test(t)) {
    cy.log(`🔹 ${t.split(' - ')[0]} - Negativo (nueva/confirmar inválidas/distintas)`)

    // Disparamos el mail de reset al Gmail de prueba (para garantizar que haya enlace fresco)
    const gmail = Cypress.env('GMAIL_ADDRESS')
    cy.irYVerPantallaInicialReset()
    cy.enviarEmailDeRecupero(gmail, null)

    // Abrimos por Gmail (más margen de espera)
    cy.abrirPantallaConfirmacionDesdeGmail({ subjectLike: 'restablecer', timeoutMs: 120000 });

    // Intentamos guardar con los valores del caso
    cy.guardarNuevaContraseña(caso.nuevaContraseña, caso.confirmarContraseña);

    // Validamos el/los mensajes de error
    cy.verMensajes(caso.asserts);

    // Seguimos en la pantalla de confirmación
    return cy.debeSeguirEnPantallaConfirmacion();
  }

  throw new Error(`CP no reconocido: ${t}`);
});



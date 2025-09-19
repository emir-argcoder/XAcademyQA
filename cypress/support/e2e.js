// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './comandosLogin'
import './comandosRestablecimiento'

/*Cypress.on('window:before:load', (win) => {
  if (win.navigator && win.navigator.serviceWorker) {
    win.navigator.serviceWorker.getRegistrations().then((regs) => {
      regs.forEach((reg) => reg.unregister());
    });
  }
});*/

// evita que errores de la app corten el test de apertura
//Cypress.on('uncaught:exception', () => false);

// Alternatively you can use CommonJS syntax:
// require('./commands')
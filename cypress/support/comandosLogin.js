// cypress/support/comandosLogin.js
import { SELECTORES as S } from './constantesLogin'

Cypress.Commands.add('validarPantallaLogin', () => {
  // Siempre visibles
  cy.get(S.email).should('be.visible')
  cy.get(S.password).should('be.visible')
  cy.get(S.submit).should('be.visible')

  // Accesos adicionales visibles
  cy.get(S.btnGoogle).should('be.visible')
  cy.get(S.linkReset).should('be.visible')
  cy.get(S.linkRegistro).should('be.visible')
  cy.get(S.linkEvento).should('be.visible')
});


Cypress.Commands.add('iniciarSesion', ({ email, contraseña }) => {
  cy.get(S.email).clear()
  if (email) {
    cy.get(S.email).type(email)
  }

  cy.get(S.password).clear()
  if (contraseña) {
    cy.get(S.password).type(contraseña, { log: false })
  }

  cy.get(S.submit).click()
});


Cypress.Commands.add('cerrarSesion', () => {
  cy.get(S.userMenu, { timeout: 10000 }).should('be.visible').click({ force: true });
  cy.get(S.logout,   { timeout: 10000 }).should('be.visible').click({ force: true });
});


// Valida errores: por contenido (app) y por validationMessage (HTML5).
Cypress.Commands.add('validarErroresLogin', ({ email, contraseña, asserts }) => {
  const esperados = Array.isArray(asserts) ? asserts : [asserts];

  esperados.forEach((msg) => {
    if (msg === 'Completa este campo') {
      if (!email) {
        cy.get(S.email).then(($el) => {
          expect($el[0].validationMessage).to.eq('Completa este campo')
        })
      }
      if (!contraseña) {
        cy.get(S.password).then(($el) => {
          expect($el[0].validationMessage).to.eq('Completa este campo')
        });
      }
    } else {
      const re = new RegExp(msg.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')
      cy.contains(re, { includeShadowDom: true, timeout: 15000 }).should('be.visible')
    }
  })

  cy.location('pathname').then((p) => {
    expect(p.includes('/auth/login') || p.includes('/login')).to.be.true
  })
})

// Flujo feliz
Cypress.Commands.add('flujoValido', ({ email, contraseña, asserts }) => {
  cy.iniciarSesion({ email, contraseña })
  cy.url().should('include', asserts)   // valida que estás en home
  cy.cerrarSesion()                    // hace logout (sin validar regreso a login)
})


// Flujo inválido
Cypress.Commands.add('flujoInvalido', (caso) => {
  cy.iniciarSesion(caso)
  cy.validarErroresLogin(caso)
})

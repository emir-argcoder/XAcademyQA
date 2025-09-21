Cypress.Commands.add('login', (email, password) => {
  cy.visit('https://vps-3696213-x.dattaweb.com/auth/login')
  cy.get('[data-cy="input-email"]').type(email)
  cy.get('[data-cy="input-password"]').type(password)
  cy.get('[data-cy="btn-login"]').click()
})
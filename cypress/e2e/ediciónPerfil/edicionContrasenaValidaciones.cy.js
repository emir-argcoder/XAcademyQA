describe('Cambio pass / Sad path', () => {
    it('Edición de nueva contraseña, ingresando una que no cumple requisitos de validación.', () => {
        cy.login()

        cy.get('.lg\\:flex > :nth-child(2) > .relative')
            .should('be.visible')
            .click()

        cy.get('[data-cy="btn-editar-password"]').click()

        cy.get('[data-cy="input-password-actual"]').type(Cypress.env('LOGIN_PASS'))

        cy.get('[data-cy="input-password-nueva"]').type('pass1')

        cy.get('[data-cy="btn-guardar-password"]').click()
    })
})
describe('Cambio pass / Sad path', () => {
    it('Edita contraseñas, colocando una clave actual errónea.', () => {
        cy.login()

        cy.get('.lg\\:flex > :nth-child(2) > .relative')
            .should('be.visible')
            .click()

        cy.get('[data-cy="btn-editar-password"]').click()

        cy.get('[data-cy="input-password-actual"]').type('PassActual123!')

        cy.get('[data-cy="input-password-nueva"]').type('OtraPass123!')

        cy.get('[data-cy="btn-guardar-password"]').click()
    })
})
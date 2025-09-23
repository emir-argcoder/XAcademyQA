describe('Cambio pass / Sad path', () => {
    it('Borra el nombre y verifica botón de guardar', () => {
        cy.login()

        cy.get('.lg\\:flex > :nth-child(2) > .relative')
            .should('be.visible')
            .click()

        cy.contains('button', 'Editar perfil').click()
describe('Edición de nombre usuario', () => {
    it('Borra el nombre y verifica botón de guardar', () => {
        cy.login()

        cy.get('.lg\\:flex > :nth-child(2) > .relative')
            .should('be.visible')
            .click()

        cy.contains('button', 'Editar perfil').click()
        cy.get('[data-cy="input-nombre"]').clear().type('Nuevo Nombre')
        cy.get('[data-cy="btn-guardar"]').click()

        cy.get('[data-cy="input-nombre"]')
            .click()
    })
})
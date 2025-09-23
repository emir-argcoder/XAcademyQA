describe('Visualización Gestión de Salas en Main', () => {
    it('Logueo de credenciales usuario Cliente', () => {

        cy.viewport(1280, 800)

        cy.visit('https://vps-3696213-x.dattaweb.com/auth/login')

        cy.get('[data-cy="input-email"]')
            .first()
            .should('be.visible')
            .clear()
            .type(Cypress.env('LOGIN_USER') || 'sommymarsqui@gmail.com')

        cy.get('[data-cy="input-password"]')
            .first()
            .should('be.visible')
            .clear()
            .type(Cypress.env('LOGIN_PASS') || 'Pass123#')

        cy.get('[data-cy="btn-login"]')
            .filter(':visible')
            .first()
            .click()

        cy.url({ timeout: 10000 }).should('not.include', '/auth/login')

        // click en el menú "Gestión de Salas"
        cy.contains('Gestionar Salas')
            .click()

        cy.get('.container')
            .first()
            .should('be.visible')
            .invoke('text')
            .then((textoPantalla) => {
                cy.log('Texto de la pantalla: ' + textoPantalla)
                console.log('Texto de la pantalla: ' + textoPantalla)
            })
    })
})
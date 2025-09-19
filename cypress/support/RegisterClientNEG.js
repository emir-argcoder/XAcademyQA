
export class RegisterClientNEG {
    fillForm(razonSocial, cuit, provincia, localidad, direccion, telefono, email, confirmarEmail, password, repetirPassword) {
        if (razonSocial) cy.get('[data-cy="input-razon-social"]').type(razonSocial);
        if (cuit) cy.get('[data-cy="input-cuit"]').type(cuit);
        if (provincia) {
            cy.get('[data-cy="select-provincia"]').click();
            cy.get('[data-cy^="option-provincia-"] span[data-label="true"]')
            .contains('Buenos Aires')
            .click({ force: true });
        }
        if (localidad) {
            cy.get('[data-cy="select-localidad"]').click().type('Coronel Dorrego');
            cy.get('[data-cy^="option-localidad-"] span[data-label="true"]')
            .contains('Coronel Dorrego')
            .click({ force: true });
        }
        if (direccion) cy.get('[data-cy="input-direccion"]').type(direccion);
        if (telefono) cy.get('[data-cy="input-telefono"]').type(telefono);
        if (email) cy.get('[data-cy="input-email"]').type(email);
        if (confirmarEmail) cy.get('[data-cy="input-confirmar-email"]').type(confirmarEmail);
        if (password) cy.get('[data-cy="input-password"]').type(password);
        if (repetirPassword) cy.get('[data-cy="input-repetir-password"]').type(repetirPassword);
    }

    submitForm() {
        cy.get('[data-cy="btn-registrarse"]').click();
    }

    // Método adicional para limpiar formulario si es necesario
    clearForm() {
        cy.get('[data-cy="input-razon-social"]').clear();
        cy.get('[data-cy="input-cuit"]').clear();
        cy.get('[data-cy="input-direccion"]').clear();
        cy.get('[data-cy="input-telefono"]').clear();
        cy.get('[data-cy="input-email"]').clear();
        cy.get('[data-cy="input-confirmar-email"]').clear();
        cy.get('[data-cy="input-password"]').clear();
        cy.get('[data-cy="input-repetir-password"]').clear();
    }
}
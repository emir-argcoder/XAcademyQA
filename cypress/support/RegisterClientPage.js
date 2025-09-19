// cypress/support/RegisterClientPage.js

export class RegisterClientPage {
    get inputRazonSocial() {
        return cy.get('[data-cy=input-razon-social]');
    }

    get inputCuit() {
        return cy.get('[data-cy=input-cuit]');
    }

    get inputProvincia() {
        return cy.get('[data-cy=select-provincia]').type('Buenos Aires{enter}');
      
    }

    get inputLocalidad() {
        return cy.get('[data-cy=select-localidad]').type('Arana{enter}');
             
    }

    get inputDireccion() {
        return cy.get('[data-cy=input-direccion]');
    }

    get inputTelefono() {
        return cy.get('[data-cy=input-telefono]');
    }

    get inputEmail() {
        return cy.get('[data-cy=input-email]');
    }

    get inputConfirmarEmail() {
        return cy.get('[data-cy=input-confirmar-email]');
    }

    get inputPassword() {
        return cy.get('[data-cy=input-password]');
    }

    get inputRepetirPassword() {
        return cy.get('[data-cy=input-repetir-password]');
    }

    get switchEstablecimiento() {
        return cy.get('[data-cy=switch-establecimiento]');
    }

    get btnRegistrarse() {
        return cy.get('[data-cy=btn-registrarse]');
    }

    get btnLoginLink() {
        return cy.get('[data-cy=btn-login-link]');
    }

    fillForm(razonSocial, cuit, provincia, localidad, direccion, telefono, email, confirmarEmail, password, repetirPassword) {
        this.inputRazonSocial.type(razonSocial);
        this.inputCuit.type(cuit);
        this.inputProvincia.type(provincia);
        this.inputLocalidad.type(localidad);
        this.inputDireccion.type(direccion);
        this.inputTelefono.type(telefono);
        this.inputEmail.type(email);
        this.inputConfirmarEmail.type(confirmarEmail);
        this.inputPassword.type(password);
        this.inputRepetirPassword.type(repetirPassword);
    }

    submitForm() {
        this.btnRegistrarse.click();
    }
}
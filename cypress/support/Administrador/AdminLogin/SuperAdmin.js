export class SuperAdmin {
    constructor() {
        this.BtnLogin = () => cy.get('a[href="/auth/login"]');
        this.email = () => cy.get('[data-cy="input-email"]');
        this.password = () => cy.get('[data-cy="input-password"]');
        this.ButtonLogin = () => cy.get('[data-cy="btn-login"]');
    }

    visitandoPaginaAdmin() {
        cy.visit('https://vps-3696213-x.dattaweb.com/')
    };

    accederLogin(){
        this.BtnLogin().click();
    }
    
    credencialesValidasAdmin(user,password) {
        this.email().type(user);
        this.password().type(password);
    }

    clickButtonLogin() {
        this.ButtonLogin().click();
    }

}
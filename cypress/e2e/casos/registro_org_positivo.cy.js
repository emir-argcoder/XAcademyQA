

import {RegisterClientPage} from '../../support/RegisterClientPage.js';
describe('Registro Organizador evento', () => {
    const registerClientPage = new RegisterClientPage();
    const baseUrl = 'https://vps-3696213-x.dattaweb.com/auth/registerClient';

    beforeEach(() => {
        cy.visit(baseUrl);
    });

    it('Muestra registro exitoso con datos validos', () => {
        registerClientPage.fillForm('EMPRESA 777 SA', '30305012347', 'Buenos Aires', 'Arana', 'Calle Miraflores 1275', '1135112345', 'pba777@email.com', 'pba777@email.com', 'Password123..', 'Password123..');
        registerClientPage.submitForm();
        
       
    });

 

   
});
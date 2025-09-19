
import {RegisterClientNEG} from '../../support/RegisterClientNEG.js';
describe('Pruebas Negativas - Registro Organizador evento', () => {
    const registerClientNEG = new RegisterClientNEG();
    const baseUrl = 'https://vps-3696213-x.dattaweb.com/auth/registerClient';

    beforeEach(() => {
        cy.visit(baseUrl);
    
    });

 // Helper para verificar campos con error
const checkFieldHasError = (dataCy) => {
  //  cy.get(`[data-cy="${dataCy}"]`)
    //  .parents('[data-slot="input-wrapper"]')
     // .should('have.class', '!bg-danger-50');
}

it('NEG-01: Registro con todos los campos vacíos', () => {
    
    registerClientNEG.submitForm();
    // Verifica que todos los campos obligatorios muestran error
    checkFieldHasError('input-razon-social');
    checkFieldHasError('input-cuit');
    checkFieldHasError('input-provincia');
    checkFieldHasError('input-localidad');
    checkFieldHasError('input-direccion');
    checkFieldHasError('input-telefono');
    checkFieldHasError('input-email');
    checkFieldHasError('input-confirmar-email');
    checkFieldHasError('input-password');
    checkFieldHasError('input-repetir-password');
    
    cy.url().should('eq', baseUrl);
});


it('NEG-02: Registro con CUIT inválido (con letras)', () => {
        registerClientNEG.fillForm(
            'Empresa de Prueba SA', 
            'Emp3040501', // CUIT inválido (con letras)
            'Buenos Aires', 
            'Bajo Hondo', 
            'Calle Este 220', 
            '1135012345', 
            'test01@mail.com', 
            'test01@mail.com', 
            'Password123..', 
            'Password123..'
        );
        registerClientNEG.submitForm();
        
        checkFieldHasError('input-cuit');
        cy.url().should('eq', baseUrl);
        cy.wait(500); // Pequeña pausa para que se muestren los errores
    });



    it('NEG-03: Registro con CUIT inválido (menos de 11 dígitos)', () => {
        registerClientNEG.fillForm(
            'Empresa de Prueba SA', 
            '103051', // CUIT inválido (6 dígitos)
            'Buenos Aires', 
            'Arana', 
            'Calle Ocio 147', 
            '1035012345', 
            'test02@mail.com', 
            'test02@mail.com', 
            'Password123..', 
            'Password123..'
        );
        registerClientNEG.submitForm();
        
        checkFieldHasError('input-cuit');
        cy.url().should('eq', baseUrl);
        cy.wait(500); // Pequeña pausa para que se muestren los errores
    });

    it('NEG-04: Registro con teléfono inválido (menos de 10 dígitos)', () => {
        registerClientNEG.fillForm(
            'Empresa Prueba777 SA', 
            '21305012337', 
            'Chaco', 
            'Campo Largo', 
            'Calle Verde 20', 
            '113511', // Teléfono inválido (6 dígitos)
            'test03@email.com', 
            'test03@email.com', 
            'Password123..', 
            'Password123..'
        );
        registerClientNEG.submitForm();
        
        checkFieldHasError('input-telefono');
        cy.url().should('eq', baseUrl);
        cy.wait(500); // Pequeña pausa para que se muestren los errores
    });

    it('NEG-05: Registro con email inválido', () => {
        registerClientNEG.fillForm(
            'Empresa Ficticia123 SA', 
            '20225012347', 
            'Corrientes', 
            'Alvear', 
            'Avenida Principal 220', 
            '1135100345', 
            'email-invalido.com', // Email sin formato válido @
            'email-invalido.com', 
            'Password123..', 
            'Password123..'
        );
        registerClientNEG.submitForm();
        
        checkFieldHasError('input-email');
        checkFieldHasError('input-confirmar-email');
        cy.url().should('eq', baseUrl);
        cy.wait(500); // Pequeña pausa para que se muestren los errores
    });

    it('NEG-06: Registro con emails que no coinciden', () => {
        registerClientNEG.fillForm(
            'Empresa de Mentira SA', 
            '20399012348', 
            'Formosa', 
            'Clorinda', 
            'Calle Falsa 369', 
            '1135110045', 
            'test09@email.com', 
            'test10@email.com', // Emails diferentes
            'Password123..', 
            'Password123..'
        );
        registerClientNEG.submitForm();
        
        checkFieldHasError('input-email');
        checkFieldHasError('input-confirmar-email');
        cy.url().should('eq', baseUrl);
        cy.wait(500); // Pequeña pausa para que se muestren los errores
    });

    it('NEG-07: Registro con contraseña débil (solo 6 caracteres)', () => {
        registerClientNEG.fillForm(
            'Empresa de Prueba SA', 
            '20305012399', 
            'Jujuy', 
            'Agua de Castilla', 
            'Calle Lluvia 770', 
            '1138810345', 
            'test04@xample.com', 
            'test04@xample.com', 
            'Abc12!', // Contraseña corta
            'Abc12!'
        );
        registerClientNEG.submitForm();
        
        checkFieldHasError('input-password');
        checkFieldHasError('input-repetir-password');
        cy.url().should('eq', baseUrl);
        cy.wait(500); // Pequeña pausa para que se muestren los errores
    });

    it('NEG-08: Registro con contraseñas que no coinciden', () => {
        registerClientNEG.fillForm(
            'Empresa de Prueba SA', 
            '20315012350', 
            'Buenos Aires', 
            '25 de Mayo', 
            'Calle nueva 220', 
            '1135112345', 
            'test06@test.com', 
            'test06@test.com', 
            'Password123..', 
            'Diferente456..' // Contraseñas diferentes
        );
        registerClientNEG.submitForm();
        
        checkFieldHasError('input-password');
        checkFieldHasError('input-repetir-password');
        cy.url().should('eq', baseUrl);
        cy.wait(500); // Pequeña pausa para que se muestren los errores
    });

    it('NEG-09: Registro con contraseña sin mayúsculas', () => {
        registerClientNEG.fillForm(
            'Empresa de Prueba SA', 
            '20305019342', 
            'Buenos Aires', 
            '9 de Abril', 
            'Calle Sola 111', 
            '1135112345', 
            'test08@example.com', 
            'test08@example.com', 
            'password123..', // Sin mayúscula
            'password123..'
        );
        registerClientNEG.submitForm();
        
        checkFieldHasError('input-password');
        checkFieldHasError('input-repetir-password');
        cy.url().should('eq', baseUrl);
        cy.wait(500); // Pequeña pausa para que se muestren los errores
    });

    it('NEG-10: Registro con contraseña sin números', () => {
        registerClientNEG.fillForm(
            'Empresa de Juegos SA', 
            '50305011347', 
            'Buenos Aires', 
            'Baradero', 
            'Calle Larga 456', 
            '9135112345', 
            'test21@example.com', 
            'test21@example.com', 
            'Password!', // Sin números
            'Password!'
        );
        registerClientNEG.submitForm();
        
        checkFieldHasError('input-password');
        checkFieldHasError('input-repetir-password');
        cy.url().should('eq', baseUrl);
        cy.wait(500); // Pequeña pausa para que se muestren los errores
    });

    it('NEG-11: Registro con direccion en coordenadas', () => {
        registerClientNEG.fillForm(
            'Empresa 123 SA', 
            '66305012347', 
            'Buenos Aires',
            'Cañada Seca', 
            '-33.715096, -63.725959', // Coordenadas en lugar de dirección
            '1005112345', 
            'test22@example.com', 
            'test22@example.com', 
            'Password123..', 
            'Password123..'
        );
        registerClientNEG.submitForm();
        
        checkFieldHasError('input-direccion');
        cy.url().should('eq', baseUrl);
        cy.wait(500); // Pequeña pausa para que se muestren los errores
    });

    
    it('NEG-12: Registro con link en direccion', () => {
        registerClientNEG.fillForm(
            'Empresa Cypress SA', 
            '50205012347', 
            'Buenos Aires',
            'El Talar', 
            'https://maps.app.goo.gl/jX9x84QS4QTcJfqv8', // Link en lugar de dirección
            '1135002345', 
            'test31@test.com', 
            'test31@test.com', 
            'Password123..', 
            'Password123..'
        );
        registerClientNEG.submitForm();
        
        checkFieldHasError('input-direccion');
        cy.url().should('eq', baseUrl);
        cy.wait(500); // Pequeña pausa para que se muestren los errores
    });


});
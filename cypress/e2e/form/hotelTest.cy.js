import invalidData from '../../fixtures/invalidData.json';
import validData from '../../fixtures/validData.json';
describe('Enviar mensaje', { testIsolation: false }, () => {
    beforeEach(() => {
        cy.visit('https://automationintesting.online/');
        cy.clearAllLocalStorage();
        cy.clearAllSessionStorage();
        cy.clearAllCookies();  
    });
    it('Validar envío de form vacío', () => {
        cy.log('Envío de form de contacto en blanco...');
        cy.get('.col-sm-7 > .btn').click();
        cy.get(':nth-child(4) > .rbc-row-bg > :nth-child(2)').should('be.visible').wait(1000);
        cy.get(':nth-child(4) > .rbc-row-bg > :nth-child(6)').should('be.visible').wait(1000).scrollIntoView();
        cy.dragAndDrop(':nth-child(4) > .rbc-row-bg > :nth-child(2)', ':nth-child(4) > .rbc-row-bg > :nth-child(6)');
        cy.pause();
        
        
        cy.get('#submitContact').click();
        cy.get('.alert').should('be.visible');

        cy.fixture('errorMessages.json').then((errors) => {
            errors.emptyFormErrors.forEach((errorMessage) => {
                cy.completP(errorMessage);});});
    });
    it.skip('Validar envío de form con data incorrecta', () => {
        cy.log('Set de datos incorrectos...');
        cy.fillFormFromJsonFile('invalidData.json');
         cy.get('[data-testid="ContactDescription"]').type('asdasd');
        cy.get('#submitContact').click();
        cy.get('.alert').should('be.visible');
        cy.fixture('errorMessages.json').then((errors) => {
            errors.invalidFormErrors.forEach((errorMessage) => {
                cy.completP(errorMessage);
            });
        });
    });
    it.skip('Validar envío de form con data correcta', () => {
        cy.log('Set de datos correctos...');
        cy.get('.img-responsive').should('be.visible');
        cy.fillFormFromJsonFile('validData.json');
        cy.get('[data-testid="ContactDescription"]').eq(0).type('loremTestloremTestloremTestloremTestloremTestloremTestloremTestloremTestloremTestlo');
        cy.get('#submitContact').click();
    });
});
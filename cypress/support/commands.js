
Cypress.Commands.add('fillRegistrationForm', (userData = {}) => {
  const defaultData = {
    razonSocial: 'Empresa77 SA',
    cuit: '20345678901',
    direccion: 'Av. Libertd 123',
    provincia: 'Buenos Aires',
    localidad: 'Arana',
    telefono: '3511234567',
    email: 'empresa@ejemplo.com',
    password: 'Password123!'
  };

  const data = { ...defaultData, ...userData };

  cy.get('[data-cy="input-razon-social"]').type(data.razonSocial);
  cy.get('[data-cy="input-cuit"]').type(data.cuit);
  cy.get('[data-cy="input-provincia"]').type('{enter}');
  cy.get('[data-cy="input-localidad"]').type('{enter}');   
  cy.get('[data-cy="input-direccion"]').type(data.direccion);
  cy.get('[data-cy="input-telefono"]').type(data.telefono);
  cy.get('[data-cy="input-email"]').type(data.email);
  cy.get('[data-cy="input-confirmar-email"]').type(data.email);
  cy.get('[data-cy="input-password"]').type(data.password);
  cy.get('[data-cy="input-repetir-password"]').type(data.password);
});

Cypress.Commands.add('submitRegistrationForm', () => {
  cy.get('[data-cy="btn-registrarse"]').click();
});
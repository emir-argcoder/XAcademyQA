// cypress/support/commands.js
Cypress.Commands.add('fillEventForm', (eventDetails) => {
  // Rellenar el formulario del evento
  cy.get('[data-cy="input-titulo"]').clear().type(eventDetails.title);
  cy.get('data-slot="label"]').type(eventDetails.date);
 cy.get('[data-slot="selectorIcon"]').click(eventDetails.age);
  cy.get('[data-cy="select-edad"] > .inline-flex').click();
  // Asumimos que "género" podría ser un dropdown o radio buttons
  cy.get('[data-slot="value"]').select(eventDetails.genre);
  
  cy.get('data-slot="input"').type(eventDetails.time);
  cy.get('[data-cy="event-duration"]').type(eventDetails.duration);
  cy.get('data-slot="label"').clear().type(eventDetails.location);
  cy.get('[data-cy="input-info"]').clear().type(eventDetails.description);
});
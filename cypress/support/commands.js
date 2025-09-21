// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --

//import '@4tw/cypress-drag-drop';

// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
Cypress.Commands.add('completP', (paragraph) => {
    cy.get('p').contains(paragraph)
});

Cypress.Commands.add('inputPlaceH', (placeholder, value) => {
    cy.get(`input[placeholder="${placeholder}"]`)
      .should('be.visible')   // Verifica que el campo esté visible
      .clear()                // Limpia el campo antes de ingresar el valor
      .type(value);           // Ingresa el valor
});

// Comando para completar el formulario desde un archivo JSON
Cypress.Commands.add('fillFormFromJsonFile', (fileName) => {
    cy.fixture(fileName).then((formData) => {
        for (const [placeholder, value] of Object.entries(formData)) {
            cy.inputPlaceH(placeholder, value);
        }
    });
});

// Comando específico para datos válidos
Cypress.Commands.add('CompleteForm', (json) => {
    cy.fillFormFromJson(json);
});

// Comando específico para datos inválidos

// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});


Cypress.Commands.add('dragAndDrop', (subject, target) => {
    Cypress.log({
        name: 'DRAGNDROP',
        message: `Dragging element ${subject} to ${target}`,
        consoleProps: () => {
            return {
                subject: subject,
                target: target
            };
        }
    });
    const BUTTON_INDEX = 0;
    const SLOPPY_CLICK_THRESHOLD = 20;
    cy.get(target)
        .first()
        .then($target => {
            let coordsDrop = $target[0].getBoundingClientRect();
            cy.get(subject)
                .first()
                .then(subject => {
                    const coordsDrag = subject[0].getBoundingClientRect();
                    cy.wrap(subject)
                        .trigger('mousedown', {
                            button: BUTTON_INDEX,
                            clientX: coordsDrag.x,
                            clientY: coordsDrag.y,
                            force: true
                        })
                        .trigger('mousemove', {
                            button: BUTTON_INDEX,
                            clientX: coordsDrag.x + SLOPPY_CLICK_THRESHOLD,
                            clientY: coordsDrag.y,
                            force: true
                        });
                    cy.get('body')
                        .wait(500)
                        .trigger('mousemove', {
                            button: BUTTON_INDEX,
                            clientX: coordsDrop.x,
                            clientY: coordsDrop.y,
                            force: true
                        })
                        .wait(500)
                        .trigger('mouseup', {force: true});
                });
        });
});

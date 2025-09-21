import '../../support/commandsEstefania';
describe('Intentar adquirir entradas en evento agotado', () => {
  it('Debería mostrar un mensaje de entradas agotadas y no permitir la compra', () => {
    // 1. Login
    cy.login('ecvago@hotmail.com', '123456789.Mm')

    // 2. Ir a la página 4 de eventos
    cy.get('[aria-label="pagination item 4"]').click()

    // 3. Seleccionar el evento con entradas agotadas (id 302)
    cy.get('[data-cy="btn-ver-evento-302"]').click()

    // 4. Presionar "Adquirir entrada"
    cy.contains('Adquirir entrada').click()

    // 5. Validar que el botón "+" de la categoría General está deshabilitado
    cy.get('[data-cy="btn-sumar-General"]').should('be.disabled')

    // 6. Validar que también está deshabilitado el botón "Continuar"
    cy.get('[data-cy="btn-continuar"]').should('be.disabled')
  })
})
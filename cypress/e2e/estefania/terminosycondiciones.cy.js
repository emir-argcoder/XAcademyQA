// cypress/e2e/cp-sin-terminos.cy.js
import '../../support/commandsEstefania';

describe('Intentar comprar entrada paga sin aceptar términos y condiciones', () => {
  it('No debería permitir continuar si no se aceptan los términos', () => {
    const EMAIL = 'ecvago@hotmail.com'
    const PASS = '123456789.Mm'
    
    // 1. Login
    cy.login(EMAIL, PASS)

    // 2. Ir a la página de eventos (página 5)
    cy.get('[aria-label="pagination item 5"]').click()

    // 3. Entrar al evento (id 93)
    cy.get('[data-cy="btn-ver-evento-93"]').click()

    // 4. Presionar "Adquirir entrada"
    cy.contains('Adquirir entrada').click()

    // 5. Seleccionar sector General
    cy.get('.mx-auto > .relative > .transition-all').click()

    // 6. Aumentar cantidad de entradas en 1
    cy.get('.p-4 > .gap-4 > :nth-child(3)').click()

    // 7. Presionar "Comprar entrada"
    cy.get('.mt-6 > .w-full').click()

    // 8. Validar que el checkbox de T&C NO está marcado
    cy.get('.group > .font-inherit').should('not.be.checked')

    // 9. Validar que el botón de confirmar compra está deshabilitado
    cy.get(':nth-child(4) > :nth-child(1) > .z-0').should('be.disabled')

    // 10. Log para evidenciar que el flujo funciona correctamente
    cy.log('✅ No se puede continuar sin aceptar términos y condiciones (botón deshabilitado)')
  })
})



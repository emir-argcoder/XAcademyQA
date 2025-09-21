import '../../support/commandsEstefania';
describe('Compra de entrada de pago con múltiples tickets', () => {
  it('Selecciona un evento de pago y el sector Sin Butacas', () => {
    const EMAIL = 'ecvago@hotmail.com'
    const PASS = '123456789.Mm'

    // 1. Login
    cy.login(EMAIL, PASS)

    // 2. Ir al evento de pago
    cy.get('[data-cy="btn-ver-evento-2"]').click()

    // 3. Presionar "Adquirir entrada"
    cy.contains('Adquirir entrada').click()

 // 4. Seleccionar sector "Sin Butacas"
cy.get('[style="left: 16px; top: 118.611px; width: 131.077px; height: 364.103px; position: absolute; background-color: rgb(156, 232, 115); transition: background-color 0.3s;"]')
  .contains('Sin Butacas')
  .click()

      // 5. Capturar el precio de la entrada
cy.get('.flex-col > div > .text-sm')
  .invoke('text')
  .then(precioTexto => {
    // Eliminar "Precio: $" y convertir a número
    const precioNumero = Number(precioTexto.replace(/[^\d]/g, ''))
    cy.wrap(precioNumero).as('precioUnitario')
  })

// 6. Seleccionar 2 entradas (hacer click dos veces)
cy.get('.p-4 > .gap-4 > :nth-child(3)').click().click()

// 7. Presionar el botón de continuar compra o siguiente paso
cy.get('.mt-6 > .w-full').click()
  // Definimos la cantidad de entradas seleccionadas (2 clicks)
const cantidadEntradas = 2
cy.wrap(cantidadEntradas).as('cantidadEntradas')

// Calculamos el total esperado
cy.get('@precioUnitario').then(precio => {
  cy.get('@cantidadEntradas').then(cantidad => {
    const totalEsperado = precio * cantidad
    cy.wrap(totalEsperado).as('totalEsperado')
    cy.log(`💰 Total esperado: $${totalEsperado}`)
  })
// Capturar el total mostrado en el resumen
cy.get('.space-y-4 > .justify-between > :nth-child(2)')
  .invoke('text')
  .then(textoTotalApp => {
    // Convertimos a número y eliminamos decimales
    const totalApp = Math.round(Number(textoTotalApp.replace(/\D/g, '')) / 100)
    
    // Obtenemos el total esperado que calculamos antes
    cy.get('@totalEsperado').then(totalEsperado => {
      if (totalApp !== totalEsperado) {
        Cypress.log({
          name: 'BUG',
          message: `Total incorrecto: esperado $${totalEsperado}, encontrado $${totalApp}`,
          consoleProps: () => ({ Esperado: totalEsperado, Obtenido: totalApp })
        })
      } else {
        cy.log(`✅ Total correcto: $${totalApp}`)
      }
    })
  })


})
})

})

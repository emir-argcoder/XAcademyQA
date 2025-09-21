import '../../support/commandsEstefania';
describe('Intentar adquirir entradas en evento pasado', () => {
  it('Debería impedir la compra, pero actualmente permite generarla (BUG)', () => {
    // 1. Login
    cy.login('ecvago@hotmail.com', '123456789.Mm')

    // 2. Ir a la página de eventos donde está el evento pasado
    cy.get('[aria-label="pagination item 4"]').click()

    // 3. Capturar nombre y fecha desde la card del evento pasado
    cy.get('[data-cy="evento-card-277"]').then(($card) => {
      const nombreEvento = $card.find('[data-cy="evento-titulo"]').text().trim()
      const fechaTexto = $card.find('[data-cy="evento-fecha"]').text().trim() // selector correcto para la fecha

      cy.wrap(nombreEvento).as('eventoPasado')
      cy.wrap(fechaTexto).as('fechaEventoPasado')
      console.log('📅 Fecha capturada del evento pasado:', fechaTexto)
    })

    // 4. Hacer click en "Ver evento"
    cy.get('[data-cy="btn-ver-evento-277"]').click()

    // 5. Hacer click en "Adquirir entrada"
    cy.contains('Adquirir entrada').click()

    // 6. Seleccionar "Campo"
    cy.contains('Campo').click()

    // 7. Seleccionar la opción de cantidad
    cy.get('.p-4 > .gap-4 > :nth-child(3)').click()

    // 8. Continuar
    cy.get('.mt-6 > .w-full').click()

    // 9. Generar entrada gratuita
    cy.get('.mt-6 > .z-0').click()

    // 10. Validar redirección a "Mis entradas"
    cy.url().should('include', '/tickets/list')

    // 11. Validar que el evento pasado aparece en "Mis entradas"
    cy.get('@eventoPasado').then((evento) => {
      cy.contains(evento).should('be.visible')
    })

    // 12. Validar que la fecha es pasada (BUG si se pudo comprar)
    cy.get('@fechaEventoPasado').then((fechaTexto) => {
      // Parseo de fecha en español
      const match = fechaTexto.match(/(\d{1,2}) de (\w+) de (\d{4})/)
      if (match) {
        const dia = parseInt(match[1])
        const mesNombre = match[2].toLowerCase()
        const año = parseInt(match[3])

        const meses = {
          enero:0, febrero:1, marzo:2, abril:3, mayo:4, junio:5,
          julio:6, agosto:7, septiembre:8, octubre:9, noviembre:10, diciembre:11
        }

        const fechaEvento = new Date(año, meses[mesNombre], dia)
        const hoy = new Date()

        if (fechaEvento < hoy) {
          Cypress.log({
            name: 'BUG',
            message: `Se generó entrada para un evento pasado (${fechaTexto}).`,
            consoleProps: () => ({
              FechaEvento: fechaEvento.toLocaleDateString(),
              FechaActual: hoy.toLocaleDateString()
            })
          })
        } else {
          cy.log(`✅ La fecha del evento no está en el pasado: ${fechaTexto}`)
        }
      } else {
        cy.log('⚠️ No se pudo parsear la fecha del evento:', fechaTexto)
      }
    })
  })
})

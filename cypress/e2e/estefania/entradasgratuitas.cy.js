import '../../support/commandsEstefania';
describe('Adquirir entradas de eventos gratuitos', () => {
  it('Debería permitir adquirir entradas gratuitas y mostrarlas en Mis entradas', () => {
    // 1. Loguearse con comando reutilizable
    cy.login('ecvago@hotmail.com', '123456789.Mm')

    // 2. Ir a la página de eventos
    cy.get('[aria-label="pagination item 4"]').click()

    // 3. Capturar nombre, fecha, hora y lugar desde la card del evento
    cy.get('[data-cy="evento-card-277"]').then(($card) => {
      const nombreEvento = $card.find('[data-cy="evento-titulo"]').text().trim()
      const fechaEvento = $card.find('[data-cy="ticket-lugar"]').text().trim() // según tu indicación
      const horaEvento = $card.find('[data-cy="evento-horario"]').text().trim()
      const lugarEvento = $card.find('div.mt-2 > [data-cy="evento-lugar"]').text().trim()

      cy.wrap(nombreEvento).as('eventoSeleccionado')
      cy.wrap(fechaEvento).as('fechaSeleccionada')
      cy.wrap(horaEvento).as('horaSeleccionada')
      cy.wrap(lugarEvento).as('lugarSeleccionado')
    })

    // 4. Presionar "Ver evento"
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


    // 9. Validar redirección a "Mis entradas"
    cy.url().should('include', '/tickets/list')

    // 10. Validar que el mismo evento aparece en "Mis entradas"
    cy.get('@eventoSeleccionado').then((evento) => {
      cy.contains(evento).should('be.visible')
    })

    // 11. Validar fecha en Mis entradas
    cy.get('@fechaSeleccionada').then((fecha) => {
      cy.get('[data-cy="ticket-card-277"] > .flex-auto > :nth-child(2)').then(($fechaCard) => {
        const fechaMisEntradas = $fechaCard.text().trim()
        if (fechaMisEntradas !== fecha) {
          Cypress.log({
            name: 'BUG',
            message: `Fecha esperada: "${fecha}" | Fecha mostrada: "${fechaMisEntradas}"`,
            consoleProps: () => ({ Esperado: fecha, Obtenido: fechaMisEntradas })
          })
        } else {
          cy.log(`✅ Fecha correcta: "${fechaMisEntradas}"`)
        }
      })
    })

    // 12. Validar hora en Mis entradas
    cy.get('@horaSeleccionada').then((hora) => {
      cy.get('[data-cy="ticket-card-277"] > .flex-auto > :nth-child(3)').then(($horaCard) => {
        const horaMisEntradas = $horaCard.text().trim()
        if (horaMisEntradas !== hora) {
          Cypress.log({
            name: 'BUG',
            message: `Hora esperada: "${hora}" | Hora mostrada: "${horaMisEntradas}"`,
            consoleProps: () => ({ Esperado: hora, Obtenido: horaMisEntradas })
          })
        } else {
          cy.log(`✅ Hora correcta: "${horaMisEntradas}"`)
        }
      })
    })

    // 13. Validar lugar en Mis entradas
    cy.get('@lugarSeleccionado').then((lugar) => {
      cy.get('[data-cy="ticket-card-277"] > .flex-auto > .mt-2 > [data-cy="ticket-lugar"]').then(($lugarCard) => {
        const lugarMisEntradas = $lugarCard.text().trim()
        if (lugarMisEntradas !== lugar) {
          Cypress.log({
            name: 'BUG',
            message: `Lugar esperado: "${lugar}" | Lugar mostrado: "${lugarMisEntradas}"`,
            consoleProps: () => ({ Esperado: lugar, Obtenido: lugarMisEntradas })
          })
        } else {
          cy.log(`✅ Lugar correcto: "${lugarMisEntradas}"`)
        }
      })
    })
  
   // 14. Hacer click en "Ver todas las entradas" de la entrada correcta
    cy.get('@eventoSeleccionado').then((evento) => {
      cy.contains('[data-cy="ticket-card-277"]', evento).within(() => {
        cy.contains('Ver todas las entradas').click()
      })
    })
/// 15. En la ventana de listado de entradas, capturar el lugar y hacer click en "Ver entrada"

  cy.contains('Ver entrada').click()

// 18. Validar datos dentro del grid de la entrada individual
cy.get('.jsx-5f8db642f9d65369.grid.grid-cols-2.gap-4').should('be.visible').within(() => {

  // Fecha (primer elemento con la clase flex items-center space-x-3)
  cy.get('.jsx-5f8db642f9d65369.flex.items-center.space-x-3').eq(0).then(($fecha) => {
    const fechaGrid = $fecha.text().trim()
    cy.get('@fechaSeleccionada').then((fechaOriginal) => {
      if (fechaGrid !== fechaOriginal) {
        Cypress.log({
          name: 'BUG',
          message: `Fecha en grid incorrecta: esperada "${fechaOriginal}", encontrada "${fechaGrid}"`,
          consoleProps: () => ({ Esperado: fechaOriginal, Obtenido: fechaGrid })
        })
      } else {
        cy.log(`✅ Fecha correcta en grid: "${fechaGrid}"`)
      }
    })
  })

  // Hora (segundo elemento con la misma clase)
  cy.get('.jsx-5f8db642f9d65369.flex.items-center.space-x-3').eq(1).then(($hora) => {
    const horaGrid = $hora.text().trim()
    cy.get('@horaSeleccionada').then((horaOriginal) => {
      if (horaGrid !== horaOriginal) {
        Cypress.log({
          name: 'BUG',
          message: `Hora en grid incorrecta: esperada "${horaOriginal}", encontrada "${horaGrid}"`,
          consoleProps: () => ({ Esperado: horaOriginal, Obtenido: horaGrid })
        })
      } else {
        cy.log(`✅ Hora correcta en grid: "${horaGrid}"`)
      }
    })
  })

  // Lugar
  cy.get('.jsx-5f8db642f9d65369.text-onSurface').then(($lugar) => {
    const lugarGrid = $lugar.text().trim()
    cy.get('@lugarSeleccionado').then((lugarOriginal) => {
      if (lugarGrid !== lugarOriginal) {
        Cypress.log({
          name: 'BUG',
          message: `Lugar en grid incorrecto: esperado "${lugarOriginal}", encontrado "${lugarGrid}"`,
          consoleProps: () => ({ Esperado: lugarOriginal, Obtenido: lugarGrid })
        })
      } else {
        cy.log(`✅ Lugar correcto en grid: "${lugarGrid}"`)
      }
    })
  })
})


 })
})
 

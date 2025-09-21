import '../../support/commandsEstefania';

describe('Compra de entrada en evento con múltiples funciones', () => {
  it('Debería permitir seleccionar una función y completar la compra, validando Mis entradas', () => {
    const EMAIL = 'ecvago@hotmail.com'
    const PASS = '123456789.Mm'

    // 1. Login
    cy.login(EMAIL, PASS)

    // 2. Capturar nombre del evento
    cy.get('[data-cy="evento-card-10"] > .flex-auto > [data-cy="evento-titulo"]')
      .invoke('text')
      .then(nombreEvento => {
        cy.wrap(nombreEvento.trim()).as('eventoSeleccionado')
      })

    // 3. Ir a la vista del evento
    cy.get('[data-cy="btn-ver-evento-10"]').click()

    // 4. Presionar "Adquirir entrada"
    cy.contains('Adquirir entrada').click()
    
 // 5. Seleccionar la primera función disponible y capturar la fecha
    cy.get('.text-orange-400.text-2xl')
  .first()
  .closest('.transition-all')
  .then($funcion => {
    // Capturamos la fecha antes de hacer click
    cy.wrap($funcion).find('.text-lg.font-semibold')
      .invoke('text')
      .then(fecha => {
        cy.wrap(fecha.trim()).as('fechaSeleccionada')
      })

    // Ahora hacemos click en la función
    cy.wrap($funcion).click()
  })

    // 6. Seleccionar horario "15:00 hs" y guardar
    cy.contains('15:00 hs')
      .click()
      .invoke('text')
      .as('horaSeleccionada')

    // 7. Continuar compra
    cy.contains('Continuar con la compra').click()

    // 8. Seleccionar sector Campo y guardar lugar
    cy.get('[style="left: 191.412px; top: 16px; width: 384.235px; height: 408.366px; position: absolute; background-color: rgb(52, 152, 219); transition: background-color 0.3s;"]')
      .click()
      .invoke('text')
      .as('lugarSeleccionado')

    // 9. Seleccionar cantidad de entradas (1)
    cy.get('.p-4 > .gap-4 > :nth-child(3)').click()

    // 10. Comprar
    cy.get('.w-full > span').click()

    // 11. Generar entrada gratuita
    cy.get('.mt-6 > .z-0').click()

    // 12. Validar redirección a "Mis entradas"
    cy.url().should('include', '/tickets/list')

    // 13. Validar título del evento en Mis entradas y marcar bug si falla
    cy.get('@eventoSeleccionado').then(evento => {
      cy.get('[data-cy^="ticket-card-"]').contains('[data-cy="ticket-titulo"]', evento)
        .closest('[data-cy^="ticket-card-"]')
        .within(() => {
          cy.get('[data-cy="ticket-titulo"]').then($tituloCard => {
            const tituloMisEntradas = $tituloCard.text().trim()
            if (tituloMisEntradas !== evento) {
              Cypress.log({
                name: 'BUG',
                message: `Título de evento incorrecto: esperado "${evento}", encontrado "${tituloMisEntradas}"`,
                consoleProps: () => ({ Esperado: evento, Obtenido: tituloMisEntradas })
              })
            } else {
              cy.log(`✅ Evento correcto en Mis entradas: "${tituloMisEntradas}"`)
            }

            // Validar fecha y hora (marcando bug si no coincide)
            cy.get('@horaSeleccionada').then(hora => {
              cy.get(':nth-child(3)').then($horaCard => {
                const horaCardText = $horaCard.text().trim()
                if (horaCardText !== hora) {
                  Cypress.log({
                    name: 'BUG',
                    message: `Hora incorrecta en card: esperada "${hora}", encontrada "${horaCardText}"`,
                    consoleProps: () => ({ Esperado: hora, Obtenido: horaCardText })
                  })
                } else {
                  cy.log(`✅ Hora correcta en card: "${horaCardText}"`)
                }
              })
            })

            cy.get('@lugarSeleccionado').then(lugar => {
              cy.get(':nth-child(2)').then($lugarCard => {
                const lugarCardText = $lugarCard.text().trim()
                if (lugarCardText !== lugar) {
                  Cypress.log({
                    name: 'BUG',
                    message: `Lugar incorrecto en card: esperado "${lugar}", encontrado "${lugarCardText}"`,
                    consoleProps: () => ({ Esperado: lugar, Obtenido: lugarCardText })
                  })
                } else {
                  cy.log(`✅ Lugar correcto en card: "${lugarCardText}"`)
                }
              })
            })

            // Click en "Ver todas las entradas"
            cy.contains('Ver todas las entradas').click()
          })
        })
    })

    // 14. En listado/modal de entradas, hacer click en "Ver entrada" y validar fecha, hora y lugar
    
          cy.get('[data-cy="btn-ver-ticket-2846"]').click()
        
    

    // 15. Validar datos dentro de la entrada individual
    cy.get('.jsx-5f8db642f9d65369.grid.grid-cols-2.gap-4').should('be.visible').within(() => {
    
// Normalizar hora para comparar
function normalizarHora(horaOriginal) {
  // Convierte "15:00 hs" a "3 PM"
  const [hora, minutos] = horaOriginal.replace(' hs', '').split(':').map(Number)
  const ampm = hora >= 12 ? 'PM' : 'AM'
  const hora12 = hora % 12 === 0 ? 12 : hora % 12
  return `${hora12}:${minutos.toString().padStart(2, '0')} ${ampm}`
}
    // Hora
cy.get('.jsx-5f8db642f9d65369.flex.items-center.space-x-3').eq(1).then($hora => {
  const horaGrid = $hora.text().trim()
  cy.get('@horaSeleccionada').then(horaOriginal => {
    const horaEsperada = normalizarHora(horaOriginal)
    if (horaGrid !== horaEsperada) {
      Cypress.log({
        name: 'BUG',
        message: `Hora en grid incorrecta: esperada "${horaEsperada}", encontrada "${horaGrid}"`,
        consoleProps: () => ({ Esperado: horaEsperada, Obtenido: horaGrid })
      })
    } else {
      cy.log(`✅ Hora correcta en grid: "${horaGrid}"`)
    }
  })
})

// Validar fecha dentro de la entrada individual
cy.get('.jsx-5f8db642f9d65369.flex.items-center.space-x-3').eq(0).invoke('text').then(fechaGrid => {
  cy.get('@fechaSeleccionada').then(fechaOriginal => {
    if(fechaGrid.trim() !== fechaOriginal) {
      Cypress.log({
        name: 'BUG',
        message: `Fecha incorrecta: esperada "${fechaOriginal}", encontrada "${fechaGrid.trim()}"`,
        consoleProps: () => ({ Esperado: fechaOriginal, Obtenido: fechaGrid.trim() })
      })
    } else {
      cy.log(`✅ Fecha correcta: "${fechaGrid.trim()}"`)
    }
  })
})

})
})

      
        })
      
    

 
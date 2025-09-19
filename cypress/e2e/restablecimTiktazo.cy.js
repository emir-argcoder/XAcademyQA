
const data = require('../fixtures/datosRestablecimiento.json')

describe('Restablecimiento de contraseña', () => {

  // Camino feliz completo: CP001 → CP004
  it('Camino feliz (CP001→CP004)', () => {
    cy.intercept({ method: '*', url: '**/api/backend/auth/**' }).as('authCall')

    data.casosVálidos.forEach((caso) => {
      cy.ejecutarCasoReset(caso, data)

      // log de backend durante CP002
      if ((caso.título || '').startsWith('CP002')) {
        cy.wait('@authCall', { timeout: 15000 }).then(({ request, response }) => {
          cy.log('METHOD:', request.method)
          cy.log('URL:', request.url)
          cy.log('STATUS:', response && response.statusCode)
        });

        // debug: listar últimos mails (para confirmar llegada a Gmail)
        cy.gmailPeek(15);
      }
    })
    })

  // Negativos: CP005, CP006, CP007, CP009, CP010
  ;['CP005','CP006','CP007','CP009','CP0010'].forEach((cp) => {
    const caso = data.casosInválidos.find(c => (c.título || '').trim().startsWith(cp))
    const titulo = caso ? caso.título : `FALTA EN FIXTURE: ${cp}`

    it(titulo, () => {
      expect(caso, `El fixture debe incluir un caso cuyo título empiece con ${cp}`).to.exist
      cy.ejecutarCasoReset(caso, data)
    })
  })
})


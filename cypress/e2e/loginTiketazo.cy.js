

const data = require('../fixtures/datosLogin.json')
const URL_LOGIN = 'https://vps-3696213-x.dattaweb.com/auth/login'

describe('UI de Login', () => {
  it('La pantalla de login muestra todos sus elementos', () => {
    cy.visit(URL_LOGIN)
    cy.validarPantallaLogin()
  });
});

describe('Pruebas de Login', () => {
  it(data.casoVálido.título, () => {
    cy.visit(URL_LOGIN);
    cy.flujoValido(data.casoVálido);
  });

  data.casosInválidos.forEach((caso) => {
    it(caso.título, () => {
      cy.visit(URL_LOGIN);
      cy.flujoInvalido(caso);
    });
  });
});




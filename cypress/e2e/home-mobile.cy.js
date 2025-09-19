describe('CP02 - Botón Acceso redirige al login', () => {
  beforeEach(() => {
  cy.viewport(360, 768)
  cy.visit('https://ticketazo.com.ar/');
  });

  it('clic en botón Acceso', () => {
  cy.contains('button', 'Login').click({ force: true })
  });

  it('interruptor de tema', () => {
  cy.get('input[role="switch"]').first().click({ force: true });
  });

  it('buscador, ingresar texto, buscar evento, adquirir entrada', () => {
  cy.get('input[placeholder*="Busca tu próxima función"]', { timeout: 10000 })
  .should('be.visible').type('Tesis cervantes');
  cy.contains('button', 'Ver evento').click()
  cy.contains('button', 'Adquirir entrada').click();
  });

  it('buscador, ingresar texto, buscar evento, salir del evento', () => {
  cy.get('input[placeholder*="Busca tu próxima función"]', { timeout: 10000 })
  .should('be.visible').type('Tesis cervantes');
  cy.contains('button', 'Ver evento').click()
  cy.get('.sticky.top-5.left-3.bg-secondary.text-white.p-3.rounded-full.shadow-lg.z-50').should('be.visible').click()
  });

  it('buscador, ingresar texto, limpiar campo', () => {
  cy.get('input[placeholder*="Busca tu próxima función"]', { timeout: 10000 })
  .should('be.visible').type('Tesis cervantes');
  cy.get('input[placeholder*="Busca tu próxima función"]').clear()
  });

  it('abrir menú y seleccionar categoría Teatro', () => {
  cy.get('div.space-y-1').should('exist').filter(':visible').click()
  cy.get('button[aria-label="Categoría"]').should('exist').filter(':visible').click()
  cy.contains('Teatro').should('exist').filter(':visible').click()
 })

  it('seleccionar checkbox', () => {
  cy.get('div.space-y-1').click()
  cy.get('label[for="locationFilter"]').filter(':visible').click()
  });

  it('seleccion de provincias', () => {
  cy.contains('Provincia').click({ force: true })
  cy.get('[role="listbox"]').contains('Buenos Aires').click({ force: true })
 });


  it('Ticketazo footer', () => {
    cy.get('footer').scrollIntoView();
    cy.contains('Ticketazo').should('be.visible');
    cy.contains('Somos una plataforma web enfocada en la venta de entradas para eventos culturales, recitales, conferencias y mucho más. En Ticketazo nos esforzamos por ofrecer comisiones de servicio reducidas y una experiencia de compra fluida y transparente.').should('be.visible');
  });

  it('Contacto footer', () => {
    cy.contains('Contacto').should('be.visible');
    cy.contains('Teléfono: +54 9 11 1234-5678').should('be.visible');
    cy.contains('info@ticketazo.com').should('be.visible')
    cy.contains('Dirección: Av. Cultura 2025, Ciudad Autónoma de Buenos Aires').should('be.visible');
  });

  it('Información Legal footer', () => {
    cy.contains('Información Legal').should('be.visible');
    cy.contains('Inscripción: CUIT 30-12345678-9').should('be.visible');
    cy.contains('Ingresos Brutos: Nº 12345-6').should('be.visible');
    cy.contains('Responsable Inscripto ante el IVA').should('be.visible');
  });

  it('NO debería aceptar provincia no listada', () => {
  cy.get('div.space-y-1').filter(':visible').click()
  cy.get('button[aria-label="Provincia"]').filter(':visible').click()
  cy.get('[role="listbox"]').should('be.visible')
  cy.get('[role="listbox"]').contains('Atlantis').should('not.exist')
  })

  it('NO debería mostrar correo incorrecto en footer', () => {
    cy.get('footer').scrollIntoView();
    cy.contains('info@ticketazo.com').should('exist');
    cy.contains('info@ticketazo.org').should('not.exist');
  });

  it('NO debería navegar a una página inexistente en el paginador', () => {
    cy.contains('li[role="button"]', '99').should('not.exist');
  });
});



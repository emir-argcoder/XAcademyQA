describe('CP02 - Botón Acceso redirige al login', () => {
  beforeEach(() => {
    cy.viewport(1360, 768)
    cy.visit('https://ticketazo.com.ar/');
  });

  it('clic en botón Acceso', () => {
    cy.contains('button', 'Login').should('be.visible')
    cy.contains('Login').first().click()
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
    cy.get('.sticky.top-5.left-3.bg-secondary.text-white.p-3.rounded-full.shadow-lg.z-50')
      .should('be.visible').click()
  });

  it('buscador, ingresar texto, limpiar campo', () => {
    cy.get('input[placeholder*="Busca tu próxima función"]', { timeout: 10000 })
      .should('be.visible').type('Tesis cervantes');
    cy.get('input[placeholder*="Busca tu próxima función"]').clear()
  });

  it('calendario', () => {
    cy.get('button[aria-label="Calendario"]').click();
    cy.contains('30').click();
    cy.get('button[aria-label="Calendario"]').click();
  });

  it('navegación por categorías', () => {
    cy.contains('button', 'Categoría').click();
    cy.contains('Teatro').should('be.visible').click();
  });

  it('seleccionar checkbox', () => {
    cy.get('label[for="locationFilter"]').click()
  });

  it('seleccion de provincias', () => {
    cy.contains('Provincia').click()
    cy.get('[role="listbox"]').contains('Buenos Aires').should('exist').click({ force: true })
  });

  it('tarjeta de evento', () => {
    cy.get('[data-cy="evento-card-4"]').within(() => {
      cy.get('[data-cy^="evento-img"]', { timeout: 10000 })
        .should('exist').and('have.attr', 'data-loaded', 'true')
      cy.get('[data-cy="evento-titulo"]').should('exist')
      cy.get('[data-cy="evento-fecha"]').should('exist')
      cy.get('[data-cy="evento-horario"]').should('exist')
      cy.get('[data-cy="evento-lugar"]').should('exist').and('be.visible')
      cy.contains('button', 'Ver evento').should('exist')
    });
  });

  it('paginador', () => {
    cy.contains('li[role="button"]', '2').click()
    cy.wait(2000)
    cy.contains('li[role="button"]', '3').click()
    cy.wait(2000)
    cy.contains('li[role="button"]', '1').click()
    cy.wait(2000)
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

  //pruebas negativas

  it('NO debería aceptar provincia no listada', () => {
    cy.contains('span', 'Provincia').click();
    cy.get('[role="listbox"]').contains('Atlantis').should('not.exist'); 
  });

  it('NO debería mostrar correo incorrecto en footer', () => {
    cy.get('footer').scrollIntoView();
    cy.contains('info@ticketazo.com').should('exist');
    cy.contains('info@ticketazo.org').should('not.exist');
  });

  it('NO debería navegar a una página inexistente en el paginador', () => {
    cy.contains('li[role="button"]', '99').should('not.exist');
 });
});

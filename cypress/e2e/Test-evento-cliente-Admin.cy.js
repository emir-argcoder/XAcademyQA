import { EventoAdminn } from '../support/Administrador/AdminEvento/eventoAdmin';
import { ClientesRegistrados } from '../support/Administrador/AdminUsuario/Clientes';
import { SuperAdmin } from '../support/Administrador/AdminLogin/SuperAdmin';

const evento = new EventoAdminn();
const cliente = new ClientesRegistrados();
const admin = new SuperAdmin();

describe('Tareas relacionadas con el admin', () => {
  beforeEach('visitando la pagina', () => {
    cy.clearCookies();
    cy.clearLocalStorage();
    admin.visitandoPaginaAdmin();
    cy.get('.justify-end > .text-sm').click();
    admin.credencialesValidasAdmin("admin@admin.com", "admin");
    admin.clickButtonLogin();
  })


  it('TC-001: En Creado, buscar nombre del evento X → cambiar a Rechazado → verificar en Rechazado si se encuentra el evento X', () => {
    //Nombre del Evento: F90
    //Cambiar estado Creado → Rechazado
    cy.get('[type="button').eq(1).click();
    cy.wait(1000)
    evento.clickAdminEventos();
    cy.wait(5000)
    evento.bttnCreado().click();
    cy.wait(2000);
    //evento.cambiarEstadoDeEventoPorTexto('🎉💀ñ@#', 'Rechazado');
    evento.cambiarEstadoDeEventoPorTexto('Ado Hibana', 'Rechazado');
    cy.wait(2000)
    evento.clickModalAceptar();
    cy.wait(2000)
    evento.bttnRechazado().click();
    evento.verificarTextoEnGrilla('Ado Hibana');
  });

  it('TC-002: En Rechazado, buscar Email del creador del evento X → cambiar a Aprobado → verificar en Aprobado si se encuentra el evento X', () => {
    //Email creador del Evento: raulecisnero@gmail.com
    //Cambiar estado Rechazado → Aprobado
    cy.get('[type="button').eq(1).click();
    cy.wait(1000)
    evento.clickAdminEventos();
    cy.wait(5000)
    evento.bttnRechazado().click();
    cy.wait(2000);
    evento.cambiarEstadoDeEventoPorTexto('lorens_mendez@hotmail.com', 'Aprobado');
    cy.wait(2000)
    evento.clickModalAceptar();
    cy.wait(2000)
    evento.bttnAprobado().click();
    evento.verificarTextoEnGrilla('lorens_mendez@hotmail.com');
  });

  it('TC-003:En Completado, buscar evento por su nombre X → Cambiar estado a Pospuesto → cancelar modal', () => {
    //Nombre del Evento: Grupo 7
    //Cambiar estado Completado → Pospuesto 
    cy.get('[type="button').eq(1).click();
    cy.wait(1000)
    evento.clickAdminEventos();
    cy.wait(5000)
    evento.bttnCompletado().click();
    cy.wait(2000);
    evento.cambiarEstadoDeEventoPorTexto('Grupo 7', 'Pospuesto');
    cy.wait(2000)
    evento.clickModalCancelar();
    cy.wait(2000)
    evento.verificarTextoEnGrilla('Grupo 7');
  }); 

   it('TC-001: En Pendiente, buscar cliente por Nombre X → cambiar a Rechazado → verificar en Rechazado si se encuentra el cliente X.', () => {
    cy.get('[type="button').eq(1).click();
    cy.wait(1000)
    cliente.clickAdminClientes();
    cy.wait(6000);
    cliente.bttnPendiente().click();
    cy.wait(1000)
    cliente.cambiarEstadoDeClientePorTexto('yeyaTester S.A', 'Rechazado');
    cy.wait(1000)
    cliente.clickModalAceptar();
    cy.wait(4000);
    cliente.bttnRechazado().click();
    cy.wait(4000)// 4 segundos para que trabaje la api
    cliente.verificarTextoEnGrilla('rulycisnero@gmail.com');
  }); 

   it('TC-002: En Rechazado, buscar cliente por Email X → cambiar a Aprobado → verificar en Aprobado si se encuentra el cliente X.', () => {
    cy.get('[type="button').eq(1).click();
    cy.wait(1000)
    cliente.clickAdminClientes();
    cy.wait(6000);
    cliente.bttnRechazado().click();
    cliente.cambiarEstadoDeClientePorTexto('rulycisnero@gmail.com', 'Aprobado');
    cy.wait(1000)
    cliente.clickModalAceptar();
    cy.wait(4000)
    cliente.bttnAprobado().click();
    cy.wait(4000)
    cliente.verificarTextoEnGrilla('rulycisnero@gmail.com');
  });

  it('TC-003: En Aprobado, buscar cliente por Nombre X → cambiar a Rechazado → cancelar modal → verificar que el estado no cambie', () => {
    cy.get('[type="button').eq(1).click();
    cy.wait(1000)
    cliente.clickAdminClientes();
    cy.wait(6000);
    cliente.bttnAprobado().click();
    cliente.cambiarEstadoDeClientePorTexto('rulycisnero@gmail.com', 'Rechazado');
    cy.wait(1000)
    cliente.clickModalCancelar();
  });
 
  it('devuelvo al cliente su estado inicial', () => {
    cy.get('[type="button').eq(1).click();
    cy.wait(1000)
    cliente.clickAdminClientes();
    cy.wait(6000);
    cliente.bttnAprobado().click();
    cliente.cambiarEstadoDeClientePorTexto('rulycisnero@gmail.com', 'Pendiente');
    cy.wait(1000)
    cliente.clickModalAceptar();
    cy.wait(2000);
    cliente.bttnPendiente().click();
    cy.wait(6000)
    cliente.verificarTextoEnGrilla('rulycisnero@gmail.com');
  });
})
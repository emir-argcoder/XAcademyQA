describe('Evento-LugarOtro', () => {
    
    it('debería crear un nuevo evento correctamente', () => {
        // Datos del evento a crear
        cy.visit('https://vps-3696213-x.dattaweb.com');
        cy.get('.justify-end > .text-sm').click();
        cy.get('[data-cy="input-email"]').type('veroste@gmail.com');
        cy.get('[data-cy="input-password"]').type('Prueba123**');
        cy.get('[data-cy="btn-login"]').click();
        cy.get('[aria-label="Toggle menu"]').click();
        cy.wait(2000);
     
        cy.get(':nth-child(2) > .pb-4').click();
        cy.get('[data-cy="input-titulo"]').type('CHARLY GARCÍA EN VIVO - ESTADIO LUNA PARK');
        cy.get('[data-type="day"]').type('30');
        cy.get('[data-type="month"]').type('09');
        cy.get('[data-type="year"]').type('2025');

        //Hacer clic en el selector desplegable para mostrar las opciones
        cy.get('[data-cy="select-edad"]').click();
        cy.wait(2000);
        cy.contains('[data-cy="option-edad-+18"]', '+18').click();
        cy.get('[data-cy="select-genero"]').click();

        cy.wait(1000);
        cy.get('[data-cy="option-genero-Recital"]').click();
        // Para la hora:
      // Asegúrate de usar el selector específico para el segmento de la hora.
        // Si los campos están dentro de un div con el id 'time-picker'
        cy.get('[data-cy="input-horario"] [data-type="hour"]').type('20');
        cy.get('[data-cy="input-horario"] [data-type="minute"]').type('30');
        cy.get('[data-cy="input-duracion"] [data-type="hour"]').type('04');
        cy.get('[data-cy="input-duracion"] [data-type="minute"]').type('00');
        cy.get('[data-cy="select-lugar-evento"]').click();
        cy.wait(2000);
        cy.get('[data-cy="select-lugar-evento"]').click();
        cy.get('[data-cy="option-lugar-7"]').click();
        cy.get(':nth-child(9) > .relative > .inline-flex').type('Estadio Luna Park');
        cy.get(':nth-child(10) > .relative > .inline-flex').type('Perón ');
        cy.get('[data-cy="input-altura-lugar"]').type('50');
        cy.get('[data-cy="input-codigo-postal-lugar"]').type('1406');
        cy.get('[name="provincia"]').click();
        cy.wait(1000);
        cy.contains('Buenos Aires').click();
        cy.get('[placeholder="Seleccione una localidad"]').click();
        cy.wait(1000);
         cy.contains('12 de Octubre').click();
         cy.wait(2000);
         cy.get('[data-cy="input-info"]').type(' se celebran eventos en su homenaje');
        //Carga entradas
        cy.get('.rounded-b-large > .z-0').click();
        cy.wait(2000);
        cy.get('[data-slot="trigger"]').click();
        cy.wait(2000);
        cy.get('[data-key="Palco"]').click();
        cy.get('[name="capacidadEntrada0"]').type('5000');
        cy.get('[name="precioEntrada0"]').type('15000');
        cy.get('.rounded-b-large > :nth-child(2)').click();
       
          });

});
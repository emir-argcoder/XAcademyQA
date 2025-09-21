describe('Alta de Evento', () => {
    
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
        cy.get('[data-cy="input-titulo"]').type('Carrie');
        cy.get('[data-type="day"]').type('30');
        cy.get('[data-type="month"]').type('09');
        cy.get('[data-type="year"]').type('2025');

        //Hacer clic en el selector desplegable para mostrar las opciones
        cy.get('[data-cy="select-edad"]').click();
        cy.wait(2000);
        cy.contains('[data-cy="option-edad-ATP"]', 'ATP').click();
        cy.get('[data-cy="select-genero"] > .inline-flex').click();
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
        cy.get('[data-cy="option-lugar-29"]').click();
        cy.wait(3000);
        cy.contains('Seleccionar sala').click();
        cy.get('span').contains('CINE').click();
        cy.get('[data-cy="input-info"]').type('Basada en la novela de Stephen King');
        cy.get('.rounded-b-large > .z-0').click();
        cy.wait(2000);
        cy.get('.mx-auto > .relative > .transition-all').click();
        cy.wait(2000);
        cy.get('[data-slot="trigger"]').click();
        cy.wait(3000);
        cy.get('.gap-1').click();
        cy.wait|(2000);
        cy.get('[name="precioEntrada0"]').type('2500');
        cy.wait(2000);
        cy.get('.rounded-b-large > :nth-child(2)').click();
        cy.contains('Cargar Imagen Evento').click();
        cy.wait(5000);
        cy.get('input[type="file"]').selectFile('cypress/fixtures/prueba1.jpg', { force: true });
        cy.wait(2000);
        cy.get('.rounded-b-large > :nth-child(2)').click();



        //comando  
      // cy.fillEventForm(eventData);

          });

});
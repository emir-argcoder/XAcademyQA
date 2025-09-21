 it('MultipleFechaYHorario', () => {
        // Datos del evento a crear
        cy.visit('https://vps-3696213-x.dattaweb.com');
        cy.get('.justify-end > .text-sm').click();
        cy.get('[data-cy="input-email"]').type('veroste@gmail.com');
        cy.get('[data-cy="input-password"]').type('Prueba123**');
        cy.get('[data-cy="btn-login"]').click();
        cy.get('[aria-label="Toggle menu"]').click();
        cy.wait(2000);
        cy.get(':nth-child(2) > .pb-4').click();
        cy.get('[data-cy="switch-multifecha"] > .font-inherit').click();

        cy.get('[data-cy="input-titulo"]').type('Carrie');
        cy.get('[data-cy="select-edad"]').click();
        cy.contains('[data-cy="option-edad-ATP"]', 'ATP').click();
        cy.wait(1000);
        cy.get('[data-cy="select-genero"] > .inline-flex').click();
        cy.wait(1000);
        cy.get('[data-cy="option-genero-Recital"]').click();
        cy.get('[data-cy="input-duracion"] [data-type="hour"]').type('04');
        cy.get('[data-cy="input-duracion"] [data-type="minute"]').type('00');
        cy.wait(1000);
        cy.get('[data-cy="select-lugar-evento"]').click();
        cy.wait(2000);
        cy.get('[data-cy="select-lugar-evento"]').click();
        cy.get('[data-cy="option-lugar-29"]').click();
        cy.wait(2000);
        cy.contains('Seleccionar sala').click();
        cy.get('span').contains('CINE').click();
        cy.get('[data-cy="input-info"]').type('Basada en la novela de Stephen King');
        cy.get('.rounded-b-large > .z-0').click();
        cy.get('[data-cy="datepicker-fecha-0"]').within(() => {
        cy.get('[data-type="day"]').type('29');
        cy.get('[data-type="month"]').type('09');
        cy.get('[data-type="year"]').type('2025');
        cy.get('.flex-col.gap-1 > .flex-wrap')
        cy.wait(1000);
        cy.get('[data-cy="input-horario-0-0"]').type('18 00');
        
        

          });

});
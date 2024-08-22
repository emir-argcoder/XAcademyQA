describe('Student Registration Form Tests', () => {
    it('Ingresar al sistema y acceder al form',()=>{
        // Configura la URL de la página del formulario de práctica
        cy.visit('https://demoqa.com/');
        cy.get('h5').contains('Elements').click()
        cy.get('span').contains('Forms').click()
        cy.get('span').contains('Practice Form').click()
     
        

    })
  });
describe('Creacion de usuario', () => {
it ('creacion de usuario OK', () => {
cy.intercept('POST','/api/users').as('userCreado')
cy.visit('https://conduit.bondaracademy.com')
cy.contains('Sign up').click()
const numeroRandom = Math.floor(1000 + Math.random() * 9000);
cy.get('[placeholder="Username"]').type(`test${numeroRandom}`)
cy.get('[placeholder="Email"]').type(`test${numeroRandom}`)
cy.get('[placeholder="Password"]').type('lele++')
cy.get('.btn').click()
cy.wait('@userCreado').then( interception => {
    expect(interception.response.statusCode).to.equal(201)} )
   cy.log('Felicidades son unos cracks, se creó el usuario') 
})

it.only('wrong user',() => {
    cy.intercept('POST','/api/users/login').as('userCreado')
    cy.visit('https://conduit.bondaracademy.com/login') 
    cy.get('[placeholder="Email"]').type('cualquiera')
    cy.get('[placeholder="Password"]').type('lele++')
    cy.get('.btn').click() 
    cy.wait('@userCreado').then( interception => {
        expect(interception.response.statusCode).to.equal(403)} )
        cy.get('.error-messages > li').should('exist')
        cy.log('no campeon, no es por ahi')
})
} )
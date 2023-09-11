Cypress.Commands.add('login', (username, password) => {

    cy.visit('/login-group')
    cy.get('[data-cy="email"]').type(Cypress.env('testUsername'))
    cy.get('[data-cy="password"]').type(Cypress.env('testPassword'))
    cy.contains('button', 'Log in').click();


    // cy.session(
    //     Cypress.env('testUsername'), () => {
    //         cy.visit('/login-group')
    //         cy.get('[data-cy="email"]').type(Cypress.env('testUsername'))
    //         cy.get('[data-cy="password"]').type(Cypress.env('testPassword'))
    //         cy.contains('button', 'Log in').click();
    //     },
    //     {
    //         validate: () => {
    //             cy.getAllLocalStorage()
    //         }
    //     }
    // )
})
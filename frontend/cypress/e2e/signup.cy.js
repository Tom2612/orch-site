describe('signing up tests' , () => {
    it('highlights emptyFields and signs up correctly', () => {
        cy.visit('/');

        cy.get('[href="/new-group"]').click();

        cy.get('.btn').click()
        cy.get('[type="email"]').should('have.css', 'border-color', 'rgb(231, 25, 90)').should('have.class', 'error')
        cy.get('[type="password"]').should('have.css', 'border-color', 'rgb(231, 25, 90)').should('have.class', 'error')

        cy.get('[data-cy="group-name"]').should('have.css', 'border-color', 'rgb(231, 25, 90)').should('have.class', 'error')
        cy.get('[data-cy="group-region"]').should('have.css', 'border-color', 'rgb(231, 25, 90)').should('have.class', 'error')
        
        cy.get('.error-message').should('exist').should('have.text', 'Please fill in all the fields.');

        cy.get('[type="email"]').type('cypresstest@cypresstest.com')
        cy.get('[type="password"]').type('123456')
        cy.get('.btn').click()

        cy.get('[type="email"]').should('have.class', 'input')
        cy.get('[type="password"]').should('have.class', 'input')

        cy.get('[data-cy="group-name"]').should('have.css', 'border-color', 'rgb(231, 25, 90)').should('have.class', 'error')
        cy.get('[data-cy="group-region"]').should('have.css', 'border-color', 'rgb(231, 25, 90)').should('have.class', 'error')

        cy.get('[data-cy="group-name"]').type('Cypress Test')
        cy.get('.btn').click()
        cy.get('[data-cy="group-name"]').should('not.have.css', 'border-color', 'rgb(231, 25, 90)').should('not.have.class', 'error')
        
        cy.get('[data-cy="group-region"]').select('London')
        cy.get('[data-cy="group-city"]').should('be.visible').should('have.class', 'error')
        cy.get('.btn').click()

        cy.get('[data-cy="group-city"]').type('London')
        cy.get('.btn').click()

        cy.location('pathname').should('equal', '/groups/profile');
        cy.contains('Profile');
    })


})
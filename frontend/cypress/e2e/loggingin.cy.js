// const { Cypress, cy } = require('cypress');

describe('logs in', () => {
    it('using UI', () => {
        cy.visit('/');
        cy.get('[data-cy="group-login"]').click();
        cy.location('pathname').should('equal', '/login-group');

        cy.get('[data-cy="email"]').type(Cypress.env('testUsername'))
        cy.get('[data-cy="password"]').type(Cypress.env('testPassword'))
        cy.contains('button', 'Log in').click();

        cy.location('pathname').should('equal', '/groups/profile');
        cy.contains('Profile')
        .should('be.visible')
        .then(() => {
            const userString = window.localStorage.getItem('user')

            expect(userString).to.be.a('string');
            const user = JSON.parse(userString);

            expect(user).to.be.an('object');
            expect(user).to.have.keys(['email','token']);
        })

        cy.contains('button', 'Log out').click();
        cy.location('pathname').should('equal', '/login-group');
    })

    it('fails to access protected route', () => {
        cy.request({
            url: 'http://localhost:4000/api/groups/profile',
            failOnStatusCode: false,
        })
        .its('status')
        .should('equal', 401)
    })

    it('Does not log in with invalid credentials', () => {
        cy.visit('/login-group');

        cy.get('[data-cy="email"]').type(Cypress.env('testUsername'))
        cy.get('[data-cy="password"]').type('654321')
        cy.contains('button', 'Log in').click();

        cy.location('pathname').should('equal', '/login-group');
        cy.get('.error-message').should('exist');
    })

    it('tries signing up with taken username', () => {
        cy.visit('/new-group');

        cy.get('[type="email"]').type(Cypress.env('testUsername'))
        cy.get('[type="password"]').type('654321')

        cy.get('[data-cy="group-name"]').type('Cypress Test')
        cy.get('[data-cy="group-region"]').select('London')
        cy.get('[data-cy="group-city"]').should('be.visible')
        cy.get('[data-cy="group-city"]').type('London')

        cy.get('.btn').click()
        cy.get('.error-message').should('exist').should('have.text', 'Email already in use.');
    })
})
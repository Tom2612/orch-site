describe('Load webpage', () => {
  it('Visits OpenGroups group login page and types into email and password input', () => {
    cy.visit('http://localhost:3000/')

    cy.get('[data-cy="group-login"]').click();

    cy.url().should('include', '/login-group');

    cy.get('[data-cy="email"]').type('fake@fake.com').should('have.value', 'fake@fake.com');

    cy.get('[data-cy="password"]').type('123456').should('have.value', '123456');
  })
})
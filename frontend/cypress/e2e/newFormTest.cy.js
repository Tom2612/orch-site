describe('newFormTests', () => {

  it('displays error on submission with empty fields', () => {
    cy.login()
    cy.visit('/new')

    cy.contains('Submit').click();

    cy.contains('Please fill in all required fields').should('be.visible')
  })

  it('Clicking words correctly control financial help buttons', () => {
    cy.visit('/new');

    cy.get('form > :nth-child(9)').click();
    cy.get('[value="true"]').should('be.checked')
    cy.get('[value="false"]').should('not.be.checked')

    cy.get('form > :nth-child(11)').click();
    cy.get('form > :nth-child(9)')
    cy.get('[value="true"]').should('not.be.checked')
    cy.get('[value="false"]').should('be.checked')
  })

  it('successfully submits form and navigates away', () => {
    cy.login();
    cy.contains('New Concert').click()

    cy.get('[type="date"]').click().type(new Date().toISOString().split('T')[0]);

    cy.get('[name="location"]').click().type('ASD');
    cy.get('#region').select('Scotland')

    cy.get('form > :nth-child(11)').click();

    cy.get('[name="composer"]').type('qwerty')
    cy.get('[name="title"]').type('qwerty')
    cy.get('form > :nth-child(17)').click();

    cy.get('[name="instrument"]').type('qwerty')
    cy.get(':nth-child(22)').click()

    cy.get(':nth-child(24)').click();

    cy.location('pathname').should('equal', '/concerts');

  })
})
// describe('Load webpage', () => {
//   it('Visits OpenGroups group login page and types wrong into email and password input', () => {
//     cy.visit('/')

//     cy.get('[data-cy="group-login"]').click();

//     cy.url().should('include', '/login-group');

//     cy.get('[data-cy="email"]').type('fake@fake.com').should('have.value', 'fake@fake.com');

//     cy.get('[data-cy="password"]').type('123456').should('have.value', '123456');

//     cy.get('.btn').click();

//     cy.get('.error-message').should('exist');

//   })
// })

let user
before(function fetchUser () {
    cy.request('POST', 'http://localhost:4000/api/groups/login', {
        email: Cypress.env('testUsername'),
        password: Cypress.env('testPassword'),
      })
      .its('body')
      .then((res) => {
      user = res
    })
})

beforeEach(function setUser() {
  cy.visit('/', {
    onBeforeLoad(win) {
      win.localStorage.setItem('user', JSON.stringify(user))
    },
  })
})

describe('JWT', () => {
  it('makes authenticated request', () => {
    cy.request({
      url: 'http://localhost:4000/api/groups/login',
      auth: {
        bearer: user.token,
      },
    })
  })

  it('shows logged in user', () => {
    cy.get('.nav--profile > a').should('have.text', Cypress.env('testUsername'));
  })
  it('enables logout', () => {
    cy.get('.nav--profile > button').should('be.visible');
  })
})
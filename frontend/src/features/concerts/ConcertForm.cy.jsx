import React from 'react'
import ConcertForm from './ConcertForm'

describe('<ConcertForm /> for new concerts', () => {
  beforeEach(() => {
    cy.mount(<ConcertForm concert={{
      date: '',
      location: '',
      region: '',
      payStatus:'',
      pieces: [],
      instruments: []
    }}/>)
  })


  it('has no pieces or instruments when passed empty props', () => {
    cy.get('[data-cy=pieces]').should('be.empty');
    cy.get('[data-cy=instruments]').should('be.empty');
  })
})
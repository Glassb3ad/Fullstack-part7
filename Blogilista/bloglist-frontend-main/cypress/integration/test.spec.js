/* eslint-disable linebreak-style */
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })
  it('Login form is shown', function() {
    cy.contains('login')
  })
  const user = {
    name: 'XYZ3434',
    username: 'Putnam',
    password: '1234'
  }

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.request('POST', 'http://localhost:3003/api/users/', user)
      cy.get('#username').type('Putnam')
      cy.get('#password').type('1234')
      cy.get('#login-button').click()
      cy.contains('XYZ3434 logged in')
    })
    it('fails with wrong credentials', function() {
      cy.get('#username').type('Rutnam')
      cy.get('#password').type('1234')
      cy.get('#login-button').click()
      cy.contains('login')
    })})

  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/users/', user)
      cy.get('#username').type('Putnam')
      cy.get('#password').type('1234')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.get('#toggle').click()
      cy.get('#author').type('Putnam')
      cy.get('#title').type('Is semantics possible?')
      cy.get('#url').type('www.w.com')
      cy.get('#button').click()
      cy.contains('Is semantics possible? Putnam')
    })
    it('A blog can be liked', function() {
      cy.get('#toggle').click()
      cy.get('#author').type('Putnam')
      cy.get('#title').type('Is semantics possible?')
      cy.get('#url').type('www.w.com')
      cy.get('#button').click()
      cy.get('#view').click()
      cy.get('#like').click()
      cy.contains(1)
    })
    it('A blog can be liked', function() {
      cy.get('#toggle').click()
      cy.get('#author').type('Putnam')
      cy.get('#title').type('Is semantics possible?')
      cy.get('#url').type('www.w.com')
      cy.get('#button').click()
      cy.get('#view').click()
      cy.get('#remove').click()
      cy.get('.blog').should('not.exist')
    })
  })
})
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("login", (email, password, username) => {
    cy.visit('https://automationexercise.com/')
    cy.contains('a', 'Login').click()
  
    // Check that the user has indeed landed on the login page
    cy.url().should('include','/login')
  
    // Enter a username
    cy.get('.login-form').find('input[type="email"]').type(email).should ('have.value', email)
  
    // Enter a password
    cy.get('.login-form').find('input[type="password"]').type(password).should ('have.value', password)
  
    // Proceed to login to account
    cy.get('.login-form').find('form').submit()
  
    // Assert that Logged menu is shown
    cy.get('.nav.navbar-nav').contains('li','Logged').should('contain.text', username)
  })
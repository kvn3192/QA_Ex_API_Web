///<reference types='cypress'/>

let userData = {};
let price = 0;

describe('Test scenario: Create account and Log In', () => {
  beforeEach('Open the webpage', () => {
    cy.visit('https://automationexercise.com/')
    cy.fixture("user").then((data)=>{
      userData = data
    })
  })
  
  it('Happy flow: Create a valid account', () => {
    cy.contains('a', 'Signup').click()

    cy.get('.signup-form').find('input[type="text"]').type(userData.username).should('have.value', userData.username)
    cy.get('.signup-form').find('input[type="email"]').type(userData.email).should('have.value', userData.email)
    cy.get('.signup-form').find('form').submit()

    if(userData.title == 'Mr.') cy.get('#id_gender1').check()
    if(userData.title == 'Mrs.') cy.get('#id_gender2').check()

    cy.get('#password').type(userData.password)
    cy.get('#days').select(userData.birthday.day)
    cy.get('#months').select(userData.birthday.month)
    cy.get('#years').select(userData.birthday.year)
    cy.get('#first_name').type(userData.firstName)
    cy.get('#last_name').type(userData.lastName)
    cy.get('#address1').type(userData.address)
    cy.get('#country').select(userData.country)
    cy.get('#state').type(userData.state)
    cy.get('#city').type(userData.city)
    cy.get('#zipcode').type(userData.zipCode)
    cy.get('#mobile_number').type(userData.mobileNumber)

    cy.get('.login-form').find('form').submit()
    cy.url().should('eq', 'https://automationexercise.com/account_created')

    cy.get('#form').find('h2').find('b').should('contain.text', 'Account Created!')
    cy.contains('.btn.btn-primary', 'Continue').click()
    cy.contains('a', 'Logout').click()
  })

  it('Negative: Try to create an account with an existing email', () => {
    cy.contains('a', 'Signup').click()

    cy.get('.signup-form').find('input[type="text"]').type(userData.username).should('have.value', userData.username)
    cy.get('.signup-form').find('input[type="email"]').type(userData.email).should('have.value', userData.email)
    cy.get('.signup-form').find('form').submit()

    cy.get('form[action="/signup"]').find('p[style="color: red;"]').should('contain.text', 'Email Address already exist!')
  })

  it('Happy flow: LogIn with an existing and valid email', () => {
    cy.contains('a', 'Login').click()

    cy.get('.login-form').find('input[type="email"]').type(userData.email).should('have.value', userData.email)
    cy.get('.login-form').find('input[type="password"]').type(userData.password).should('have.value', userData.password)
    cy.get('.login-form').find('form').submit()
    cy.get('.nav.navbar-nav').contains('li','Logged').should('contain.text', userData.username)
  })

  it('Negative: LogIn with a non existing user', () => {
    cy.contains('a', 'Login').click()

    const invalid_email = (Math.random() + 1).toString(36).substring(7);
    const invalid_password = (Math.random() + 1).toString(36).substring(7);

    cy.get('.login-form').find('input[type="email"]').type(invalid_email).should('have.value', invalid_email)
    cy.get('.login-form').find('input[type="password"]').type(invalid_password).should('have.value', invalid_password)
    cy.get('.login-form').find('form').submit()
    cy.get('form[action="/login"]').find('p[style="color: red;"]').should('contain.text', 'Your email or password is incorrect!')
  })
})
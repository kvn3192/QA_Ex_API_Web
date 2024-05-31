///<reference types='cypress'/>


let userData = {};
let price = 0;
let totalPrice = 0;

describe('Test scenario: Add a product to the cart and buy the product', () => {
  beforeEach('Open the webpage', () => {
    cy.visit('https://automationexercise.com/')
    cy.fixture("user").then((data)=>{
      userData = data
    })
  })

  it.only('Happy flow: Buy a product', () => {
    cy.login(userData.email, userData.password, userData.username);

    cy.contains('p', 'Blue Top').parentsUntil('.col-sm-4').find('a[href="/product_details/1"]').click()

    const quantity = 5;
    cy.get('#quantity').clear().type(quantity).should('have.value', quantity)

    cy.contains('span', 'Rs.')
    cy.contains('span', 'Rs.').invoke('text').then(text => { 
      const pattern = /[0-9]+/g
      const new_price = text.match(pattern)
      price = +new_price[0]
    })
    .then(() => cy.log(price))

    cy.contains('button', 'Add to cart').click()

    cy.get('#cartModal').find('h4').should('contain.text', 'Added!')
    cy.contains('View Cart').click()

    
    cy.get('.cart_total_price')
    cy.get('.cart_total_price').invoke('text').then((text)=>{ 
      const pattern = /[0-9]+/g
      totalPrice = text.match(pattern)
      totalPrice = +totalPrice[0]
    })
    .then(() => expect(totalPrice).eq(price*quantity))

    cy.contains('Proceed To Checkout').click()
    cy.url().should('eq','https://automationexercise.com/checkout')
    cy.contains('Place Order').click()

    cy.get('#payment-form').find('.form-control[name="name_on_card"]').type(userData.payment.nameOnCard).should('have.value', userData.payment.nameOnCard)
    cy.get('#payment-form').find('.form-control.card-number[name="card_number"]').type(userData.payment.cardNumber).should('have.value', userData.payment.cardNumber)
    cy.get('#payment-form').find('.form-control.card-cvc[name="cvc"]').type(userData.payment.cvc).should('have.value', userData.payment.cvc)
    cy.get('#payment-form').find('.form-control.card-expiry-month[name="expiry_month"]').type(userData.payment.expirationMonth).should('have.value', userData.payment.expirationMonth)
    cy.get('#payment-form').find('.form-control.card-expiry-year[name="expiry_year"]').type(userData.payment.expirationYear).should('have.value', userData.payment.expirationYear)
    cy.get('#submit').click()


    
    cy.url().then(($url) => expect($url).eq('https://automationexercise.com/payment_done/'+ totalPrice))
    cy.get('#form').find('h2').find('b').should('contain.text', 'Order Placed!')
    cy.get('#form').find('p').should('contain.text', 'Congratulations! Your order has been confirmed!')

    cy.get('.btn.btn-primary').click()
  })
})
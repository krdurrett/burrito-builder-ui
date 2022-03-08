describe('Burrito Builder adding new order user flow', () => {

  beforeEach(() => {
    cy.intercept('http://localhost:3001/api/v1/orders', { fixture: 'sample_orders.json' })
    cy.visit('http://localhost:3000')
  })

  it('should not be able to submit form if name input is not filled out', () => {
    cy.get('form')
      .get('button[name="beans"]').click()
      .get('button[name="steak"]').click()
      .get('p').contains('beans, steak')
      .get('.submit-order-button').click()
      .get('p').contains('Nothing selected')
  })

   it('should not be able to submit form if no ingredients are selected', () => {
    cy.get('form')
      .get('input[name="name"]')
      .type('Kayla')
      .should('have.value', 'Kayla')
      .get('.submit-order-button').click()
      .get('p').contains('Nothing selected')
  })

  it('should be able to submit form if name is filled out and at least one ingredient selected', () => {
    cy.intercept('POST', 'http://localhost:3001/api/v1/orders', {
      statusCode: 201,
       body: {
        "name": "Kayla",
        "ingredients": ["beans", "steak"]
      }
    })
    cy.get('form')
      .get('input[name="name"]')
      .type('Kayla')
      .get('button[name="beans"]').click()
      .get('button[name="steak"]').click()
      .get('.submit-order-button').click()
      .get('.order-section')
      .get('.order').should('have.length', 3)
      .get('.order').contains('Kayla')
      .get('.order').contains('beans')
  })

})
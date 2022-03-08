describe('Burrito Builder deleting order user flow', () => {

  beforeEach(() => {
    cy.intercept('http://localhost:3001/api/v1/orders', { fixture: 'single_order.json' })
    cy.visit('http://localhost:3000')
  })

  it('should be able to delete an order once completed', () => {
    cy.intercept('DELETE', 'http://localhost:3001/api/v1/orders/1', {
      statusCode: 201
    })
    cy.intercept('http://localhost:3001/api/v1/orders', { fixture: 'empty_data.json'})
    cy.get('.delete-button').click()
      .get('.order-section').contains('No orders yet!')
  })

})
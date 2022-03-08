describe('Burrito Builder landing page user flow', () => {

  beforeEach(() => {
    cy.intercept('http://localhost:3001/api/v1/orders', { fixture: 'sample_orders.json' })
    cy.visit('http://localhost:3000')
  })

  it('should be able to see app title on page load', () => {
    cy.get('header').contains('Burrito Builder')
  })

  it('should see a form to put in new orders', () => {
    cy.get('form').contains('Submit Order')
  })

  it('should see a list of current orders', () => {
    cy.get('.order-section')
      .get('.order').should('have.length', 2)
  })

})
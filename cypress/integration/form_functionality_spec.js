describe('Burrito Builder form functionality', () => {

  beforeEach(() => {
    cy.intercept('http://localhost:3001/api/v1/orders', { fixture: 'sample_orders.json' })
    cy.visit('http://localhost:3000')
  })

  it('should be able to select and fill out name input ', () => {
    cy.get('form')
      .get('input[name="name"]')
      .type('Kayla')
      .should('have.value', 'Kayla')
  })

  it('should be able to select ingredients', () => {
    cy.get('form')
      .get('button').should('have.length', 13)
      .get('button[name="beans"]').click()
      .get('p').contains('beans')
      .get('button[name="steak"]').click()
      .get('p').contains('beans, steak')
  })

})
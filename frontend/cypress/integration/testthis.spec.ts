

describe('Test related to search', function() {

  beforeEach(function() {

    cy.visit('http://localhost:3000')
  })
  
  it('Does show arrow to next searchresult', function() {

      cy.get('#ex1').type('Test_firstTest')

      cy.contains('»')
  })


})
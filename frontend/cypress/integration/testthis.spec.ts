

describe('Blog app', function() {

  beforeEach(function() {


    cy.visit('http://localhost:3000')
  })
  
  it('test', function() {

    cy.contains('Patientor')

  })


}
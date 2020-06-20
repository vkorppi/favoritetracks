

describe('Test related to search', function() {

  beforeEach(function() {

    cy.visit('http://localhost:3000')
  })
  
  it('Shows arrow to next result and shows searchresult', function() {

      cy.get('#ex1').type('Test_firstTest')
      cy.contains('Search').click()

      cy.contains('test1')
      cy.contains('test2')
      cy.contains('test3')
      cy.contains('test4')
      cy.contains('test5')
      cy.contains('test6')
      cy.contains('test7')
      cy.contains('test8')
      cy.contains('test9')
      cy.contains('test10')

      cy.contains('»')
  })

  it('Does not Show arrow to next searchresult and shows searchresult', function() {

    cy.get('#ex1').type('Test_TotalUnderTen')
    cy.contains('Search').click()

    cy.contains('test1')
    cy.contains('test2')
    cy.contains('test3')
    cy.contains('test4')
    cy.contains('test5')
 
    cy.contains('»').should('not.exist')
})

it('Shows result in first and second page. Does not show arrow in next page', function() {

  cy.get('#ex1').type('Test_Total15')
  cy.contains('Search').click()

  cy.contains('test1')
  cy.contains('test2')
  cy.contains('test3')
  cy.contains('test4')
  cy.contains('test5')
  cy.contains('test6')
  cy.contains('test7')
  cy.contains('test8')
  cy.contains('test9')
  cy.contains('test10')

  cy.contains('»').click()

  cy.contains('test11')
  cy.contains('test12')
  cy.contains('test13')
  cy.contains('test14')
  cy.contains('test15')

  cy.contains('»').should('not.exist')
})


})
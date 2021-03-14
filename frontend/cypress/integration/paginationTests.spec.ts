

describe('Test related to search', function() {


	beforeEach(function () {

		cy.visit('http://localhost:3000')
		cy.contains('Login').click()
		cy.get('#username').type('adminUser')
		cy.get('#password').type('admin')
		cy.get('#login').click()

	})
	
		afterEach(() => {
		cy.contains('logout').click()
	})

  it('Does not Show arrow to next searchresult and shows searchresult', function() {

    cy.get('#searchTrack').type('Test_Totalfive')
    cy.contains('Search').click()

    cy.contains('test1')
    cy.contains('test2')
    cy.contains('test3')
    cy.contains('test4')
    cy.contains('test5')
 
    cy.contains('»').should('not.exist')
})

it('Can navigate with arrows', function() {

  cy.get('#searchTrack').type('Test_TotalOverHundred')
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

  cy.contains('test1')
  cy.contains('test2')
  cy.contains('test3')
  cy.contains('test4')
  cy.contains('test5')

  cy.contains('»').should('not.exist')
  
  
   cy.contains('«').click()
   
   cy.contains('»')
  
})

it('Has pagenumbers', function() {

  cy.get('#searchTrack').type('Test_Total20')
  cy.contains('Search').click()

  cy.contains('test1')
  cy.contains('test2')
  cy.contains('test3')
  cy.contains('test4')
  cy.contains('test5')


  cy.get('#page1').contains("1")
  cy.get('#page2').contains("2")

  
})


})
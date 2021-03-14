

describe('Test related to favorites', function () {


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

	it('Adding track to favorites works', function () {


		cy.get('#searchTrack').type('Test_Transfer')
		cy.contains('Search').click()
		cy.get('#'+Cypress.env('TEST_TRACK1_URI')).check()
		cy.get('#'+Cypress.env('TEST_TRACK2_URI')).check()
		cy.get('#'+Cypress.env('TEST_TRACK3_URI')).check()
		cy.contains('Save').click()

		cy.get('#'+'preview'+Cypress.env('TEST_TRACK1_URI')).uncheck({ force: true })
		cy.get('#'+'preview'+Cypress.env('TEST_TRACK1_URI')).should('not.exist')

		cy.contains('Ok').click()

		cy.contains('Favorites').click()

		cy.contains(Cypress.env('TEST_TRACK2'))
		cy.contains(Cypress.env('TEST_TRACK3'))
	})


	it('Removing track from favorites works', function () {

		cy.contains('Favorites').click()

		cy.get('#'+Cypress.env('TEST_TRACK2_URI')).click()

		cy.contains(Cypress.env('TEST_TRACK2')).should('not.exist')
		
		cy.get('#'+Cypress.env('TEST_TRACK3_URI')).click()

		cy.contains(Cypress.env('TEST_TRACK3')).should('not.exist')
	})


})
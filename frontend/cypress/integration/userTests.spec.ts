

describe('Test related to user management', function() {

    beforeEach(function() {

		cy.visit('http://localhost:3000')
		cy.contains('Login').click()
		cy.get('#username').type('usernameTest')
        cy.get('#password').type('passwordTest')
		cy.get('#login').click()

      })

      it('Admin can create user', function() {
		  		
		cy.contains('Registaration').click()
        cy.get('#firstname').type('test_firstname')
        cy.get('#lastname').type('test_lastname')
        cy.get('#birthdate').type('11.11.2001')
        cy.get('#email').type('test.test@test.com')
		cy.get('#address').type('street 2')
		cy.get('#username').type('Username2')
		cy.get('#password').type('Password')

        cy.contains('Register').click()
  
        cy.contains('New user created')
    })

    it('Username must be unique', function() {

 		cy.contains('Registaration').click()

        cy.get('#firstname').type('test_firstname')
        cy.get('#lastname').type('test_lastname')
        cy.get('#birthdate').type('11.11.2001')
        cy.get('#email').type('test.test@test.com')
		cy.get('#address').type('street 2')
		cy.get('#username').type('Username2')
		cy.get('#password').type('Password')

        cy.contains('Register').click()

  
        cy.contains('userInput: username was reserverd')
    })
	
	it('Inputs are validate when registering user', function() {

	
	})

	it('Created user can be searched', function() {

 		cy.contains('Users').click()

        cy.get('#UsersearchInput').type('Username2')
        cy.get('#searchUserbutton').click()
       
        cy.contains('Username2').click()

        cy.contains('test_firstname')
		cy.contains('test_lastname')
		cy.contains('11.11.2001')
		cy.contains('test.test@test.com')
		cy.contains('street 2')
		cy.contains('Username2')
    })
	
	it('User can be modified', function() {

 		cy.contains('Users').click()

        cy.get('#UsersearchInput').type('Username2')
        cy.get('#searchUserbutton').click()
       
        cy.contains('Username2').click()

		cy.get('#modify').click()
		
		cy.get('#firstname').clear()
		cy.get('#lastname').clear()
		cy.get('#birthdate').clear()
		cy.get('#email').clear()
		cy.get('#address').clear()
		
		cy.get('#firstname').type('new_firstname')
		cy.get('#lastname').type('new_lastname')
		cy.get('#birthdate').type('22.12.2011')
		cy.get('#email').type('new.new@new.com')
		cy.get('#address').type('streetTest2')
		
		cy.get('#save').click()
		
		cy.get('#UsersearchInput').type('Username2')
        cy.get('#searchUserbutton').click()
		cy.contains('Username2').click()
		
		cy.contains('new_firstname')
		cy.contains('new_lastname')
		cy.contains('22.12.2011')
		cy.contains('new.new@new.com')
		cy.contains('streetTest2')
		cy.contains('Username2')
    })
	
	it('User can be deleted', function() {

 		cy.contains('Users').click()

        cy.get('#UsersearchInput').type('Username2')
        cy.get('#searchUserbutton').click()
       
        cy.contains('Username2').click()

		cy.get('#remove').click()
		
		cy.contains('User was deleted')
	
    })
	

})


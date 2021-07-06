

describe('Test related to user management. Admin', function () {

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

	it('Admin can create user', function () {

		cy.contains('Registaration').click()
		cy.get('#firstName').type('Firstname')
		cy.get('#lastName').type('Lastname')
		cy.get('#birthdate').type('11.11.2001')
		cy.get('#email').type('test.test@test.com')
		cy.get('#address').type('Street 2')
		cy.get('#username').type('Username3')
		cy.get('#password').type('Password')

		cy.contains('Register').click()

		cy.contains('New user created')

	})

	it('Username must be unique', function () {

		cy.contains('Registaration').click()
		cy.get('#firstName').type('Firstname')
		cy.get('#lastName').type('Lastname')
		cy.get('#birthdate').type('11.11.2001')
		cy.get('#email').type('test.test@test.com')
		cy.get('#address').type('Street 2')
		cy.get('#username').type('Username3')
		cy.get('#password').type('Password')

		cy.contains('Register').click()


		cy.contains('userInput: username was reserverd')
		
		cy.contains('Close').click()
		
	})

	it('Inputs are validate when registering user', function () {

		cy.contains('Registaration').click()

		cy.get('#firstName').type('sf')
		cy.get('#lastName').type('sdf')
		cy.get('#birthdate').type('110')
		cy.get('#email').type('test')
		cy.get('#address').type('sfdf')
		cy.get('#username').invoke('val', '')
		cy.get('#password').invoke('val', '')

		cy.contains('Register').click()

		cy.contains('Firstname must start with uppercasleter followed by lowercase letters')
		cy.contains('Lastname must start with uppercasleter followed by lowercase letters')
		cy.contains('Birthdate must be in dd.mm.yyyy format')
		cy.contains('Email was not in correct format')
		cy.contains('Address must start with uppecase letter followed by lowercase letters. ' 
		+'Lowercase letters needs to be followed by space and numbers')
		cy.contains('Username can´t be empty')
		cy.contains('Password can´t be empty')
		
		cy.contains('Close').click()

	})

	it('User can be searched', function () {

		cy.contains('Users').click()
		cy.get('#UsersearchInput').type('Username3')
		cy.get('#searchUserbutton').click()
		cy.contains('Username3').click()

		cy.contains('Firstname')
		cy.contains('Lastname')
		cy.contains('11.11.2001')
		cy.contains('test.test@test.com')
		cy.contains('Street 2')
		cy.contains('Username3')
		
		cy.contains('Close').click()

	})


	it('User can be modified', function () {

		cy.contains('Users').click()

		cy.get('#UsersearchInput').type('Username3')
		cy.get('#searchUserbutton').click()

		cy.contains('Username3').click()

		cy.get('#modify').click()

		cy.get('#firstName').clear()
		cy.get('#lastName').clear()
		cy.get('#birthdate').clear()
		cy.get('#email').clear()
		cy.get('#address').clear()

		cy.get('#firstName').type('Firstnew')
		cy.get('#lastName').type('Lastnew')
		cy.get('#birthdate').type('22.12.2011')
		cy.get('#email').type('new.new@new.com')
		cy.get('#address').type('Streetnew 2')

		cy.get('#save').click()

		cy.get('#UsersearchInput').type('Username3')
		cy.get('#searchUserbutton').click()
		cy.contains('Username3').click()

		cy.contains('Firstnew')
		cy.contains('Lastnew')
		cy.contains('22.12.2011')
		cy.contains('new.new@new.com')
		cy.contains('Streetnew 2')
		
		cy.contains('Close').click()

	})

	it('Inputs are validate when modifying user', function () {

		cy.contains('Users').click()

		cy.get('#UsersearchInput').type('Username3')
		cy.get('#searchUserbutton').click()

		cy.contains('Username3').click()

		cy.get('#modify').click()

		cy.get('#firstName').clear()
		cy.get('#lastName').clear()
		cy.get('#birthdate').clear()
		cy.get('#email').clear()
		cy.get('#address').clear()

		cy.get('#firstName').type('dsf')
		cy.get('#lastName').type('sdf')
		cy.get('#birthdate').type('222')
		cy.get('#email').type('new')
		cy.get('#address').type('street')

		cy.get('#save').click()

		cy.contains('Firstname must start with uppercasleter followed by lowercase letters')
		cy.contains('Lastname must start with uppercasleter followed by lowercase letters')
		cy.contains('Birthdate must be in dd.mm.yyyy format')
		cy.contains('Email was not in correct format')
		cy.contains('Address must start with uppecase letter followed by lowercase letters. ' 
		+'Lowercase letters needs to be followed by space and numbers')
	
		
		cy.get('#modifyClose').click()
		
		cy.get('#detailsClose').click()

	})

})



describe('Test related to user management. Regular user', function () {

	beforeEach(function () {

		cy.visit('http://localhost:3000')
		cy.contains('Login').click()
		cy.get('#username').type('Username3')
		cy.get('#password').type('Password')
		cy.get('#login').click()

	})

	afterEach(() => {
		cy.contains('logout').click()
	})

	it('User can not see registaration', function () {

		cy.contains('Registaration').should('not.exist');
	})

	it('User can modify own information', function () {

		cy.contains('Me').click()

		cy.get('#modify').click()

		cy.get('#firstName').clear()
		cy.get('#lastName').clear()
		cy.get('#birthdate').clear()
		cy.get('#email').clear()
		cy.get('#address').clear()

		cy.get('#firstName').type('Firstnew')
		cy.get('#lastName').type('Lastnew')
		cy.get('#birthdate').type('22.12.2011')
		cy.get('#email').type('new.new@new.com')
		cy.get('#address').type('Streetnew 2')

		cy.get('#save').click()

		cy.contains('Me').click()

		cy.contains('Firstnew')
		cy.contains('Lastnew')
		cy.contains('22.12.2011')
		cy.contains('new.new@new.com')
		cy.contains('Streetnew 2')
		
		cy.get('#detailsClose').click()

	})



	it('User can not delete or modify other users', function () {

		cy.contains('Users').click()

		cy.get('#UsersearchInput').type('usernameTest')
		cy.get('#searchUserbutton').click()

		cy.contains('usernameTest').click()

		cy.get('#save').should('not.exist');
		cy.get('#remove').should('not.exist');
		
		cy.get('#detailsClose').click()

	})
	


})


describe('Tests user deletion. Admin', function () {

	beforeEach(function () {

		cy.visit('http://localhost:3000')
		cy.contains('Login').click()
		cy.get('#username').type('adminUser')
		cy.get('#password').type('admin')
		cy.get('#login').click()

	})
	
	it('User can be deleted', function () {

		cy.contains('Users').click()

		cy.get('#UsersearchInput').type('Username3')
		cy.get('#searchUserbutton').click()

		cy.contains('Username3').click()

		cy.get('#remove').click()

		cy.contains('User was deleted')

	})
	
})


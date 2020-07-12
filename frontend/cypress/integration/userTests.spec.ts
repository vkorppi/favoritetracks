

describe('Test related to user management. Admin', function () {

	beforeEach(function () {

		cy.visit('http://localhost:3000')
		cy.contains('Login').click()
		cy.get('#username').type('usernameTest')
		cy.get('#password').type('passwordTest')
		cy.get('Login').click()

	})

	afterEach(() => {
		cy.contains('logout').click()
	})

	it('Admin can create user', function () {

		cy.contains('Registaration').click()
		cy.get('#firstname').type('Firstname')
		cy.get('#lastname').type('Lastname')
		cy.get('#birthdate').type('11.11.2001')
		cy.get('#email').type('test.test@test.com')
		cy.get('#address').type('Street 2')
		cy.get('#username').type('Username2')
		cy.get('#password').type('Password')

		cy.contains('Register').click()

		cy.contains('New user created')

	})

	it('Username must be unique', function () {

		cy.contains('Registaration').click()

		cy.contains('Registaration').click()
		cy.get('#firstname').type('Firstname')
		cy.get('#lastname').type('Lastname')
		cy.get('#birthdate').type('11.11.2001')
		cy.get('#email').type('test.test@test.com')
		cy.get('#address').type('Street 2')
		cy.get('#username').type('Username2')
		cy.get('#password').type('Password')

		cy.contains('Register').click()


		cy.contains('userInput: username was reserverd')
	})

	it('Inputs are validate when registering user', function () {

		cy.contains('Registaration').click()

		cy.contains('Registaration').click()
		cy.get('#firstname').type('sf')
		cy.get('#lastname').type('sdf')
		cy.get('#birthdate').type('110')
		cy.get('#email').type('test')
		cy.get('#address').type('sfdf')
		cy.get('#username').type('')
		cy.get('#password').type('')

		cy.contains('Register').click()

		cy.contains('Firstname must start with uppercasleter followed by lowercase letters')
		cy.contains('Lastname must start with uppercasleter followed by lowercase letters')
		cy.contains('Birthdate must be in dd.mm.yyyy format')
		cy.contains('Email was not in correct format')
		cy.contains('Address must start with uppecase letter followed by lowercase letters. ' 
		+'Lowercase letters needs to be followed by space and numbers')
		cy.contains('Username can´t be empty')
		cy.contains('Password can´t be empty')

	})

	it('User can be searched', function () {

		cy.contains('Users').click()
		cy.get('#UsersearchInput').type('Username2')
		cy.get('#searchUserbutton').click()
		cy.contains('Username2').click()

		cy.contains('Firstname')
		cy.contains('Lastname')
		cy.contains('11.11.2001')
		cy.contains('test.test@test.com')
		cy.contains('Street 2')
		cy.contains('Username2')

	})


	it('User can be modified', function () {

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

		cy.get('#firstname').type('Firstname')
		cy.get('#lastname').type('Lastname')
		cy.get('#birthdate').type('22.12.2011')
		cy.get('#email').type('new.new@new.com')
		cy.get('#address').type('Street 2')

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

	it('Inputs are validate when modifying user', function () {

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

		cy.get('#firstname').type('dsf')
		cy.get('#lastname').type('sdf')
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
		cy.contains('Username can´t be empty')
		cy.contains('Password can´t be empty')

	})

	it('User can be deleted', function () {

		cy.contains('Users').click()

		cy.get('#UsersearchInput').type('Username2')
		cy.get('#searchUserbutton').click()

		cy.contains('Username2').click()

		cy.get('#remove').click()

		cy.contains('User was deleted')

	})


})

describe('Test related to user management. Regular user', function () {


})

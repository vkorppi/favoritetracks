
import React, { FormEvent } from 'react';
import { Button, Card, Form, Col, FormControl, Modal, Alert } from 'react-bootstrap';
import { BasicComponent } from "../../type";
import { useMutation } from '@apollo/client';
import queries from '../../graphql/queries';
import { useHistory } from "react-router-dom"

import {isInputName,isInputEmail,isInputDate,isInputString} from '../../utils/userInputValidators'

const Registaration: React.FC<BasicComponent> = ({ showmessage }) => {

    const [createNewUser] = useMutation(queries.createUser, {
        errorPolicy: 'none', onError: (error) => {
            showmessage(error.message, 'danger')
        }
    })

    const history = useHistory()

    const createUser = async (event: FormEvent) => {


        event.preventDefault()
        const form = event.target as HTMLFormElement;

        const firstname = form[0] as HTMLInputElement;
        const lastname = form[1] as HTMLInputElement;
        const birthdate = form[2] as HTMLInputElement;
        const email = form[3] as HTMLInputElement;
        const address = form[4] as HTMLInputElement;
        const username = form[5] as HTMLInputElement;
        const password = form[6] as HTMLInputElement;



        const success = await createNewUser({
            variables:
            {
                username: username.value,
                password: password.value,
                firstname: firstname.value,
                lastname: lastname.value,
                birthdate: birthdate.value,
                email: email.value,
                address: address.value
            }
        });


        username.value = ''
        password.value = ''
        firstname.value = ''
        lastname.value = ''
        birthdate.value = ''
        email.value = ''
        address.value = ''

        if (success) {
            showmessage('New user created', 'primary')
            history.push('/users')
        }

    }

    const close = () => {

        history.push('/users')

        
    }


    return (
        <div >

                    <Card>
                        <Card.Header>Sign up</Card.Header>
                        <Card.Body>
                            <Form.Group>
                                <form onSubmit={createUser}>
                                    <Form.Row>
                                        <Col>
                                        <Alert variant= { 'danger' }> Firstname must start with uppercasleter followed by lowercase letters </Alert>
                                            <FormControl placeholder="firstname" id="firstname" />
                                        </Col>
                                    </Form.Row>
                                    <br />
                                    <Form.Row>
                                        <Col>
                                        <Alert variant= { 'danger' }> Lastname must start with uppercasleter followed by lowercase letters </Alert>
                                            <FormControl placeholder="lastname" id="lastname" />
                                        </Col>
                                    </Form.Row>
                                    <br />
                                    <Form.Row>
                                        <Col>
                                        <Alert variant= { 'danger' }> Birthdate must be in dd.mm.yyyy format </Alert>
                                            <FormControl placeholder="dd.mm.yyyy" id="birthdate" />
                                        </Col>
                                    </Form.Row>
                                    <br />
                                    <Form.Row>
                                    
                                        <Col>
                                        <Alert variant= { 'danger' }> Email was not in correct format </Alert>
                                            <FormControl placeholder="email" id="email" />
                                        </Col>
                                    </Form.Row>
                                    <br />
                                    <Form.Row>
                                        <Col>
                                        <Alert variant= { 'danger' }> Address was not a string </Alert>
                                            <FormControl placeholder="address" id="address" />
                                        </Col>
                                    </Form.Row>
                                    <br />
                                    <Form.Row>
                                        <Col>
                                        <Alert variant= { 'danger' }> Username was not a string </Alert>
                                            <FormControl placeholder="Username" id="username" />
                                        </Col>
                                    </Form.Row>
                                    <br />
                                    <Form.Row>
                                        <Col>
                                        <Alert variant= { 'danger' }> Password was not a string </Alert>
                                            <FormControl placeholder="Password" type="password" id="password" />
                                        </Col>
                                    </Form.Row>
                                    <br />
                                    <Form.Row>
                                        <Col>
                                            <Button type="submit" variant="primary" >Register </Button>
                                            <Button className="buttonSpace"  type="button" variant="primary" onClick={() => close()}  >Close </Button>
                                        </Col>
                                    </Form.Row>
                                </form>
                            </Form.Group>
                        </Card.Body>
                    </Card>
          
            
        </div>
    );



};

export default Registaration;
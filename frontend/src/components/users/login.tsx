
import React, { FormEvent } from 'react';
import { Button, Card, Form, Col, FormControl } from 'react-bootstrap';
import { BasicComponent } from "../../type";
import { useMutation } from '@apollo/client';
import queries from '../../graphql/queries';
import {useHistory} from "react-router-dom"

const Login: React.FC<BasicComponent> = ({ showmessage }) => {

    const [login, result] = useMutation(queries.login, {
        errorPolicy: 'none', onError: (error) => {
            showmessage(error.message,'danger')
        }
    })

    const history = useHistory()

    const submitCredentials = async (event: FormEvent) => {


        event.preventDefault()
        const form = event.target as HTMLFormElement;

        const username = form[0] as HTMLInputElement;
        const password = form[1] as HTMLInputElement;

        const loginResult = login({ variables: { username: username.value, password: password.value} });
   
        username.value = ''
        password.value = ''

     

    }

   

    if(result &&  result.data) {
        
        const value = result.data.login.value as string;
        localStorage.setItem('Token',value)
        history.push("/")
    }

    return (
        <div >
            <Card>
                <Card.Header>Login</Card.Header>
                <Card.Body>
                    <Form.Group>
                        <form onSubmit={submitCredentials}>
                            <Form.Row>
                                <Col>
                                    <FormControl placeholder="username" id="username" />
                                </Col>
                            </Form.Row>
                            <br />
                            <Form.Row>
                                <Col>
                                    <FormControl placeholder="password" id="password" />
                                </Col>
                            </Form.Row>
                            <br />
                            <Form.Row>
                                <Col>
                                    <Button type="submit" variant="primary" >Login </Button>
                                </Col>
                            </Form.Row>
                        </form>
                    </Form.Group>
                </Card.Body>
            </Card>
        </div>
    );



};

export default Login;
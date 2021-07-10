
import React, { FormEvent } from 'react';
import { Button, Card, Form, Col, FormControl } from 'react-bootstrap';
import { loginComponent } from "../../types/component";
import { useMutation } from '@apollo/client';
import sessionm from '../../graphql/session';
import { Redirect } from "react-router";
import { CapsulatedLoginAuth } from '../../types/user';

const Login: React.FC<loginComponent> = ({ showmessage, refetch }) => {

    const [login, result] = useMutation(sessionm.login, {
        errorPolicy: 'none', onError: (error) => {
            showmessage(error.message, 'danger')
        }
    })


    const submitCredentials = async (event: FormEvent) => {

        event.preventDefault()
        const form = event.target as HTMLFormElement;

        const username = form[0] as HTMLInputElement;
        const password = form[1] as HTMLInputElement;

        await login({ variables: { username: username.value, password: password.value } });

        await refetch()

        username.value = ''
        password.value = ''

    }

    const permissions = result.data as CapsulatedLoginAuth

    if (!permissions)
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
                                        <FormControl type="password" placeholder="password" id="password" />
                                    </Col>
                                </Form.Row>
                                <br />
                                <Form.Row>
                                    <Col>
                                        <Button type="submit" id="login" variant="primary" >Login </Button>
                                    </Col>
                                </Form.Row>
                            </form>
                        </Form.Group>
                    </Card.Body>
                </Card>
            </div>
        );
    else
        return (
            <div>
                <Redirect to="/" />
            </div>
        )
};

export default Login;
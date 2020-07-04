
import React, { FormEvent } from 'react';
import { Button, Card, Form, Col } from 'react-bootstrap';
import { BasicComponent, AlertType } from "../../type";
import { useMutation } from '@apollo/client';
import queries from '../../graphql/queries';
import { useHistory } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import { setAlerts } from "../../reducers/alerts";
import InputForm from '../forms/input';
import { validateAlert, validationFailed } from '../../utils/alertMessageControllers';

const Registaration: React.FC<BasicComponent> = ({ showmessage }) => {

    const selector = (state: AlertType) => state
    const alertState = useSelector(selector)
    const alertObject = alertState.alert
    const dispatch = useDispatch()

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

        validateAlert(
            alertObject,
            [
                firstname.value,
                lastname.value,
                birthdate.value,
                email.value,
                address.value,
                username.value,
                password.value
            ])

      

        dispatch(setAlerts(alertObject))

        if (!validationFailed(alertObject)) {

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
                                    <InputForm
                                        hasError={alertObject.firstname}
                                        errorMessage={'Firstname must start with uppercasleter followed by lowercase letters'}
                                        inputMessage={'firstname'}
                                        id={'firstname'}
                                        type={'text'}
                                    />
                                </Col>
                            </Form.Row>
                            <br />
                            <Form.Row>
                                <Col>
                                    <InputForm
                                        hasError={alertObject.lastname}
                                        errorMessage={'Lastname must start with uppercasleter followed by lowercase letters'}
                                        inputMessage={'lastname'}
                                        id={'lastname'}
                                        type={'text'}
                                    />
                                </Col>
                            </Form.Row>
                            <br />
                            <Form.Row>
                                <Col>
                                <InputForm
                                        hasError={alertObject.birthdate}
                                        errorMessage={'Birthdate must be in dd.mm.yyyy format'}
                                        inputMessage={'dd.mm.yyyy'}
                                        id={'birthdate'}
                                        type={'text'}
                                    />
                                </Col>
                            </Form.Row>
                            <br />
                            <Form.Row>
                                <Col>
                                <InputForm
                                        hasError={alertObject.email}
                                        errorMessage={'Email was not in correct format'}
                                        inputMessage={'email'}
                                        id={'email'}
                                        type={'text'}
                                    />
                                </Col>
                            </Form.Row>
                            <br />
                            <Form.Row>
                                <Col>
                                <InputForm
                                        hasError={alertObject.address}
                                        errorMessage={
                                            'Address must start with uppecase letter followed by lowercase letters. ' 
                                            +'Lowercase letters needs to be followed by space and numbers'
                                        }
                                        inputMessage={'address'}
                                        id={'address'}
                                        type={'text'}
                                    />
                                </Col>
                            </Form.Row>
                            <br />
                            <Form.Row>
                                <Col>
                                <InputForm
                                        hasError={alertObject.username}
                                        errorMessage={'Username can´t be empty'}
                                        inputMessage={'username'}
                                        id={'username'}
                                        type={'text'}
                                    />
                                </Col>
                            </Form.Row>
                            <br />
                            <Form.Row>
                                <Col>
                                <InputForm
                                        hasError={alertObject.password}
                                        errorMessage={'Password can´t be empty'}
                                        inputMessage={'password'}
                                        id={'password'}
                                        type={'password'}
                                    />
                                </Col>
                            </Form.Row>
                            <br />
                            <Form.Row>
                                <Col>
                                    <Button type="submit" variant="primary" >Register </Button>
                                    <Button className="buttonSpace" type="button" variant="primary" onClick={() => close()}  >Close </Button>
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
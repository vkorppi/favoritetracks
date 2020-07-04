
import React, { FormEvent } from 'react';
import { Modal, Form, Button, Col, FormControl, Card,Alert } from 'react-bootstrap';
import { ComponentAttributeUser, MessageType, AlertType } from '../../type';
import { setShow } from '../../reducers/modal';
import { useDispatch, useSelector } from 'react-redux';
import queries from '../../graphql/queries';
import { useHistory } from "react-router-dom"
import { useMutation } from '@apollo/client';
import Message from '../spotify/message';
import { isInputName, isInputEmail, isInputDate, isInputString } from '../../utils/userInputValidators'
import { setAlerts } from "../../reducers/alerts";
import InputForm from '../forms/input';
import { validateAlert, validationFailed } from '../../utils/alertMessageControllers';

const ModifyUser: React.FC<ComponentAttributeUser> = ({ showmessage, user, show }) => {

    const dispatch = useDispatch()
    const selector = (state: MessageType) => state
    const rootstate = useSelector(selector)

    const selectorAlert = (state: AlertType) => state
    const alertState = useSelector(selectorAlert)
    const alertObject = alertState.alert

    const history = useHistory()

    const [updateUser] = useMutation(queries.updateUser, {
        errorPolicy: 'none',
        onError: (error) => {
            showmessage(error.message, 'danger')
        }
    })

    const save = async (event: FormEvent) => {

        event.preventDefault()
        const form = event.target as HTMLFormElement;

        const firstname = form[0] as HTMLInputElement;
        const lastname = form[1] as HTMLInputElement;
        const birthdate = form[2] as HTMLInputElement;
        const email = form[3] as HTMLInputElement;
        const address = form[4] as HTMLInputElement;

        alertObject.firstname = !isInputName(firstname.value)
        alertObject.lastname= !isInputName(lastname.value)
        alertObject.birthdate = !isInputDate(birthdate.value) 
        alertObject.email = !isInputEmail(email.value) 
        alertObject.address = !isInputString(address.value) 

        const validationFailed =
            alertObject.firstname ||
            alertObject.lastname ||
            alertObject.birthdate ||
            alertObject.email ||
            alertObject.address ||
            alertObject.username ||
            alertObject.password

        dispatch(setAlerts(alertObject))

        if (!validationFailed) {

            const success = await updateUser({
                variables: {
                    firstname: firstname.value, lastname: lastname.value,
                    birthdate: birthdate.value, email: email.value, address: address.value, id: user.id
                }
            });

            if (success) {
                dispatch(setShow(false))
                showmessage(`User was updated: ${firstname.value} ${lastname.value}`, 'primary')
                history.push('/users')
            }
        }
    }


    const close = () => {

        dispatch(setShow(false))
    }


    return (
        <Modal centered show={show}>
            <Modal.Body>
                <Message text={rootstate.message.text} msgtype={rootstate.message.msgtype} />
                <Card>
                    <Card.Header></Card.Header>
                    <Card.Body>
                        <div >
                            <Form.Group>
                                <form onSubmit={save}>
                                    <Form.Row>
                                        <Col>
                                        {
                                    alertObject.firstname ?
                                    <Alert variant={'danger'}>
                                        Firstname must start with uppercasleter followed by lowercase letters
                                    </Alert>
                                        : ''
                                    }
                                    <FormControl defaultValue={user.firstname} placeholder="firstname" id="firstname" />
                                        </Col>
                                    </Form.Row>
                                    <br />
                                    <Form.Row>
                                        <Col>
                                        {
                                    alertObject.lastname ?
                                    <Alert variant={'danger'}>
                                        Lastname must start with uppercasleter followed by lowercase letters
                                    </Alert>
                                        : ''
                                    }
                                    <FormControl defaultValue={user.lastname} placeholder="lastname" id="lastname" />
                                        </Col>
                                    </Form.Row>
                                    <br />
                                    <Form.Row>
                                        <Col>
                                        {
                                    alertObject.birthdate ?
                                    <Alert variant={'danger'}>
                                         Birthdate must be in dd.mm.yyyy format
                                     </Alert>
                                        : ''
                                    }
                                    <FormControl defaultValue={user.birthdate} placeholder="dd.mm.yyyy" id="birthdate" />
                                        </Col>
                                    </Form.Row>
                                    <br />
                                    <Form.Row>
                                        <Col>
                                        {
                                    alertObject.email ?
                                    <Alert variant={'danger'}>
                                         Email was not in correct format
                                     </Alert>
                                        : ''
                                    }
                                    <FormControl defaultValue={user.email} placeholder="email" id="email" />
                                        </Col>
                                    </Form.Row>
                                    <br />
                                    <Form.Row>
                                        <Col>
                                        {
                                    alertObject.address ?
                                    <Alert variant={'danger'}>
                                         Address was not a string
                                    </Alert>
                                    : ''
                                    }
                                    <FormControl defaultValue={user.address} placeholder="address" id="address" />
                                        </Col>
                                    </Form.Row>
                                    <br />
                                    <Form.Row>
                                        <Col>
                                            <Button type="submit" id="save" variant="primary"    >Save </Button>
                                            <Button className="buttonSpace" type="button" variant="primary" onClick={() => close()}  >Close </Button>
                                        </Col>

                                    </Form.Row>
                                </form>
                            </Form.Group>

                        </div>
                    </Card.Body>
                </Card>
            </Modal.Body>
        </Modal>
    );



};

export default ModifyUser;
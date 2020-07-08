
import React, { FormEvent } from 'react';
import { Modal, Form, Button, Col, Card } from 'react-bootstrap';
import { ComponentAttributeUser, MessageType, AlertType } from '../../type';
import { setShow } from '../../reducers/modal';
import { useDispatch, useSelector } from 'react-redux';
import queries from '../../graphql/queries';
import { useHistory } from "react-router-dom"
import { useMutation } from '@apollo/client';
import Message from '../spotify/message';
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

        validateAlert(
            alertObject,
            [
                firstname.value,
                lastname.value,
                birthdate.value,
                email.value,
                address.value,
                'empty',
                'empty',
                'empty'
            ])

        dispatch(setAlerts(alertObject))

        if (!validationFailed(alertObject)) {

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
                                        <InputForm
                                        hasError={alertObject.firstname}
                                        errorMessage={'Firstname must start with uppercasleter followed by lowercase letters'}
                                        inputMessage={'firstname'}
                                        id={'firstname'}
                                        type={'text'}
                                        defaultInput={user.firstname}/>
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
                                        defaultInput={user.lastname}/>
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
                                        defaultInput={user.birthdate}/>
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
                                        defaultInput={user.email}/>
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
                                        defaultInput={user.address}/>
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
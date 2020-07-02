
import React, { FormEvent } from 'react';
import { Modal, Form, Button, Col, FormControl, Card } from 'react-bootstrap';
import { ComponentAttributeUser, MessageType } from '../../type';
import { setShow } from '../../reducers/modal';
import { useDispatch, useSelector } from 'react-redux';
import queries from '../../graphql/queries';
import { useHistory } from "react-router-dom"
import { useMutation } from '@apollo/client';
import Message from '../spotify/message';

const ModifyUser: React.FC<ComponentAttributeUser> = ({ showmessage, user, show }) => {

    const dispatch = useDispatch()
    const selector = (state: MessageType) => state
    const rootstate = useSelector(selector)

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
                                            <FormControl defaultValue={user.firstname} id="firstname" type="text" />
                                        </Col>
                                    </Form.Row>
                                    <br />
                                    <Form.Row>
                                        <Col>
                                            <FormControl defaultValue={user.lastname} id="lastname" type="text" />
                                        </Col>
                                    </Form.Row>
                                    <br />
                                    <Form.Row>
                                        <Col>
                                            <FormControl defaultValue={user.birthdate} id="birthdate" type="text" />
                                        </Col>
                                    </Form.Row>
                                    <br />
                                    <Form.Row>
                                        <Col>
                                            <FormControl defaultValue={user.email} id="email" type="text" />
                                        </Col>
                                    </Form.Row>
                                    <br />
                                    <Form.Row>
                                        <Col>
                                            <FormControl defaultValue={user.address} id="address" type="text" />
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

import React, { FormEvent } from 'react';
import { Modal, Form, Button, Col, FormControl } from 'react-bootstrap';
import { ComponentAttributeUser } from '../../type';
import { setShow } from '../../reducers/modal';
import { useDispatch } from 'react-redux';
import queries from '../../graphql/queries';
import { useHistory } from "react-router-dom"
import { useMutation } from '@apollo/client';

const ModifyUser: React.FC<ComponentAttributeUser> = ({ showmessage, user, show }) => {

    const dispatch = useDispatch()

    const history = useHistory()



    const [updateUser] = useMutation(queries.updateUser, {
        errorPolicy: 'none',
    })

    const save = (event: FormEvent) => {

        event.preventDefault()
        const form = event.target as HTMLFormElement;

        const firstname = form[0] as HTMLInputElement;
        const lastname = form[1] as HTMLInputElement;
        const birthdate = form[2] as HTMLInputElement;
        const email = form[3] as HTMLInputElement;
        const address = form[4] as HTMLInputElement;

        updateUser({ variables: { firstname: firstname.value, lastname: lastname.value,
            birthdate:birthdate.value,email:email.value,address:address.value, id: user.id } });

        dispatch(setShow(false))
        showmessage(`User was updated: ${firstname.value} ${lastname.value}`)
        history.push('/users')

    }


    const close = () => {

        dispatch(setShow(false))
    }


    return (
        <Modal centered show={show}>
            <Modal.Body>
                <div >
                    <Form.Group>
                        <form onSubmit={save}>
                            <Form.Row>
                                <Col>
                                    <FormControl defaultValue={user.firstname} id="firstname" type="text" />
                                </Col>
                            </Form.Row>
                            <br/>
                            <Form.Row>
                                <Col>
                                    <FormControl  defaultValue={user.lastname} id="lastname" type="text" />
                                </Col>
                            </Form.Row>
                            <br/>
                            <Form.Row>
                                <Col>
                                    <FormControl  defaultValue={user.birthdate} id="birthdate" type="text" />
                                </Col>
                            </Form.Row>
                            <br/>
                            <Form.Row>
                                <Col>
                                    <FormControl  defaultValue={user.email} id="email" type="text" />
                                </Col>
                            </Form.Row>
                            <br/>
                            <Form.Row>
                                <Col>
                                    <FormControl  defaultValue={user.address} id="address" type="text" />
                                </Col>
                            </Form.Row>
                            <br/>
                            <Form.Row>
                                <Col>
                                    <Button type="submit" id="save" variant="primary"    >Save </Button>
                                    <Button className="buttonSpace"  type="button" variant="primary" onClick={() => close()}  >Close </Button>
                                </Col>
 
                            </Form.Row>
                        </form>
                    </Form.Group>

                </div>
            </Modal.Body>
        </Modal>
    );



};

export default ModifyUser;
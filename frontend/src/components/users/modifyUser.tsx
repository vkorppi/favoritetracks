
import React from 'react';
import { Modal, Row, Button, Col, Card, FormControl, Alert } from 'react-bootstrap';
import { ComponentAttributeUser } from '../../types/component';
import { MessageType } from '../../types/alerts';
import { setShow } from '../../reducers/modal';
import { useDispatch, useSelector } from 'react-redux';
import userm from '../../graphql/user';
import { useHistory } from "react-router-dom"
import { useMutation } from '@apollo/client';
import Message from '../spotify/message';
import { Formik, Form } from 'formik';
import { validationSchema } from '../formik/validationSchema';

const ModifyUser: React.FC<ComponentAttributeUser> = ({ showmessage, user, show }) => {

    const dispatch = useDispatch()
    const selector = (state: MessageType) => state
    const rootstate = useSelector(selector)

    const history = useHistory()

    const [updateUser] = useMutation(userm.updateUser, {
        errorPolicy: 'none',
        onError: (error) => {
            showmessage(error.message, 'danger')
        }
    })

    const close = () => {

        dispatch(setShow({ data: { show: false } }))
    }


    return (
        <Modal centered show={show}>
            <Modal.Body>
                <Message text={rootstate.message.text} msgtype={rootstate.message.msgtype} />
                <Card>
                    <Card.Header></Card.Header>
                    <Card.Body>
                        <Formik
                            initialValues={{
                                firstName: user.firstname,
                                lastName: user.lastname,
                                birthdate: user.birthdate,
                                email: user.email,
                                address: user.address
                            }}
                            validationSchema={validationSchema.omit(['username', 'password'])}
                            onSubmit={async (values) => {


                                const success = await updateUser({
                                    variables: {
                                        firstname: values.firstName, lastname: values.lastName,
                                        birthdate: values.birthdate, email: values.email, address: values.address, id: user.id
                                    }
                                });

                                if (success) {
                                    dispatch(setShow({ data: { show: false } }))
                                    showmessage(`User was updated: ${values.firstName} ${values.lastName}`, 'primary')
                                    history.push('/users')
                                }
                            }}>
                            {({ values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur
                            }) => (
                                <Form >
                                    <Row>
                                        <Col>
                                            {touched.firstName && errors.firstName ? <Alert variant={'danger'}>{errors.firstName}</Alert> : ''}
                                            <FormControl defaultValue={values.firstName} placeholder='firstname' id='firstName' type='text'
                                                onChange={handleChange}
                                                onBlur={handleBlur}

                                            />
                                        </Col>
                                    </Row>
                                    <br />
                                    <Row>
                                        <Col>
                                            {touched.lastName && errors.lastName ? <Alert variant={'danger'}>{errors.lastName}</Alert> : ''}
                                            <FormControl defaultValue={values.lastName} placeholder='lastname' id='lastName' type='text'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </Col>
                                    </Row>
                                    <br />
                                    <Row>
                                        <Col>
                                            {touched.birthdate && errors.birthdate ? <Alert variant={'danger'}>{errors.birthdate}</Alert> : ''}
                                            <FormControl defaultValue={values.birthdate} placeholder='dd.mm.yyyy' id='birthdate' type='text'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </Col>
                                    </Row>
                                    <br />
                                    <Row>
                                        <Col>
                                            {touched.email && errors.email ? <Alert variant={'danger'}>{errors.email}</Alert> : ''}
                                            <FormControl defaultValue={values.email} placeholder='email' id='email' type='text'
                                                onChange={handleChange}
                                                onBlur={handleBlur}

                                            />
                                        </Col>
                                    </Row>
                                    <br />
                                    <Row>
                                        <Col>
                                            {touched.address && errors.address ? <Alert variant={'danger'}>{errors.address}</Alert> : ''}
                                            <FormControl defaultValue={values.address} placeholder='address' id='address' type='text'
                                                onChange={handleChange}
                                                onBlur={handleBlur}

                                            />
                                        </Col>
                                    </Row>

                                    <br />

                                    <Row>
                                        <Col>
                                            <Button type="submit" id="save" variant="primary"    >Save </Button>
                                            <Button className="buttonSpace" id="modifyClose" type="button" variant="primary" onClick={() => close()}  >Close </Button>
                                        </Col>

                                    </Row>
                                </Form>
                            )}
                        </Formik>
                    </Card.Body>
                </Card>
            </Modal.Body>
        </Modal>
    );



};

export default ModifyUser;
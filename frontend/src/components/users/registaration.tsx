
import React from 'react';
import { Button, Card, Col, Row, FormControl, Alert } from 'react-bootstrap';
import { BasicComponent } from "../../types/component";
import { useMutation } from '@apollo/client';
import userm from '../../graphql/user';
import { useHistory } from "react-router-dom"
import { Formik, Form } from 'formik';
import {validationSchema } from '../formik/validationSchema';

const Registaration: React.FC<BasicComponent> = ({ showmessage }) => {


    const [createNewUser] = useMutation(userm.createUser, {
        errorPolicy: 'none', onError: (error) => {
            showmessage(error.message, 'danger')
        }
    })

    const history = useHistory()


    const close = () => {

        history.push('/users')


    }

 

    return (
        <div >

            <Card>
                <Card.Header>Sign up</Card.Header>
                <Card.Body>
                    <Formik
                        initialValues={{
                            firstName: '',
                            lastName: '',
                            birthdate: '',
                            email: '',
                            address: '',
                            username: '',
                            password: ''
                        }}
                        validationSchema={validationSchema}
                        onSubmit={async (values) => {

                            const success = await createNewUser({
                                variables:
                                {
                                    username: values.username,
                                    password: values.password,
                                    firstname: values.firstName,
                                    lastname: values.lastName,
                                    birthdate: values.birthdate,
                                    email: values.email,
                                    address: values.address
                                }
                            });

                            if (success) {
                                showmessage('New user created', 'primary')
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
                                        {touched.username && errors.username ? <Alert variant={'danger'}>{errors.username}</Alert> : ''}
                                        <FormControl defaultValue={values.username} placeholder='username' id='username' type='text'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </Col>
                                </Row>
                                <br />
                                <Row>
                                    <Col>
                                        {touched.password && errors.password ? <Alert variant={'danger'}>{errors.password}</Alert> : ''}
                                        <FormControl defaultValue={values.password} placeholder='password' id='password' type='text'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </Col>
                                </Row>
                                <br />
                                <Row>
                                    <Col>
                                        <Button type="submit" variant="primary" >Register </Button>
                                        <Button className="buttonSpace" type="button" variant="primary" onClick={() => close()}  >Close </Button>
                                    </Col>
                                </Row>
                            </Form>
                        )}
                    </Formik>
                </Card.Body>
            </Card>


        </div>
    );



};

export default Registaration;
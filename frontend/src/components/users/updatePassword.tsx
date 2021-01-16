
import React, { FormEvent } from 'react';
import {  Form, Button, Col, FormControl } from 'react-bootstrap';
import { ComponentAttributeUser } from '../../types/component';
import userm from '../../graphql/user';
import { useHistory } from "react-router-dom"
import { useMutation } from '@apollo/client';

const UpdatePassword: React.FC<ComponentAttributeUser> = ({ showmessage, user }) => {

    const history = useHistory()



    const [updatePassword] = useMutation(userm.updatePassword, {
        errorPolicy: 'none',
    })

    const update = (event: FormEvent) => {

        event.preventDefault()
        const form = event.target as HTMLFormElement;

        const oldpasswod = form[0] as HTMLInputElement;
        const newpassword = form[1] as HTMLInputElement;


        if (oldpasswod.value !== newpassword.value) {

            updatePassword({
                variables: {
                    password: newpassword.value, id: user.id
                }
            });

            showmessage(`Password was updated`,'primary')
            history.push('/users')
        }
        else {
            showmessage(`Password was same as old one`,'danger')
        }



    }




    return (

        <div >
            <Form.Group>
                <form onSubmit={update}>
                    <Form.Row>
                        <Col>
                            <FormControl placeholder="old password" id="oldPassword" type="password" />
                        </Col>
                    </Form.Row>
                    <br />
                    <Form.Row>
                        <Col>
                            <FormControl placeholder="new password" id="newPassword" type="password" />
                        </Col>
                    </Form.Row>
                    <br />
                    <Form.Row>
                        <Col>
                            <Button type="submit" variant="primary"    >Update </Button>
                        </Col>

                    </Form.Row>
                </form>
            </Form.Group>

        </div>

    );



};

export default UpdatePassword;
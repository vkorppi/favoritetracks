
import React, { FormEvent } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
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
        const lastname =  form[1] as HTMLInputElement;


        updateUser({ variables: { firstname: firstname.value,lastname: lastname.value,id: user.id} });

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
                    <div className="container">
                        <form onSubmit={save}>
                            <div className="form-group row">

                                <div className="col-xs-2">
                                    <Form.Label>Firstname</Form.Label><div>
                                        <input className="form-control" defaultValue={user.firstname} id="firstname" type="text" /></div>
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-xs-2">
                                    <Form.Label>Lastname</Form.Label>
                                    <div><input className="form-control" defaultValue={user.lastname} id="lastname" type="text" /></div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-xs-2">
                                    <Button type="submit" variant="primary"    >Save </Button>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <Button type="button" variant="primary" onClick={() => close()}  >Close </Button>
                                </div>
                            </div>
                        </form>

                    </div>

                </div>
            </Modal.Body>
        </Modal>
    );



};

export default ModifyUser;
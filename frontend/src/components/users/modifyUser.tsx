
import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { ComponentAttributeUser } from '../../type';
import { setShow } from '../../reducers/modal';
import { useDispatch } from 'react-redux';

const ModifyUser: React.FC<ComponentAttributeUser> = ({ showmessage, user, show }) => {

    const dispatch = useDispatch()

    const close = () => {

        dispatch(setShow(false))
    }


    return (
        <Modal centered show={show}>
            <Modal.Body>
                <div >
                    <div className="container">
                        <form >
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
                                    <Button type="button" variant="primary" onClick={() => close()}   >Save </Button>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <div className="col-xs-10">
                                        <Button type="button" variant="primary" onClick={() => close()}  >Close </Button>
                                    </div>
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
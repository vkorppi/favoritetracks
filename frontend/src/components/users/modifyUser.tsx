
import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { ComponentAttributeUser } from '../../type';


const ModifyUser: React.FC<ComponentAttributeUser> = ({ showmessage, user }) => {



    return (
        <div >
                <div className="container">
                    <form >
                        <div className="form-group row">

                            <div className="col-xs-2">
                                <Form.Label>Firstname</Form.Label><div>
                                <input className="form-control" value={user.firstname}   id="firstname" type="text" /></div>
                            </div>
                        </div>

                        <div className="form-group row">
                            <div className="col-xs-2">
                                <Form.Label>Lastname</Form.Label>
                                <div><input className="form-control" value={user.lastname}   id="lastname" type="text" /></div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-xs-2">
                                <Button type="button" variant="primary"   >Delete </Button>
                            </div>
                        </div>
                    </form>

                </div> 

        </div>
    );



};

export default ModifyUser;
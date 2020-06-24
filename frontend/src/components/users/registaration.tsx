
import React from 'react';
import { Button, Card,Form } from 'react-bootstrap';
import { RegistarationType } from "../../type";

const Registaration: React.FC<RegistarationType> = () => {


    return (
        <div >
            <Card>
                <Card.Header>Sign up</Card.Header>
                <Card.Body>
                    <div className="container">
                        <form >
                            <div className="form-group row">
                                
                                <div className="col-xs-2">
                                <Form.Label>Firstname</Form.Label>
                                    <div><input className="form-control"  id="ex1" type="text" /></div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-xs-2">
                                <Form.Label>Lastname</Form.Label>
                                    <div><input className="form-control" id="ex1" type="text" /></div>
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-xs-2">
                                <Form.Label>Username</Form.Label>
                                    <div> <input className="form-control" id="ex1" type="text" /></div>
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-xs-2">
                                <Form.Label>Password</Form.Label>
                                    <div> <input className="form-control" id="ex1" type="password" /></div>
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-xs-2">
                                    <Button type="submit" variant="primary" >Register </Button>
                                </div>
                            </div>
                        </form>

                    </div>
                </Card.Body>
            </Card>
        </div>
    );



};

export default Registaration;
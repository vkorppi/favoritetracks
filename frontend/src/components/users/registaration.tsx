
import React from 'react';
import { Button } from 'react-bootstrap';
import { RegistarationType } from "../../type";

const Registaration: React.FC<RegistarationType> = () => {


    return (
        <div >
            <div className="container">
                <form >
                    <div className="form-group row">
                        <div className="col-xs-2">
                            <div>
                                <input className="form-control" id="ex1" type="text" /></div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-xs-2">
                            <div>
                                <input className="form-control" id="ex1" type="text" /></div>
                        </div>
                    </div>

                    <div className="form-group row">
                        <div className="col-xs-2">
                            <div>
                                <input className="form-control" id="ex1" type="text" /></div>
                        </div>
                    </div>

                    <div className="form-group row">
                        <div className="col-xs-2">
                            <div>
                                <input className="form-control" id="ex1" type="text" /></div>
                        </div>
                    </div>

                    <div className="form-group row">
                        <div className="col-xs-2">
                            <Button type="submit" variant="primary" >Register </Button>
                        </div>
                    </div>
                </form>
 
            </div>
        </div>
    );



};

export default Registaration;
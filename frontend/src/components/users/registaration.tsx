
import React, { FormEvent } from 'react';
import { Button, Card,Form } from 'react-bootstrap';
import { ShowMessageType } from "../../type";
import { useDispatch } from 'react-redux'
import { showMessage } from '../../thunks/message';
import { useMutation } from '@apollo/client';
import queries from '../../graphql/queries';


const Registaration: React.FC<ShowMessageType> = ({showmessage}) => {

    const [createNewUser] = useMutation(queries.createUser, {
        errorPolicy: 'none', onError: (error) => {
            showmessage(error.message)
        }
      })

    const dispatch = useDispatch()
 

    const createUser = async (event: FormEvent) => {


        event.preventDefault()
        const form = event.target as HTMLFormElement;
        const firstname = form[0] as HTMLInputElement;
        const lastname =  form[1] as HTMLInputElement;
        const username =  form[2] as HTMLInputElement;
        const Password =  form[3] as HTMLInputElement;

       const success= await createNewUser({ variables: { username: username.value,password: Password.value,firstname: firstname.value,lastname: lastname.value} });


        username.value=''
        Password.value=''
        firstname.value=''
        lastname.value=''
        
        if(success)
        {
            dispatch(showMessage('New user created', 5000,'primary'))
        }
    }


    return (
        <div >
            <Card>
                <Card.Header>Sign up</Card.Header>
                <Card.Body>
                    <div className="container">
                        <form  onSubmit={createUser}>
                            <div className="form-group row">
                                
                                <div className="col-xs-2">
                                <Form.Label>Firstname</Form.Label>
                                    <div><input className="form-control"   id="firstname" type="text" /></div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-xs-2">
                                <Form.Label>Lastname</Form.Label>
                                    <div><input className="form-control" id="lastname"  type="text" /></div>
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-xs-2">
                                <Form.Label>Username</Form.Label>
                                    <div> <input className="form-control" id="username"   type="text" /></div>
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-xs-2">
                                <Form.Label>Password</Form.Label>
                                    <div> <input className="form-control" id="password"   type="password" /></div>
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
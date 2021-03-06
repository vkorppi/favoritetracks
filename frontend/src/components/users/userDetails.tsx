
import React from 'react';
import { Button, Form, Col, Card } from 'react-bootstrap';
import { ComponentAttribueId } from "../../types/component";
import {  ModalType } from "../../types/modal";
import userq from '../../graphql/user';
import { useQuery, useMutation } from '@apollo/client';
import { useHistory } from "react-router-dom"
import ModifyUser from './modifyUser';
import { useSelector, useDispatch } from 'react-redux';
import { setShow } from '../../reducers/modal';



const Details: React.FC<ComponentAttribueId> = ({ showmessage, id }) => {

    const modalState = (state: ModalType) => state
    const data2 = useSelector(modalState)
    const dispatch = useDispatch()

    const userData = useQuery(userq.getUser, {
        fetchPolicy: "no-cache", errorPolicy: 'none',
        skip: (!id),
        variables: { id: id }
    })

    const loggedUser = useQuery(userq.loggedInUser, {
        fetchPolicy: "no-cache", errorPolicy: 'none',
    })


    let user
    let error
    let loggeduser
    let isloggeduser=true

    if(userData && userData.data) {
        error = userData.error
        user = userData.data.getUser
        isloggeduser=false
    }

    if(loggedUser && loggedUser.data) {
        error = loggedUser.error
        loggeduser = loggedUser.data.getUserLoggedin        
        
    }

    if(!user) {
        user=loggeduser
    }


    const [deleteUser] = useMutation(userq.deleteUser, {
        errorPolicy: 'none',
    })
    
    const history = useHistory()

    if (error) {
        showmessage(error?.message, 'danger')
    }

    const removeUser = () => {
        deleteUser({ variables: { id: id } });
        showmessage('User was deleted', 'primary')
        history.push('/users')
    }

    const modifyUser = () => {
        dispatch(setShow({ data: { show: true } }))
    }

    const close = () => {

        history.push('/users')
    }


    return (
        <div >

            {user ?

                <Card>
                    <Card.Header></Card.Header>
                    <Card.Body>
                        <Form.Group>
                            <form >
                                <Form.Row>
                                    <Col>
                                        <Form.Label className="rowPadding">{`${user.firstname} ${user.lastname}`}</Form.Label>
                                    </Col>
                                </Form.Row>

                                <Form.Row>
                                    <Col>
                                        <Form.Label className="rowPadding">{`${user.birthdate}`}</Form.Label>
                                    </Col>
                                </Form.Row>

                                <Form.Row>
                                    <Col>
                                        <Form.Label className="rowPadding">{`${user.email}`}</Form.Label>
                                    </Col>
                                </Form.Row>

                                <Form.Row>
                                    <Col>
                                        <Form.Label className="rowPadding">{`${user.address}`}</Form.Label>
                                    </Col>
                                </Form.Row>

                                <Form.Row>
                                    <Col>
                                        <Form.Label className="rowPadding">{user.username}</Form.Label>
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col>
                                    <br/>
                                    <br/>
                                    <br/>
                                        { loggeduser.admin && (user !== loggeduser)  ? <Button type="button" variant="primary" id="remove" onClick={() => removeUser()}  >Delete </Button> : ''}
                                        { loggeduser.admin || isloggeduser ? <Button type="button" id="modify" className="buttonSpace" variant="primary" onClick={() => modifyUser()}  >Modify </Button> : ''} 
                                        <Button className="buttonSpace"  type="button" id="detailsClose" variant="primary" onClick={() => close()}  >Close </Button>
                                    </Col>
                                </Form.Row>
                            </form>
                            {data2 ? <ModifyUser showmessage={showmessage} user={user} show={data2.modal.show} /> : ''}
                        </Form.Group>
                    </Card.Body>
                </Card>
                : ''}

        </div>
    );



};

export default Details;
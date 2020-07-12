
import React from 'react';
import { Button, Form, Col, Card } from 'react-bootstrap';
import { ComponentAttribueId, ModalType } from "../../type";
import queries from '../../graphql/queries';
import { useQuery, useMutation } from '@apollo/client';
import { useHistory } from "react-router-dom"
import ModifyUser from './modifyUser';
import { useSelector, useDispatch } from 'react-redux';
import { setShow } from '../../reducers/modal';



const Details: React.FC<ComponentAttribueId> = ({ showmessage, id }) => {

    const modalState = (state: ModalType) => state
    const data2 = useSelector(modalState)
    const dispatch = useDispatch()

    const admin =  localStorage.getItem('Admin') === 'true'

    const fetchedUser = useQuery(queries.getUser, {
        fetchPolicy: "no-cache", errorPolicy: 'none',
        skip: (!id),
        variables: { id: id }
    })

    const loggedUser = useQuery(queries.loggedInUser, {
        fetchPolicy: "no-cache", errorPolicy: 'none',
        skip: (id !== '')
    })


    let user
    let error
    let isloggeduser=false

    if(fetchedUser && fetchedUser.data) {
        error = fetchedUser.error
        user = fetchedUser.data.getUser
    }

    if(loggedUser && loggedUser.data) {
        error = loggedUser.error
        user = loggedUser.data.getUserLoggedin
        isloggeduser=true
    }


    const [deleteUser] = useMutation(queries.deleteUser, {
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
        dispatch(setShow(true))
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
                                        { admin  ? <Button type="button" variant="primary" id="remove" onClick={() => removeUser()}  >Delete </Button> : ''}
                                        { admin || isloggeduser ? <Button type="button" id="modify" className="buttonSpace" variant="primary" onClick={() => modifyUser()}  >Modify </Button> : ''} 
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
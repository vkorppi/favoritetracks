
import React from 'react';
import { Button, Form, Col } from 'react-bootstrap';
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


    const { error, data } = useQuery(queries.getUser, {
        fetchPolicy: "network-only", errorPolicy: 'none',
        variables: { id: id }
    })

    const [deleteUser] = useMutation(queries.deleteUser, {
        errorPolicy: 'none',
    })






    const history = useHistory()

    if (error) {
        showmessage(error?.message)
    }

    const removeUser = () => {
        deleteUser({ variables: { id: id } });
        showmessage('User was deleted')
        history.push('/users')
    }

    const modifyUser = () => {
        console.log(data2.modal.show)
        dispatch(setShow(true))
    }


    return (
        <div >

            {data ?
                <Form.Group>
                    <form >
                        <Form.Row>
                            <Col>
                                <Form.Label>{`${data.getUser.firstname} ${data.getUser.lastname}`}</Form.Label>
                            </Col>
                        </Form.Row>

                        <Form.Row>
                            <Col>
                                <Form.Label>{`${data.getUser.birthdate}`}</Form.Label>
                            </Col>
                        </Form.Row>

                        <Form.Row>
                            <Col>
                                <Form.Label>{`${data.getUser.email}`}</Form.Label>
                            </Col>
                        </Form.Row>

                        <Form.Row>
                            <Col>
                                <Form.Label>{`${data.getUser.address}`}</Form.Label>
                            </Col>
                        </Form.Row>

                        <Form.Row>
                            <Col>
                                <Form.Label>{data.getUser.username}</Form.Label>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col>
                                <Button type="button" variant="primary" id="remove" onClick={() => removeUser()}  >Delete </Button>
                                <Button type="button" id="modify" className="buttonSpace" variant="primary" onClick={() => modifyUser()}  >Modify </Button>
                            </Col>
                        </Form.Row>
                    </form>
                    {data2 ? <ModifyUser showmessage={showmessage} user={data.getUser} show={data2.modal.show} /> : ''}
                </Form.Group>

                : ''}

        </div>
    );



};

export default Details;
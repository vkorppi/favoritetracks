
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { ComponentAttribueId,ModalType } from "../../type";
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

                <div className="container">
                    <form >
                        <div className="form-group row">

                            <div className="col-xs-2">
                                <Form.Label>{`${data.getUser.firstname} ${data.getUser.lastname}`}</Form.Label>
                            </div>
                        </div>

                        <div className="form-group row">
                            <div className="col-xs-2">
                                <Form.Label>{data.getUser.username}</Form.Label>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-xs-2">
                                <Button type="button" variant="primary" onClick={() => removeUser()}  >Delete </Button>
                            </div>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <div className="col-xs-10">
                                <Button type="button" variant="primary" onClick={() => modifyUser()}  >Modify </Button>
                            </div>
                        </div>
                    </form>
                    {data2 ? <ModifyUser showmessage={showmessage} user={data.getUser} show={data2.modal.show}/>   : ''}
                </div>
                
                : ''}

        </div>
    );



};

export default Details;
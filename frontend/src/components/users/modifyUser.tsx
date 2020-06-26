
import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { ComponentAttribueId } from '../../type';
import { useMutation,useQuery } from '@apollo/client';
import queries from '../../graphql/queries';
import { useHistory } from "react-router-dom"

const ModifyUser: React.FC<ComponentAttribueId> = ({ showmessage, id }) => {

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
                        </div>
                    </form>

                </div> : ''}

        </div>
    );



};

export default ModifyUser;
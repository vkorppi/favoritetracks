
import React from 'react';
import { Modal, Form, Button, Col, Card } from 'react-bootstrap';
import { ComponentAttributeTrack } from '../../types/component';
import {  AlertType, MessageType } from '../../types/alerts';
import InputForm from '../forms/input';
import { useDispatch, useSelector } from 'react-redux';
import { validateAlert } from '../../utils/alertMessageControllers';
import { setAlerts } from "../../reducers/alerts";
import { setShow } from '../../reducers/modal';
import Message from '../spotify/message';
import { getTimeWhenTokenExpires } from '../../utils/sessionControllers';

const Transfer: React.FC<ComponentAttributeTrack> = ({ show, tracks, TransferToPlaylist, user,newtoken }) => {



    const selectorAlert = (state: AlertType) => state
    const alertState = useSelector(selectorAlert)
    const alertObject = alertState.alert

    const selector = (state: MessageType) => state
    const rootstate = useSelector(selector)

    const dispatch = useDispatch()

    let redirectUrl = process.env.REACT_APP_GRAPHQL_PROD as string

    if(process.env.REACT_APP_ENVIR === 'test') {
        redirectUrl=process.env.REACT_APP_GRAPHQL_DEV as string;
    }

    const close = () => {

        dispatch(setShow({ data: { show: false } }))
    }


  

    const transferOK = async () => {


        const playlistid = document.getElementById('Playlistid') as HTMLInputElement

        validateAlert(
            alertObject,
            [
                'empty',
                'empty',
                'empty',
                'empty',
                'empty',
                'empty',
                'empty',
                playlistid.value
            ])

        dispatch(setAlerts(alertObject))


        if (!alertObject.other) {

            localStorage.setItem('playlist', playlistid.value);

            if (!localStorage.getItem('spotifyToken')) {
                // window.location.href = process.env.REACT_APP_URL as string
                window.location.href = redirectUrl
            }
            else {


               if(newtoken) 
                {
                    localStorage.setItem('spotifyToken',newtoken.access_token)
                    localStorage.setItem('Expiration',getTimeWhenTokenExpires(Number(newtoken.expires_in)))
                }

                TransferToPlaylist(tracks)
                close()
            }
        }


    }

    return (
        <Modal centered show={show}>
            <Modal.Body>
                <Message text={rootstate.message.text} msgtype={rootstate.message.msgtype} />
                <Card>
                    <Card.Header>Do not press ok if you don't have active Spotify session. If you don't have active session you will be logged out</Card.Header>
                    <Card.Body>
                        <div >
                            <Form.Group>

                                <Form.Row>
                                    <Col>
                                        <InputForm
                                            hasError={alertObject.other}
                                            errorMessage={`Playlist id can't be empty`}
                                            inputMessage={'Playlist id'}
                                            id={'Playlistid'}
                                            type={'text'}
                                            defaultInput={user ? user.playlist : ''} />


                                    </Col>
                                </Form.Row>

                                <Form.Row>
                                    <Col>
                                        <br />
                                        <Button type="button" variant="primary" onClick={() => transferOK()} id="okButton">OK</Button>
                                        <Button type="button" className="buttonSpace" variant="primary" onClick={() => close()} id="cancelButton">Cancel</Button>
                                    </Col>
                                </Form.Row>

                            </Form.Group>

                        </div>
                    </Card.Body>
                </Card>
            </Modal.Body>
        </Modal>
    );



};

export default Transfer;

import React from 'react';
import { Modal, Form, Button, Col, Card } from 'react-bootstrap';
import { ComponentAttributeTrack, AlertType, ModalType } from '../../type';
import InputForm from '../forms/input';
import { useDispatch, useSelector } from 'react-redux';
import { validateAlert } from '../../utils/alertMessageControllers';
import { setAlerts } from "../../reducers/alerts";
import { setShow } from '../../reducers/modal';

const Transfer: React.FC<ComponentAttributeTrack> = ({ showmessage, show, tracks,TransferToPlaylist,user }) => {

    const selectorAlert = (state: AlertType) => state
    const alertState = useSelector(selectorAlert)
    const alertObject = alertState.alert
    const modalState = (state: ModalType) => state
    const data2 = useSelector(modalState)


    const dispatch = useDispatch()

    const close = () => {

        dispatch(setShow(false))
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
		

        if (!alertObject.password) {

            localStorage.setItem('playlist', playlistid.value);

            if (!localStorage.getItem('spotifyToken')) {
                window.location.href = process.env.REACT_APP_URL as string
            }
            else {
                TransferToPlaylist(tracks)
                close()
            }
        }


    }

 


    return (
        <Modal centered show={show}>
            <Modal.Body>
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
                                        <Button type="button" className="buttonSpace" variant="primary" onClick={() => close()}  id="cancelButton">Cancel</Button>
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
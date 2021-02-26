
import React from 'react';
import { Modal, Row, Button, Col, Card, FormControl, Alert } from 'react-bootstrap';
import { ComponentAttributeTrack } from '../../types/component';
import { useDispatch, useSelector } from 'react-redux';
import { setShow } from '../../reducers/modal';
import Message from '../spotify/message';
import { getTimeWhenTokenExpires } from '../../utils/sessionControllers';
import { Formik, Form } from 'formik';
import { validationSchema } from '../formik/validationSchemaTransfer';
import { MessageType } from '../../types/alerts';

const Transfer: React.FC<ComponentAttributeTrack> = ({ show, tracks, TransferToPlaylist, user, newtoken }) => {


    const selector = (state: MessageType) => state
    const rootstate = useSelector(selector)

    const dispatch = useDispatch()

    const redirect = process.env.REACT_APP_REDIRECT as string
    const redirectUri = process.env.REACT_APP_REDIRECT_URI as string
    const clientId = process.env.REACT_APP_REDIRECT_CLIENT_ID as string

   const redirectUrl = redirect + redirectUri + clientId

    /*
     Needs to be refactored
    let redirectUrl = process.env.REACT_APP_GRAPHQL_PROD as string

    if (process.env.REACT_APP_ENVIR === 'test') {
        redirectUrl = process.env.REACT_APP_GRAPHQL_DEV as string;
    }
     Needs to be refactored
    */

    const close = () => {

        dispatch(setShow({ data: { show: false } }))
    }

    return (
        <Modal centered show={show}>
            <Modal.Body>
                <Message text={rootstate.message.text} msgtype={rootstate.message.msgtype} />
                <Card>
                    <Card.Header>Do not press ok if you don't have active Spotify session. If you don't have active session you will be logged out</Card.Header>
                    <Card.Body>
                        <Formik
                            initialValues={{
                                Playlistid: user ? user.playlist : ''
                            }}
                            validationSchema={validationSchema}
                            onSubmit={async (values) => {

                                localStorage.setItem('playlist', values.Playlistid);

                                if (!localStorage.getItem('spotifyToken')) {
                                    // window.location.href = process.env.REACT_APP_URL as string
                                    window.location.href = redirectUrl
                                }
                                else {
                    
                    
                                    if (newtoken) {
                                        localStorage.setItem('spotifyToken', newtoken.access_token)
                                        localStorage.setItem('Expiration', getTimeWhenTokenExpires(Number(newtoken.expires_in)))
                                    }
                    
                                    TransferToPlaylist(tracks)
                                    close()
                                }

                            }}>
                            {({ values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur
                            }) => (
                                <Form>

                                    <Row>
                                        <Col>
                                            {touched.Playlistid && errors.Playlistid ? <Alert variant={'danger'}>{errors.Playlistid}</Alert> : ''}
                                            <FormControl defaultValue={values.Playlistid} placeholder='Playlist id' id='Playlistid' type='text'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />

                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <br />
                                            <Button type="submit"  variant="primary" id="okButton">OK</Button>
                                            <Button type="button" className="buttonSpace" variant="primary" onClick={() => close()} id="cancelButton">Cancel</Button>
                                        </Col>
                                    </Row>

                                </Form>
                            )}
                        </Formik>

                    </Card.Body>
                </Card>
            </Modal.Body>
        </Modal>
    );



};

export default Transfer;
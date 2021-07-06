import React, { MouseEvent } from 'react';
import {  NewTrack } from '../../types/spotify'
import { BasicComponent } from '../../types/component'
import {  ModalType } from '../../types/modal'
import { useQuery, useMutation } from '@apollo/client';
import sessionq from '../../graphql/session';
import userq from '../../graphql/user';
import track from '../../graphql/track';
import { Form, ListGroup, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Transfer from './transfer';
import { setShow } from '../../reducers/modal';
import axios from 'axios';
import { useLazyQuery } from '@apollo/client';
import { getTimeWhenTokenExpires } from '../../utils/sessionControllers';
import { useHistory } from "react-router-dom"
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const Favorites: React.FC<BasicComponent> = ({ showmessage }) => {

    const dispatch = useDispatch()
    const history = useHistory()

    let user
    let tokenObject

    const trackpart1 = process.env.REACT_APP_TRACKSPART1 as string
    const trackpart3 = process.env.REACT_APP_TRACKSPART3 as string

    const param = new URLSearchParams(useLocation().search)

    const modalState = (state: ModalType) => state
    const ModalData = useSelector(modalState)

    const { data, refetch } = useQuery(track.getFavorites, {
        fetchPolicy: "no-cache", errorPolicy: 'none'
    })

    const [removeTrack] = useMutation(track.removeTrack, {
        errorPolicy: 'none',
        onError: (error) => {
            showmessage(error.message, 'danger')
        }
    })

    const [getLoggedInUser, userData] = useLazyQuery(userq.loggedInUser, {
        fetchPolicy: "no-cache", errorPolicy: 'none',
    })

    const [deletegateNewToken, newtoken] = useLazyQuery(sessionq.delegateRefreshedToken, {
        fetchPolicy: "no-cache", errorPolicy: 'none',
    })


    if (userData && userData.data) {
        user = userData.data.getUserLoggedin
    }

    if (newtoken && newtoken.data) {
        tokenObject = newtoken.data.delegateRefreshedToken
    }

    const TransferToPlaylist = async (tracks: NewTrack[]) => {


        const playlistpart2 = localStorage.getItem('playlist')
        const token = localStorage.getItem('spotifyToken')


        const url = trackpart1 + playlistpart2 + trackpart3
        const uris = tracks.map((track: NewTrack) => (track.spotifUri));

        const requestBody = {
            "uris": uris
        };

        const headers = {
            'Content-Type': 'application/json'
            , 'authorization': 'Bearer ' + token
        };

        await axios.post(url, requestBody, { headers: headers });

        history.push('/favorites')
    }

    const queryObject = useQuery(sessionq.delegateToken, {

        fetchPolicy: "no-cache", errorPolicy: 'none',
        skip: (!param.get("code")),
        variables: { code: param.get("code"), playlist: localStorage.getItem('playlist') }
    })


    if (queryObject && queryObject.data) {

        const refresToken = queryObject.data.delegateToken.refresh_token
        const accesToken = queryObject.data.delegateToken.access_token
        const expiration = queryObject.data.delegateToken.expires_in

        localStorage.setItem('spotifyRefreshToken', refresToken)
        localStorage.setItem('spotifyToken', accesToken)
        localStorage.setItem('Expiration', getTimeWhenTokenExpires(expiration))

        if (data) {
            TransferToPlaylist(data.getFavorites)
        }

    }


    const transferFavorites = async () => {

        const refreshToken = localStorage.getItem('spotifyRefreshToken')
        const expiration = localStorage.getItem('Expiration')

        dispatch(setShow( { data: { show: true } }))
        getLoggedInUser()

        if (refreshToken && expiration) {

            const current = new Date();

            if (current.getTime() > Number(expiration)) {

                deletegateNewToken({ variables: { refreshedToken: refreshToken } })
            }
        }

    }

    const remove = async (event: MouseEvent) => {

        const child: SVGElement = event.target as SVGElement

        let removeIcon
        let linkelement

        let trackId = child.getAttribute('id')

        if (!trackId) {
            removeIcon = child.parentNode as SVGElement
            trackId = removeIcon.getAttribute('id')

            linkelement = child?.parentNode?.parentNode?.childNodes[3] as HTMLLinkElement
        }
        else {
            linkelement = child.parentNode?.childNodes[3] as HTMLLinkElement
        }

        await removeTrack({
            variables: {
                track: {name:linkelement.textContent,url:linkelement.href,spotifUri:trackId}
            }
        });

        await refetch();
        
    }



    return (
        <div >

            <Form.Group>
                <ListGroup variant="flush">
                    { (data && data.getFavorites) ? data.getFavorites.map((track: NewTrack) => (

                        <Form.Row key={track.spotifUri} >
                            <Col>
                                <ListGroup.Item> <DeleteForeverIcon onClick={remove} id={track.spotifUri.replace('spotify:track:','')} className="clickable" />  <a href={track.url}>{track.name}</a> </ListGroup.Item>
                            </Col>
                        </Form.Row>

                    )) : ''}

                </ListGroup>

            </Form.Group>
            <Form.Group>
                <Form.Row>
                    <Col>
                        <br />
                        <Button type="button" className="buttonSpace" variant="outline-info" onClick={() => transferFavorites()}  >Transfer </Button>
                    </Col>
                </Form.Row>
                {ModalData && data && user ? <Transfer showmessage={showmessage} show={ModalData.modal.show} tracks={data.getFavorites} TransferToPlaylist={TransferToPlaylist} user={user} newtoken={tokenObject} /> : ''}
            </Form.Group>

        </div>
    );

};


export default Favorites;
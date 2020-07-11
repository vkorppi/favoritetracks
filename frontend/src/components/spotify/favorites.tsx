import React, { MouseEvent } from 'react';
import { BasicComponent, Track, ListType, ModalType } from '../../type'
import { useQuery, useMutation } from '@apollo/client';
import queries from '../../graphql/queries';
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

    const listState = (state: ListType) => state
    const dataList = useSelector(listState)


    const { data, refetch } = useQuery(queries.getList, {
        fetchPolicy: "no-cache", errorPolicy: 'none'
    })

    const [removeTrack] = useMutation(queries.removeTrack, {
        errorPolicy: 'none',
        onError: (error) => {
            showmessage(error.message, 'danger')
        }
    })

    const [getLoggedInUser, userData] = useLazyQuery(queries.loggedInUser, {
        fetchPolicy: "no-cache", errorPolicy: 'none',
    })

    const [deletegateNewToken, newtoken] = useLazyQuery(queries.delegateRefreshedToken, {
        fetchPolicy: "no-cache", errorPolicy: 'none',
    })


    if (userData && userData.data) {
        user = userData.data.getUserLoggedin
    }

    if (newtoken && newtoken.data) {
        tokenObject = newtoken.data.delegateRefreshedToken
    }

    const TransferToPlaylist = async (tracks: Track[]) => {


        const playlistpart2 = localStorage.getItem('playlist')
        const token = localStorage.getItem('spotifyToken')


        const url = trackpart1 + playlistpart2 + trackpart3
        const uris = tracks.map((track: Track) => (track.uri));

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

    const queryObject = useQuery(queries.delegateToken, {

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
            TransferToPlaylist(data.getList)
        }

    }


    const transferFavorites = async () => {

        const refreshToken = localStorage.getItem('spotifyRefreshToken')
        const expiration = localStorage.getItem('Expiration')

        dispatch(setShow(true))
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

        let trackId = child.getAttribute('id')

        if (!trackId) {
            removeIcon = child.parentNode as SVGElement
            trackId = removeIcon.getAttribute('id')
        }

        await removeTrack({
            variables: {
                tracks: trackId
            }
        });

        await refetch();
    }



    return (
        <div >

            <Form.Group>
                <ListGroup variant="flush">
                    {data ? data.getList.map((track: Track) => (

                        <Form.Row key={track.uri} >
                            <Col>
                                <ListGroup.Item> <DeleteForeverIcon onClick={remove} id={track.uri} /> {track.name} </ListGroup.Item>
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
                {ModalData && data ? <Transfer showmessage={showmessage} show={ModalData.modal.show} tracks={data.getList} TransferToPlaylist={TransferToPlaylist} user={user} newtoken={tokenObject} /> : ''}
            </Form.Group>

        </div>
    );

};


export default Favorites;
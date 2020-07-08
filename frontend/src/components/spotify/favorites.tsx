import React, { ChangeEvent } from 'react';
import { BasicComponent, Track, ListType, ModalType } from '../../type'
import { useQuery, useMutation } from '@apollo/client';
import queries from '../../graphql/queries';
import { Form, ListGroup, InputGroup, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem } from '../../reducers/list';
import {  useLocation } from 'react-router-dom';
import Transfer from './transfer';
import { setShow } from '../../reducers/modal';
import axios from 'axios';
import { useLazyQuery } from '@apollo/client';

const Favorites: React.FC<BasicComponent> = ({ showmessage }) => {

    const dispatch = useDispatch()

    let user

    const trackpart1 =  process.env.REACT_APP_TRACKSPART1 as string
    const trackpart3= process.env.REACT_APP_TRACKSPART3 as string

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
    
      if(userData && userData.data) {
        user= userData.data.getUserLoggedin
      }

    const  TransferToPlaylist=  async (tracks: Track[]) => {

        
        const playlistpart2 = localStorage.getItem('playlist')
        const token = localStorage.getItem('spotifyToken')
        
        const url = trackpart1+playlistpart2+trackpart3
        const uris = tracks.map((track: Track) => (track.uri));
        
        const requestBody = {
            "uris": uris
        };

        const headers = {
            'Content-Type': 'application/json'
            , 'authorization': 'Bearer ' + token
        };

        await axios.post(url, requestBody, { headers: headers });        
    }

    const queryObject = useQuery(queries.delegateToken, {

        fetchPolicy: "no-cache", errorPolicy: 'none',
        skip: (!param.get("code")),
        variables: { code: param.get("code"),playlist: localStorage.getItem('playlist')}
      })


      if(queryObject && queryObject.data) {

        const refresToken = queryObject.data.delegateToken.refresh_token
        const accesToken = queryObject.data.delegateToken.access_token

        localStorage.setItem('spotifyRefreshToken',refresToken)
        localStorage.setItem('spotifyToken',accesToken)
        
        if(data) {
            TransferToPlaylist(data.getList)
        }

      }  
      
    const changeFavorite = (event: ChangeEvent<HTMLInputElement>) => {

        const input = event.target as HTMLInputElement
        const value = input.parentNode?.nextSibling?.textContent as string;
        const key = input.value

        if (input.checked === true) {

            dispatch(addItem(key, value))
        }
        else {

            dispatch(removeItem(key))
        }
    }

    const remove = async () => {

        const success = await removeTrack({
            variables: {
                tracks: Object.keys(dataList.list)
            }
        });

        await refetch();
        
	
    }

    const transferFavorites = async () => {

        dispatch(setShow(true))
        getLoggedInUser()
     
    }

 

    return (
        <div >

            <Form.Group>
                <ListGroup variant="flush">
                    {data ? data.getList.map((track: Track) => (

                        <Form.Row key={track.uri} >
                            <Col>
                                <InputGroup.Prepend>

                                    <InputGroup.Checkbox onChange={changeFavorite} value={track.uri} />

                                    <ListGroup.Item> {track.name} </ListGroup.Item>
                                </InputGroup.Prepend>

                            </Col>
                        </Form.Row>

                    )) : ''}

                </ListGroup>

            </Form.Group>
            <Form.Group>
                <Form.Row>
                    <Col>
                        <br />
                        <Button type="button"  variant="outline-info" onClick={() => remove()}  >remove </Button>
                        <Button type="button" className="buttonSpace" variant="outline-info" onClick={() => transferFavorites()}  >Transfer </Button>
                    </Col>
                </Form.Row>
                {ModalData && data ? <Transfer  show={ModalData.modal.show} tracks={data.getList} TransferToPlaylist={TransferToPlaylist} user={user} /> : ''}
            </Form.Group>

        </div>
    );

};


export default Favorites;
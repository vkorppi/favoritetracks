import React, { FormEvent, ChangeEvent } from 'react';
import {  Track, FavoritesType, NewTrack } from '../../types/spotify'
import { SearchForm,BasicComponent } from '../../types/component'
import { ModalType } from '../../types/modal'
import { Button, ListGroup, Col, Form, FormControl, InputGroup } from 'react-bootstrap'
import Resultpagination from './pagination';
import { useDispatch, useSelector } from 'react-redux'
import { setPagination } from '../../reducers/pagination'
import { addItem, removeItem } from '../../reducers/favorites'
import { useLazyQuery, useQuery } from '@apollo/client';
import trackq from '../../graphql/track';
import { setShow } from '../../reducers/modal';
import SelectedFavorites from './selectedFavorites';

interface QueryResult {

  search: SearchResult;

}

interface SearchResult {

  tracks: Track[];
  total: number;

}

const Search: React.FC<SearchForm> = ({ showmessage,authorization }) => {

  interface Testi {
    href: string;
  }

  const [getTracks, { data, error }] = useLazyQuery(trackq.search, {
    fetchPolicy: "no-cache", errorPolicy: 'none',
  })

  let uris: string[] = [''];

  // Tarkistus onko jo authorizoitu, muussa tapauksessa ei tehdä kutsua
  const listObject = useQuery(trackq.getFavorites, {
    fetchPolicy: "no-cache", errorPolicy: 'none'
  })

  if (listObject && listObject.data && listObject.data.getFavorites) {

    uris = listObject.data.getFavorites.map((track: NewTrack) => (track.spotifUri));

  }


  const modalState = (state: ModalType) => state
  const modalData = useSelector(modalState)

  const favoritesState = (state: FavoritesType) => state
  const tracks = useSelector(favoritesState)

  const queryResult = data as unknown
  const fetchedData: QueryResult = queryResult as QueryResult

  const dispatch = useDispatch()
  let total = 0;

  const searchTracks = (event: FormEvent) => {


    event.preventDefault()
    const form = event.target as HTMLFormElement;
    const input = form[0] as HTMLInputElement
    const inputvalue = input.value

    input.value = ''


    getTracks({ variables: { name: inputvalue, page: 1 } })


    dispatch(setPagination({ start: 1, last: 10, searchvalue: inputvalue, currentPage: 1 }))


    if (error) {
      showmessage(error?.message, 'danger')
    }

  }

  const save = () => {
    dispatch(setShow({ data: { show: true } }))

  }

  const changeFavorite = (event: ChangeEvent<HTMLInputElement>) => {

    const input = event.target as HTMLInputElement
    const name = input.parentNode?.nextSibling?.textContent as string;
    const uri = input.value
    const href = ((input.parentNode?.nextSibling?.childNodes[1] as unknown) as Testi).href


    if (input.checked === true) {

      dispatch(addItem({ name: name, url: href, spotifUri: uri }))
    }
    else {

      dispatch(removeItem({ spotifUri: uri }))
    }
  }

  if (fetchedData) {
    total = fetchedData.search.total
    total = Math.floor(total / 10)
  }



  return (
    <div >
      <SelectedFavorites tracks={tracks} showmessage={showmessage} show={modalData.modal.show} />
      <Form.Group>
        <form onSubmit={searchTracks}>
          <Form.Row>
            <Col>
              <FormControl id="searchTrack" type="text" />
            </Col>
          </Form.Row>
          <Form.Row>
            <Col>
              <br />
              <Button type="submit" variant="outline-primary" >Search </Button>
              {authorization ? <Button type="button" className="buttonSpace" variant="outline-info" onClick={() => save()}  >Save </Button> : ''}
            </Col>
          </Form.Row>
          <br />
        </form>
        <ListGroup variant="flush">
          {fetchedData ? fetchedData.search.tracks.map((track: Track) => (

            <Form.Row key={track.uri} >
              <Col>
                <InputGroup.Prepend>
                <InputGroup.Checkbox id={track.uri.replace('spotify:track:', '')} onChange={changeFavorite} disabled={uris.includes(track.uri)} defaultChecked={tracks.favorites[track.uri] !== undefined} value={track.uri} /> 
                  <ListGroup.Item> <a href={track.external_urls.spotify}>{track.name}</a> </ListGroup.Item>
                </InputGroup.Prepend>

              </Col>
            </Form.Row>

          )) : ''}
        </ListGroup>
      </Form.Group>
      {fetchedData ? <Resultpagination total={total} search={getTracks} /> : ''}
    </div>
  );

};


export default Search;
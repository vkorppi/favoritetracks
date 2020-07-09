import React, { FormEvent, ChangeEvent } from 'react';
import { BasicComponent, QueryResult, Track, ListType, ModalType, trackNoExternalUrl } from '../../type'
import { Button, ListGroup, Col, Form, FormControl, InputGroup } from 'react-bootstrap'
import Resultpagination from './pagination';
import { useDispatch, useSelector } from 'react-redux'
import { setPagination } from '../../reducers/pagination'
import { addItem, removeItem } from '../../reducers/list'
import { useLazyQuery, useQuery } from '@apollo/client';
import queries from '../../graphql/queries';
import { setShow } from '../../reducers/modal';
import SelectedFavorites from './selectedFavorites';

const Search: React.FC<BasicComponent> = ({ showmessage }) => {


  const [getTracks, { data, error }] = useLazyQuery(queries.search, {
    fetchPolicy: "no-cache", errorPolicy: 'none',
  })

  let uris: string[];


  const listObject = useQuery(queries.getList, {
    fetchPolicy: "no-cache", errorPolicy: 'none'
  })

  if (listObject && listObject.data) {

    uris = listObject.data.getList.map((track: trackNoExternalUrl) => (track.uri));
    
  }


  const modalState = (state: ModalType) => state
  const data2 = useSelector(modalState)

  const listState = (state: ListType) => state
  const dataList = useSelector(listState)

  const searchresult = data as unknown
  const fetchedData: QueryResult = searchresult as QueryResult

  const dispatch = useDispatch()
  let total = 0;

  const searchTracks = (event: FormEvent) => {


    event.preventDefault()
    const form = event.target as HTMLFormElement;
    const input = form[0] as HTMLInputElement
    const inputvalue = input.value

    input.value = ''


    getTracks({ variables: { name: inputvalue, page: 1 } })

    dispatch(setPagination(1, 10, inputvalue, 1))


    if (error) {
      showmessage(error?.message, 'danger')
    }

  }

  const save = () => {
    dispatch(setShow(true))

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

  if (fetchedData) {
    total = fetchedData.search.total
    total = Math.floor(total / 10)
  }

  return (
    <div >
      <SelectedFavorites list={dataList} showmessage={showmessage} show={data2.modal.show} />
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
              <Button type="button" className="buttonSpace" variant="outline-info" onClick={() => save()}  >Save </Button>
            </Col>
          </Form.Row>
          <br />
        </form>
        <ListGroup variant="flush">
          {fetchedData ? fetchedData.search.tracks.map((track: Track) => (

            <Form.Row key={track.uri} >
              <Col>
                <InputGroup.Prepend>

                  <InputGroup.Checkbox onChange={changeFavorite} disabled={uris.includes(track.uri)} defaultChecked={dataList.list[track.uri] !== undefined} value={track.uri} />

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
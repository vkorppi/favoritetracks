import React, { FormEvent, ChangeEvent } from 'react';
import { BasicComponent, Query, Track, ListType } from '../../type'
import { Button, ListGroup, Col, Form, FormControl, InputGroup } from 'react-bootstrap'
import Resultpagination from './pagination';
import { useDispatch, useSelector } from 'react-redux'
import { setPagination } from '../../reducers/pagination'
import { addItem, removeItem } from '../../reducers/list'
import { useLazyQuery } from '@apollo/client';
import queries from '../../graphql/queries';



const Search: React.FC<BasicComponent> = ({ showmessage }) => {

  const [getTracks, trackObject] = useLazyQuery(queries.search, {
    fetchPolicy: "network-only", errorPolicy: 'none',
    /*
    // Causes endles loop
    onError: (error) => {
      showmessage(error.message, 'danger')
    }
    */
  })


  const listState = (state: ListType) => state
  const dataList = useSelector(listState)

  const data = trackObject.data;

  const searchresult = data as unknown
  const fetchedData: Query = searchresult as Query


  const dispatch = useDispatch()

  const searchTracks = (event: FormEvent) => {


    event.preventDefault()
    const form = event.target as HTMLFormElement;
    const input = form[0] as HTMLInputElement
    const inputvalue = input.value

    input.value = ''


    getTracks({ variables: { name: inputvalue, page: 1 } })

    dispatch(setPagination(1, 10, inputvalue, 1))

  }

  const changeFavorite = (event: ChangeEvent<HTMLInputElement>) => {

    const input = event.target as HTMLInputElement

    if (input.checked === true) {

      dispatch(addItem(input.value))
    }
    else {

      dispatch(removeItem(input.value))
    }
  }



  return (
    <div >
      <Form.Group>
        <form onSubmit={searchTracks}>
          <Form.Row>
            <Col>
              <FormControl id="searchTrack" type="text" />
            </Col>
          </Form.Row>
          <Form.Row>
            <Col>
              <Button type="submit" variant="primary" >Search </Button>
            </Col>
          </Form.Row>
        </form>
        <ListGroup variant="flush">
          {fetchedData ? fetchedData.search.tracks.map((track: Track) => (

            <Form.Row key={track.uri} >
              <Col>
                <InputGroup.Prepend>

                  {dataList.list.list.includes(track.uri) ?
                    <InputGroup.Checkbox onChange={changeFavorite} defaultChecked value={track.uri} />
                    :
                    <InputGroup.Checkbox onChange={changeFavorite} value={track.uri} />
                  }
                  <ListGroup.Item>{track.name}</ListGroup.Item>
                </InputGroup.Prepend>

              </Col>
            </Form.Row>

          )) : ''}
        </ListGroup>
      </Form.Group>
      {fetchedData ? <Resultpagination total={fetchedData.search.total} search={getTracks} /> : ''}
    </div>
  );

};


export default Search;
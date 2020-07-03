import React, { FormEvent, ChangeEvent } from 'react';
import { BasicComponent, QueryResult, Track, ListType } from '../../type'
import { Button, ListGroup, Col, Form, FormControl, InputGroup } from 'react-bootstrap'
import Resultpagination from './pagination';
import { useDispatch, useSelector } from 'react-redux'
import { setPagination } from '../../reducers/pagination'
import { addItem, removeItem } from '../../reducers/list'
import { useLazyQuery } from '@apollo/client';


import queries from '../../graphql/queries';



const Search: React.FC<BasicComponent> = ({ showmessage }) => {

  const [getTracks, { data, error }] = useLazyQuery(queries.search, {
    fetchPolicy: "network-only", errorPolicy: 'none',
  })

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

  const changeFavorite = (event: ChangeEvent<HTMLInputElement>) => {

    const input = event.target as HTMLInputElement

    console.log(input.parentNode?.nextSibling?.textContent)

    const key = input.parentNode?.nextSibling?.textContent;



    if (input.checked === true) {

      dispatch(addItem(input.value))
    }
    else {

      dispatch(removeItem(input.value))
    }
  }

  if (fetchedData) {
    total = fetchedData.search.total
    total= Math.floor(total / 10)
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
            <br/>
              <Button type="submit" variant="outline-primary" >Search </Button>
              <Button type="button"  className="buttonSpace" variant="outline-info"   >Save </Button>
            </Col>
          </Form.Row>
          <br/>
        </form>
        <ListGroup variant="flush">
          {fetchedData ? fetchedData.search.tracks.map((track: Track) => (

            <Form.Row key={track.uri} >
              <Col>
                <InputGroup.Prepend>

                  {dataList.list.includes(track.uri) ?
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
      {fetchedData ? <Resultpagination total={total} search={getTracks} /> : ''}
    </div>
  );

};


export default Search;
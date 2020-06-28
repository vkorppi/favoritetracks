import React, { FormEvent } from 'react';
import { BasicComponent, Query } from '../../type'
import { Button, ListGroup, Col, Form, FormControl } from 'react-bootstrap'
import Resultpagination from './pagination';
import { useDispatch } from 'react-redux'
import { setPagination } from '../../reducers/pagination'
import { useLazyQuery } from '@apollo/client';
import queries from '../../graphql/queries';


const Search: React.FC<BasicComponent> = ({ showmessage }) => {

  const [getTracks, trackObject] = useLazyQuery(queries.search, {
    fetchPolicy: "network-only", errorPolicy: 'none',
    onError: (error) => {
      showmessage(error.message)
    }
  })

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



  return (
    <div >
      <Form.Group>
        <form onSubmit={searchTracks}>
          <Form.Row>
            <Col>
              <FormControl  id="searchTrack" type="text" />
            </Col>
          </Form.Row>
          <Form.Row>
            <Col>
              <Button type="submit" variant="primary" >Search </Button>
            </Col>
          </Form.Row>
        </form>
        <ListGroup variant="flush">
          {fetchedData ? fetchedData.search.tracks.map((track: string) => (

            <Form.Row key={Math.ceil(Math.random() * 100000)} >
              <Col>
                <ListGroup.Item>{track}</ListGroup.Item>
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
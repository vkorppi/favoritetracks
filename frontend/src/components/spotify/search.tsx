import React, { FormEvent } from 'react';
import { BasicComponent, Query } from '../../type'
import { Button, ListGroup } from 'react-bootstrap'
import Resultpagination from './pagination';
import { useDispatch } from 'react-redux'
import { setPagination } from '../../reducers/pagination'
import { useLazyQuery } from '@apollo/client';
import queries from '../../graphql/queries';


const Search: React.FC<BasicComponent> = ({showmessage}) => {

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
 
    dispatch(setPagination(1,10, inputvalue, 1))

  }



  return (
    <div >
      <div className="container">
        <form onSubmit={searchTracks}>
          <div className="form-group row">
            <div className="col-xs-2">
              <div>
                <input className="form-control" id="ex1" type="text" /></div>
            </div>
          </div>

          <div className="form-group row">
            <div className="col-xs-2">
              <Button type="submit" variant="primary" >Search </Button>
            </div>
          </div>
        </form>
        <ListGroup variant="flush">
          {fetchedData ? fetchedData.search.tracks.map((track: string) => (

            <div key={Math.ceil(Math.random() * 100000)} className="form-group row">
              <div className="col-xs-2">
                <ListGroup.Item>{track}</ListGroup.Item>
              </div>
            </div>

          )) : ''}
        </ListGroup>
      </div>
      {fetchedData ? <Resultpagination total={fetchedData.search.total} search={getTracks} /> : ''}
    </div>
  );

};


export default Search;
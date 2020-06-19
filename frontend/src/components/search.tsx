import React, { FormEvent } from 'react';
import { QueryTuple, Query } from '../type'
import { Button, ListGroup } from 'react-bootstrap'
import Resultpagination from '../components/pagination';
import { useDispatch } from 'react-redux'
import { setPagination } from '../reducers/pagination'

const Search: React.FC<QueryTuple> = (props) => {

  const searchresult = props.searchResult as unknown 
  const data: Query = searchresult as Query  

  const dispatch = useDispatch()

  const searchTracks = (event: FormEvent) => {

    event.preventDefault()
    const form = event.target as HTMLFormElement;
    const input = form[0] as HTMLInputElement
    const inputvalue = input.value

    input.value = ''


    props.searchAction({ variables: { name: inputvalue, page: '1' } })
 

    let total = 10;

    if (data) {
      total = data.search.total
    }


    dispatch(setPagination(1, total < 10 ? total : 10, inputvalue, 1))

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
          {data ? data.search.tracks.map((track: string) => (

            <div key={Math.ceil(Math.random() * 100000)} className="form-group row">
              <div className="col-xs-2">
                <ListGroup.Item>{track}</ListGroup.Item>
              </div>
            </div>

          )) : ''}
        </ListGroup>
      </div>
      {data ? <Resultpagination total={data.search.total} searchObject={props.searchAction} /> : ''}
    </div>
  );

};


export default Search;
import React, { FormEvent } from 'react';
import { ShowMessageType,UserType } from '../../type'
import { Button, ListGroup, InputGroup, FormControl } from 'react-bootstrap'
import { useLazyQuery } from '@apollo/client';
import queries from '../../graphql/queries';


const Search: React.FC<ShowMessageType> = ({ showmessage }) => {


  const [searchUser, {data,error}] = useLazyQuery(queries.searchUsers, {

    fetchPolicy: "network-only", errorPolicy: 'none',

    //Causes endless loop
    /*
    onError: (error) => {
      showmessage(error.message)
    }
    */

  })



  const findUser = (event: FormEvent) => {

   
    event.preventDefault()
    const form = event.target as HTMLFormElement;
    const input = form[1] as HTMLInputElement
    const inputvalue = input.value

    searchUser({ variables: { value: inputvalue} })
   
    if(error) {
      showmessage(error?.message)
    }

    input.value = ''

  }
  
 // const data = UserObjects.data;
  

  return (
    <div >
      <div className="container">
        <form onSubmit={findUser}>
          <div className="form-group row">
            <div className="col-xs-2">
              <div>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <Button type="submit" variant="primary">Search</Button>
                  </InputGroup.Prepend>
                  <FormControl placeholder="username,  name" />
                </InputGroup>
              

              </div>
            </div>
          </div>

        </form>
        <ListGroup variant="flush">
          
          {data ? data.searchUser.map((user: UserType) => (

            <div key={Math.ceil(Math.random() * 100000)} className="form-group row">
              <div className="col-xs-2">
                <ListGroup.Item>{`${user.firstname} ${user.lastname}`}</ListGroup.Item>
              </div>
            </div>

          )) : ''}

          
        </ListGroup>
      </div>

    </div>
  );

};


export default Search;
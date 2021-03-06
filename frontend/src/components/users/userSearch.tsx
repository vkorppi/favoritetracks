import React, { FormEvent } from 'react';
import { BasicComponent } from '../../types/component'
import { UserType } from '../../types/user'
import { Button, ListGroup, InputGroup, FormControl } from 'react-bootstrap'
import { useLazyQuery } from '@apollo/client';
import userq from '../../graphql/user';
import { Link } from 'react-router-dom';

const Search: React.FC<BasicComponent> = ({ showmessage }) => {


  const [searchUser, {data,error}] = useLazyQuery(userq.searchUsers, {

    fetchPolicy: "no-cache", errorPolicy: 'none',

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
      showmessage(error?.message,'danger')
    }

    input.value = ''

  }

  return (
    <div >
      <div className="container">
        <form onSubmit={findUser}>
          <div className="form-group row">
            <div className="col-xs-2">
              <div>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <Button type="submit" variant="primary" id="searchUserbutton">Search</Button>
                  </InputGroup.Prepend>
                  <FormControl placeholder="username,  name" id="UsersearchInput" />
                </InputGroup>
              

              </div>
            </div>
          </div>

        </form>
        <ListGroup variant="flush">
        
          {data ? data.searchUser.map((user: UserType) => (

            <div key={user.id} className="form-group row">
              <div className="col-xs-2">
                <ListGroup.Item><Link to={`/details/${user.id}`}>{`${user.firstname} ${user.lastname} ${user.username}`}</Link></ListGroup.Item>
                

				
              </div>
            </div>

          )) : ''}
          
        </ListGroup>
      </div>

    </div>
  );

};


export default Search;
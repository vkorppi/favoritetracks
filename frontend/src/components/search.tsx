import React, { FormEvent } from 'react';
import { queryTuple  } from '../type'
import {  Form, Button,Row,Col } from 'react-bootstrap'

const Search: React.FC<queryTuple> = (props) => {
    
    const data = props.searchResult.data

    const searchTracks = (event: FormEvent) => {
    
        event.preventDefault()
        const form = event.target as HTMLFormElement;
        const input = form[0] as  HTMLInputElement
        const inputvalue=input.value
        
        input.value=''

        console.log(inputvalue)

        props.searchAction({ variables: { name: inputvalue,page:1 } })
        
      }

    return (
        <div className="search">

            <div className="container">

               
                    <form onSubmit={searchTracks}>
                         <div className="form-group row">
                                <div className="col-xs-2">
                                    <div><input className="form-control" id="ex1" type="text"/></div>
                                </div> 
                         </div> 
                         
                         <div className="form-group row">
                            <div className="col-xs-2">

                        <Button type="submit" variant="primary" >Search </Button> 
                        </div> 
                         </div> 
                    </form>
                 
                     
        {data ? data.search.tracks.map((track: string) => (

<div key={Math.ceil(Math.random() * 100000)} className="form-group row">
<div className="col-xs-2">
            <p >{track}</p>
            </div> 
            </div> 
       
          )) : ''}
            
            </div> 
        </div>        
      );
  
  };


  export default Search;
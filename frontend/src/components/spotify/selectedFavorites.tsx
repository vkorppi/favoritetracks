import React, { FormEvent, ChangeEvent } from 'react';
import {  ListType,ComponentAttributeModal } from '../../type'
import { Button, ListGroup, Col, Form, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addItem, removeItem } from '../../reducers/list'




const SelectedFavorites: React.FC<ComponentAttributeModal> = ({ show }) => {


  const listState = (state: ListType) => state
  const dataList = useSelector(listState)


  const dispatch = useDispatch()


  const saveTracks = (event: FormEvent) => {


    event.preventDefault()


  }

  const changeSelected = (event: ChangeEvent<HTMLInputElement>) => {

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
        <form onSubmit={saveTracks}>
          <Form.Row>
            <Col>
              <FormControl id="saveTracks" type="text" />
            </Col>
          </Form.Row>
          <Form.Row>
            <Col>
            <br/>
              <Button type="button"  className="buttonSpace" variant="primary"   >Save </Button>
            </Col>
          </Form.Row>
        </form>
        <ListGroup variant="flush">

        </ListGroup>
      </Form.Group>
     
    </div>
  );

};


export default SelectedFavorites;
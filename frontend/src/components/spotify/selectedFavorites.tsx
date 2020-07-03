import React, { FormEvent, ChangeEvent } from 'react';
import { ComponentAttributeList } from '../../type'
import { Button, ListGroup, Col, Form, Modal, Card, InputGroup } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { addItem, removeItem } from '../../reducers/list'
import { setShow } from '../../reducers/modal';
import queries from '../../graphql/queries';
import { useMutation } from '@apollo/client';



const SelectedFavorites: React.FC<ComponentAttributeList> = ({ show, list,showmessage }) => {


  const [addTrack, result] = useMutation(queries.addTrack, {
    errorPolicy: 'none', onError: (error) => {
        showmessage(error.message,'danger')
    }
})



  const dispatch = useDispatch()

  const saveTracks = (event: FormEvent) => {

    console.log(Object.keys(list.list))

    event.preventDefault()


  }

  const changeSelected = (event: ChangeEvent<HTMLInputElement>) => {

    const input = event.target as HTMLInputElement

    const value = input.parentNode?.nextSibling?.textContent as string;
    const key = input.value

    const collection = Object.values(document.getElementsByTagName('input'));
    const checkbox = collection.find(element => element.value === key) as HTMLInputElement

    if (input.checked === true) {

      checkbox.checked=true

      dispatch(addItem(key,value))
    }
    else {
  
      checkbox.checked=false

      dispatch(removeItem(key))
    }
  }

  const close = () => {

    dispatch(setShow(false))
   
  }



  return (
    <Modal centered show={show}>
      <Modal.Body>
        <Card>
          <Card.Header></Card.Header>
          <Card.Body>
            <Form.Group>
              <form onSubmit={saveTracks}>
                <ListGroup variant="flush">
                  {list ? Object.keys(list.list).map((uri: string) => (

                    <Form.Row key={uri} >
                      <Col>
                        <InputGroup.Prepend> 
                             
                            <InputGroup.Checkbox  defaultChecked onChange={changeSelected} value={uri} />
                              
                          <ListGroup.Item>{list.list[uri]}</ListGroup.Item>
                        </InputGroup.Prepend>

                      </Col>
                    </Form.Row>

                  )) : ''}
                </ListGroup>
                <Form.Row>
                  <Col>
                    <br />
                    <Button type="submit" className="buttonSpace" variant="primary"   >Ok </Button>
                    <Button className="buttonSpace" type="button" variant="primary" onClick={() => close()}  >Close </Button>
                  </Col>
                </Form.Row>
              </form>
              <ListGroup variant="flush">
              </ListGroup>
            </Form.Group>
          </Card.Body>
        </Card>
      </Modal.Body>
    </Modal>
  );

};


export default SelectedFavorites;
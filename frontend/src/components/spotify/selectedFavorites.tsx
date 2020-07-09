import React, { ChangeEvent } from 'react';
import { ComponentAttributeList } from '../../type'
import { Button, ListGroup, Col, Form, Modal, Card, InputGroup } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { addItem, removeItem, clearItems } from '../../reducers/list'
import { setShow } from '../../reducers/modal';
import queries from '../../graphql/queries';
import { useMutation } from '@apollo/client';



const SelectedFavorites: React.FC<ComponentAttributeList> = ({ show, list, showmessage }) => {


  const [addTrack] = useMutation(queries.addTrack, {
    errorPolicy: 'none', onError: (error) => {
      showmessage(error.message, 'danger')
    }
  })


  const dispatch = useDispatch()

  const close = () => {

    dispatch(setShow(false))

  }

  const saveTracks = async () => {

    await addTrack({
      variables:
      {
        tracks: Object.keys(list.list)
      }
    });


    const collection = Object.values(document.getElementsByTagName('input'));
    const checkboxes = collection.filter(element => element.checked === true)
    checkboxes.forEach(element => { element.checked = false; element.disabled = true })

    dispatch(clearItems())

    close();


  }

  const changeSelected = (event: ChangeEvent<HTMLInputElement>) => {

    const input = event.target as HTMLInputElement

    const value = input.parentNode?.nextSibling?.textContent as string;
    const key = input.value


    if (input.checked === true) {


      dispatch(addItem(key, value))
    }
    else {


      dispatch(removeItem(key))
    }
  }




  return (
    <Modal centered show={show}>
      <Modal.Body>
        <Card>
          <Card.Header></Card.Header>
          <Card.Body>
            <Form.Group>
              <form >
                <ListGroup variant="flush">
                  {list ? Object.keys(list.list).map((uri: string) => (

                    <Form.Row key={uri} >
                      <Col>
                        <InputGroup.Prepend>

                          <InputGroup.Checkbox defaultChecked onChange={changeSelected} value={uri} />

                          <ListGroup.Item>{list.list[uri]}</ListGroup.Item>
                        </InputGroup.Prepend>

                      </Col>
                    </Form.Row>

                  )) : ''}
                </ListGroup>
                <Form.Row>
                  <Col>
                    <br />
                    <Button type="button" className="buttonSpace" variant="primary" onClick={() => saveTracks()}   >Ok </Button>
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
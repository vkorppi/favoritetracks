import React, { ChangeEvent } from 'react';
import { ComponentAttributeList } from '../../types/component'
import { Button, ListGroup, Col, Form, Modal, Card, InputGroup } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { addItem, removeItem, clearItems } from '../../reducers/favorites'
import { setShow } from '../../reducers/modal';
import trackm from '../../graphql/track';
import { useMutation } from '@apollo/client';



const SelectedFavorites: React.FC<ComponentAttributeList> = ({ show, tracks, showmessage }) => {

  interface Testi {
    href: string;
  }

  const [addTrack] = useMutation(trackm.addTrack, {
    errorPolicy: 'none', onError: (error) => {
      showmessage(error.message, 'danger')
    }
  })


  const dispatch = useDispatch()

  const close = () => {

    dispatch(setShow({ data: { show: false } }))

  }

  const saveTracks = async () => {

    await addTrack({
      variables:
      {
        tracks: Object.values(tracks.favorites)
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
    const uri = input.value
    

    if (input.checked === true) {

      const name = input.parentNode?.nextSibling?.textContent as string;
      const href = ((input.parentNode?.nextSibling?.childNodes[1] as unknown) as Testi).href

      dispatch(addItem({name:name,url:href,spotifUri:uri}))
    }
    else {


      dispatch(removeItem({spotifUri:uri}))
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
                  {tracks ? Object.keys(tracks.favorites).map((uri: string) => (

                    <Form.Row key={uri} >
                      <Col>
                        <InputGroup.Prepend>

                          <InputGroup.Checkbox id={'preview'+uri.replace('spotify:track:','')} defaultChecked onChange={changeSelected} value={uri} />

                          <ListGroup.Item>{tracks.favorites[uri].name}</ListGroup.Item>
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
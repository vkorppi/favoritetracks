import React, { ChangeEvent } from 'react';
import { BasicComponent, Track, ListType } from '../../type'
import { useQuery, useMutation } from '@apollo/client';
import queries from '../../graphql/queries';
import { Form, ListGroup, InputGroup, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem } from '../../reducers/list';


const Favorites: React.FC<BasicComponent> = ({ showmessage }) => {


    const { data, refetch } = useQuery(queries.getList, {
        fetchPolicy: "network-only", errorPolicy: 'none'
    })

    const [removeTrack] = useMutation(queries.removeTrack, {
        errorPolicy: 'none',
        onError: (error) => {
            showmessage(error.message, 'danger')
        }
    })

    const listState = (state: ListType) => state
    const dataList = useSelector(listState)

    const dispatch = useDispatch()

    const changeFavorite = (event: ChangeEvent<HTMLInputElement>) => {

        console.log(dataList)

        const input = event.target as HTMLInputElement

        console.log(input.parentNode?.nextSibling?.textContent)

        const value = input.parentNode?.nextSibling?.textContent as string;
        const key = input.value


        if (input.checked === true) {

            dispatch(addItem(key, value))
        }
        else {

            dispatch(removeItem(key))
        }
    }

    const remove = async () => {


        const success = await removeTrack({
            variables: {
                tracks: Object.keys(dataList.list)
            }
        });

        await refetch();
        console.log(Object.keys(dataList.list))

    }

    console.log(dataList)

    return (
        <div >

            <Form.Group>
                <ListGroup variant="flush">
                    {data ? data.getList.map((track: Track) => (

                        <Form.Row key={track.uri} >
                            <Col>
                                <InputGroup.Prepend>

                                    <InputGroup.Checkbox onChange={changeFavorite} value={track.uri} />

                                    <ListGroup.Item> {track.name} </ListGroup.Item>
                                </InputGroup.Prepend>

                            </Col>
                        </Form.Row>

                    )) : ''}

                </ListGroup>

            </Form.Group>
            <Form.Group>
                <Form.Row>
                    <Col>
                        <br />
                        <Button type="button" className="buttonSpace" variant="outline-info" onClick={() => remove()}  >remove </Button>
                    </Col>
                </Form.Row>
            </Form.Group>

        </div>
    );

};


export default Favorites;
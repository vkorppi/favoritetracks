import React from 'react';
import { MessageAttributes } from "../type";
import {  Alert } from 'react-bootstrap'

const Message: React.FC<MessageAttributes> = (props) => {

    if(!props.text) {
        return (
            <div>
                <div></div>
            </div>
        )
    }


    return (
        <Alert variant="danger"> {props.text} </Alert>
    )
};


export default Message;

import React from 'react';
import { FormControl, Alert } from 'react-bootstrap';
import { ComponentInput } from '../../type';


const InputForm: React.FC<ComponentInput> = ({ hasError, errorMessage, inputMessage, id, type }) => {

    return (

        <div >
            {
                hasError ? <Alert variant={'danger'}>{errorMessage}</Alert> : ''
            }
            <FormControl placeholder={inputMessage} id={id} type={type} />

        </div>

    );



};

export default InputForm;
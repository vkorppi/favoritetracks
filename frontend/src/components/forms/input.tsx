
import React from 'react';
import { FormControl, Alert } from 'react-bootstrap';
import { ComponentInput } from '../../types/component';


const InputForm: React.FC<ComponentInput> = ({ hasError, errorMessage, inputMessage, id, type, defaultInput }) => {

    return (

        <div >
            {
                hasError ? <Alert variant={'danger'}>{errorMessage}</Alert> : ''
            }
            <FormControl defaultValue={defaultInput} placeholder={inputMessage} id={id} type={type} />

        </div>

    );



};

export default InputForm;
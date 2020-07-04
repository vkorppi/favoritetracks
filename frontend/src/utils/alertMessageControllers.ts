import { isInputEmail, isInputaAddress, InputNotEmpty, isInputName, isInputDate } from "./userInputValidators"
import { AlertAttributes } from "../type"

export const validateAlert = (object: AlertAttributes,values: string[]): AlertAttributes => {

    object.firstname = !isInputName(values[0])
    object.lastname = !isInputName(values[1])
    object.birthdate = !isInputDate(values[2])
    object.email = !isInputEmail(values[3])
    object.address = !isInputaAddress(values[4])
    object.username = !InputNotEmpty(values[5])
    object.password = !InputNotEmpty(values[6])

    return object
}

export const validationFailed = (object: AlertAttributes): boolean => {

    return  object.firstname ||
    object.lastname ||
    object.birthdate ||
    object.email ||
    object.address ||
    object.username ||
    object.password
}

export default {
    validateAlert,
    validationFailed
}


export const isInputName = (value:string): boolean => {

    const nameCheck = /^[A-Z][a-z]*$/;
    return nameCheck.test(value)
}

export const isInputEmail = (value:string): boolean => {

    const emailCheck = /.*\..*@.*\..*/i;
    return emailCheck.test(value)
    
}

export const isInputDate = (value:string): boolean => {

    const birthdateCheck =/^(([0-2][0-9])|([3][0-2]))\.((0[1-9])|(1[0-2]))\.([1-9][0-9][0-9][0-9])$/i;
    return birthdateCheck.test(value)
}


export const isInputString = (value: string): boolean => {

    return typeof value === 'string';

}

export default {
    isInputName,
    isInputEmail,
    isInputDate,
    isInputString

}
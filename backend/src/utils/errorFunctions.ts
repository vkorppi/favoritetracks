


export const getMessage = (type: string, value: string): string => {

    switch (type) {
        case 'string':
            return `${value}: ${value} was not a string`;
            break;
        case 'format':
            `${value}: ${value} was not in correct format`;
            break;
        case 'EnvString':
            `Enviroment variable: ${value} was not a string`;
            break;
        case 'EnvNumber':
            `Enviroment variable: ${value} was not a numbers`;
            break;
        default:
            return '';
    }
    return '';

};
import * as Yup from 'yup';

 export  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
        .matches(/^[A-Z][a-z]*$/, "Firstname must start with uppercasleter followed by lowercase letters")
        .required("Firstname is required"),
    lastName: Yup.string()
        .matches(/^[A-Z][a-z]*$/, "Lastname must start with uppercasleter followed by lowercase letters")
        .required("Lastname is required"),
    birthdate: Yup.string()
        .matches(/^(([0-2][0-9])|([3][0-2]))\.((0[1-9])|(1[0-2]))\.([1-9][0-9][0-9][0-9])$/i, "Birthdate must be in dd.mm.yyyy format")
        .required("birthdate is required"),
    email: Yup.string()
        .matches(/.*\..*@.*\..*/i, "Email was not in correct format")
        .required("email is required"),
    address: Yup.string()
        .matches(/^[A-Z][a-z]* [1-9][0-9]*$/, 'Address must start with uppecase letter followed by lowercase letters. '
            + 'Lowercase letters needs to be followed by space and numbers')
        .required("address is required"),
    username: Yup.string()
        .required("Username can´t be empty"),
    password: Yup.string()
        .required("Password can´t be empty")
});
import * as yup from 'yup';

const validRoles = ['admin', 'user', 'guest'];

export const userValidationSchema = yup.object().shape({
  fullName: yup.string()
    .matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/)
    .min(3)
    .max(30)
    .required(),
  email: yup.string()
    .email()
    .required(),
  password: yup.string()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/)
    .required(),
  address: yup.array()
    .of(yup.object().shape({
      location: yup.string().required(),
      apartmentName: yup.string().required(),
      houseNumber: yup.string().required()
    }))
    .required(),
  phoneNumber: yup.string()
    .matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]+$/)
    .required(),
  role: yup.string()
    .oneOf(validRoles)
    .required(),
});

export const passwordValidationSchema = yup.object().shape({
  password: yup.string()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])(?=.{8,})/)
    .required(),
});

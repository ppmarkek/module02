import * as Yup from 'yup';

export const formSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[A-Z][a-z]+$/, 'Name must start with an uppercase letter')
    .required('Name is required'),
  age: Yup.number()
    .positive('Age must be a positive number')
    .integer('Age must be an integer')
    .required('Age is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .matches(/\d/, 'Password must contain a number')
    .matches(/[A-Z]/, 'Password must contain an uppercase letter')
    .matches(/[a-z]/, 'Password must contain a lowercase letter')
    .matches(/[\W_]+/, 'Password must contain a special character')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  gender: Yup.string().required('Gender selection is required'),
  termsAndConditions: Yup.boolean().oneOf(
    [true],
    'You must accept the terms and conditions'
  ),
  image: Yup.mixed()
    .required('Image is required')
    .test('fileSize', 'The file size must not exceed 5 MB', (value) => {
      return value && (value as File).size <= 5242880;
    })
    .test('fileFormat', 'Only JPEG and PNG are accepted', (value) => {
      return (
        value && ['image/jpeg', 'image/png'].includes((value as File).type)
      );
    }),
});

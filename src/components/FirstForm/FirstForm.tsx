import './style.css';
import { formSchema } from '../../yupSchema';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {
  setName,
  setAge,
  setEmail,
  setPassword,
  setGender,
  setTermsAndConditions,
  setImage,
} from '../../redux/formReducer';
import { useNavigate } from 'react-router-dom';

interface FormValues {
  name: string;
  age: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  termsAndConditions: boolean;
  image: File | null;
}

const FirstForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (values: FormValues) => {
    dispatch(setName(values.name));
    dispatch(setAge(values.age));
    dispatch(setEmail(values.email));
    dispatch(setPassword(values.password));
    dispatch(setGender(values.gender));
    dispatch(setTermsAndConditions(values.termsAndConditions));

    if (values.image) {
      const reader = new FileReader();

      reader.onload = async (event) => {
        if (event.target?.result) {
          dispatch(setImage(event.target.result.toString()));
          navigate('/');
        }
      };
      reader.readAsDataURL(values.image);
    } else {
      navigate('/');
    }
  };

  return (
    <div className={'wrapper'}>
      <Formik
        initialValues={{
          name: '',
          age: '',
          email: '',
          password: '',
          confirmPassword: '',
          gender: '',
          termsAndConditions: false,
          image: null,
        }}
        validationSchema={formSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form className="form">
            <div className={'inputBox'}>
              <p>Name</p>
              <Field name="name" type="text" />
              <ErrorMessage
                name="name"
                component="p"
                className="errorMessage"
              />
            </div>

            <div className={'inputBox'}>
              <p>Age</p>
              <Field name="age" type="number" />
              <ErrorMessage name="age" component="p" className="errorMessage" />
            </div>

            <div className={'inputBox'}>
              <p>Email</p>
              <Field name="email" type="email" />
              <ErrorMessage
                name="email"
                component="p"
                className="errorMessage"
              />
            </div>

            <div className={'inputBox'}>
              <p>Password</p>
              <Field name="password" type="password" />
              <ErrorMessage
                name="password"
                component="p"
                className="errorMessage"
              />
            </div>

            <div className={'inputBox'}>
              <p>Confirm password</p>
              <Field name="confirmPassword" type="password" />
              <ErrorMessage
                name="confirmPassword"
                component="p"
                className="errorMessage"
              />
            </div>

            <div className={'selectGender'}>
              <label className={'selectGenderBox'}>
                <p>Men</p>
                <Field type="radio" name="gender" value="male" />
              </label>
              <label className={'selectGenderBox'}>
                <p>Women</p>
                <Field type="radio" name="gender" value="female" />
              </label>
            </div>
            <ErrorMessage
              name="gender"
              component="p"
              className="errorMessage"
            />

            <div className={'termsAndConditions'}>
              <label>
                <p>Terms and Conditions</p>
                <Field type="checkbox" name="termsAndConditions" />
              </label>
              <ErrorMessage
                name="termsAndConditions"
                component="p"
                className="errorMessage"
              />
            </div>

            <div className={'uploadImage'}>
              <p>Upload image</p>
              <input
                name="image"
                type="file"
                onChange={(event) => {
                  const file = event.target.files
                    ? event.target.files[0]
                    : null;
                  setFieldValue('image', file);
                }}
              />
              <ErrorMessage
                name="image"
                component="p"
                className="errorMessage"
              />
            </div>

            <button id="Submit" type="submit">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FirstForm;

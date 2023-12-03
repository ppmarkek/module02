import '../style.css';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { formSchema } from '../../yupSchema';
import * as Yup from 'yup';
import {
  setName,
  setAge,
  setEmail,
  setPassword,
  setGender,
  setTermsAndConditions,
  setImage,
  setCountry,
} from '../../redux/formReducer';

interface FormValues {
  name: string;
  age: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  termsAndConditions: boolean;
  image: File | null;
  countries: string;
}

interface RootState {
  countries: {
    countries: string[];
  };
}

const FirstForm = () => {
  const countries = useSelector(
    (state: RootState) => state.countries.countries
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({});

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    let formValues: FormValues = {
      name: formData.get('name') as string,
      age: formData.get('age') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
      gender: formData.get('gender') as string,
      termsAndConditions: formData.has('termsAndConditions'),
      image: formData.get('image') as File | null,
      countries: formData.get('country') as string,
    };

    formValues = {
      ...formValues,
      termsAndConditions: formValues.termsAndConditions === true,
    };

    try {
      await formSchema.validate(formValues, { abortEarly: false });
      dispatch(setName(formValues.name));
      dispatch(setAge(formValues.age));
      dispatch(setEmail(formValues.email));
      dispatch(setPassword(formValues.password));
      dispatch(setGender(formValues.gender));
      dispatch(setTermsAndConditions(formValues.termsAndConditions));
      dispatch(setCountry(formValues.countries));

      const imageFile = formValues.image;
      if (imageFile && imageFile.size > 0) {
        const reader = new FileReader();
        reader.onload = (event: ProgressEvent<FileReader>) => {
          if (event.target?.result) {
            dispatch(setImage(event.target.result as string));
            navigate('/');
          }
        };
        reader.readAsDataURL(imageFile);
      } else {
        navigate('/');
      }
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const newErrors = err.inner.reduce((acc, error) => {
          if (error.path) acc[error.path] = error.message;
          return acc;
        }, {} as { [key: string]: string });
        setErrors(newErrors);
      }
    }
  };

  const handleBlur = async (
    event: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const name = event.target.name;
    let value: string | boolean;

    if (event.target.type === 'checkbox') {
      value = (event.target as HTMLInputElement).checked;
    } else {
      value = event.target.value;
    }

    try {
      const schema = Yup.reach(formSchema, name) as Yup.AnySchema;
      await schema.validate(value);
      setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    } catch (err) {
      const error = err as Error;
      if (error instanceof Yup.ValidationError) {
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error.message }));
      }
    }
  };

  return (
    <div className={'wrapper'}>
      <form ref={formRef} onSubmit={handleSubmit} className="form">
        <div className={'inputBox'}>
          <p>Name</p>
          <input
            name="name"
            type="text"
            autoComplete="name"
            onBlur={handleBlur}
          />
          {errors.name && <p className="errorMessage">{errors.name}</p>}
        </div>

        <div className={'inputBox'}>
          <p>Age</p>
          <input
            name="age"
            type="number"
            autoComplete="age"
            onBlur={handleBlur}
          />
          {errors.age && <p className="errorMessage">{errors.age}</p>}
        </div>

        <div className={'inputBox'}>
          <p>Email</p>
          <input
            name="email"
            type="email"
            autoComplete="email"
            onBlur={handleBlur}
          />
          {errors.email && <p className="errorMessage">{errors.email}</p>}
        </div>

        <div className={'inputBox'}>
          <p>Password</p>
          <input
            name="password"
            type="password"
            autoComplete="new-password"
            onBlur={handleBlur}
          />
          {errors.password && <p className="errorMessage">{errors.password}</p>}
        </div>

        <div className={'inputBox'}>
          <p>Confirm Password</p>
          <input
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            onBlur={handleBlur}
          />
          {errors.confirmPassword && (
            <p className="errorMessage">{errors.confirmPassword}</p>
          )}
        </div>

        <div className={'selectGender'}>
          <label className={'selectGenderBox'}>
            <p>Men</p>
            <input
              type="radio"
              name="gender"
              value="male"
              onBlur={handleBlur}
            />
          </label>
          <label className={'selectGenderBox'}>
            <p>Women</p>
            <input
              type="radio"
              name="gender"
              value="female"
              onBlur={handleBlur}
            />
          </label>
        </div>
        {errors.gender && <p className="errorMessage">{errors.gender}</p>}

        <div className={'termsAndConditions'}>
          <label>
            <p>Terms and Conditions</p>
            <input
              type="checkbox"
              name="termsAndConditions"
              onBlur={handleBlur}
            />
          </label>
        </div>
        {errors.termsAndConditions && (
          <p className="errorMessage">{errors.termsAndConditions}</p>
        )}

        <div className={'uploadImage'}>
          <p>Upload Image</p>
          <input name="image" type="file" onBlur={handleBlur} />
        </div>

        <div className={'inputBox'}>
          <p>Country</p>
          <select name="country" id="country" onBlur={handleBlur}>
            {countries.map((country: string) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {errors.country && <p className="errorMessage">{errors.country}</p>}
        </div>

        <button type="submit" id="Submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FirstForm;

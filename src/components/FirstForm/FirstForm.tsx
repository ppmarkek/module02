import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
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
}

const FirstForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({});

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const formValues: FormValues = {
      name: formData.get('name') as string,
      age: formData.get('age') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
      gender: formData.get('gender') as string,
      termsAndConditions: formData.get('termsAndConditions') === 'on',
      image: formData.get('image') as File | null,
    };

    try {
      await formSchema.validate(formValues, { abortEarly: false });

      dispatch(setName(formValues.name));
      dispatch(setAge(formValues.age));
      dispatch(setEmail(formValues.email));
      dispatch(setPassword(formValues.password));
      dispatch(setGender(formValues.gender));
      dispatch(setTermsAndConditions(formValues.termsAndConditions));

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

  return (
    <div className={'wrapper'}>
      <form ref={formRef} onSubmit={handleSubmit} className="form">
        <div className={'inputBox'}>
          <p>Name</p>
          <input name="name" type="text" />
          {errors.name && <p className="errorMessage">{errors.name}</p>}
        </div>

        <div className={'inputBox'}>
          <p>Age</p>
          <input name="age" type="number" />
          {errors.age && <p className="errorMessage">{errors.age}</p>}
        </div>

        <div className={'inputBox'}>
          <p>Email</p>
          <input name="email" type="email" />
          {errors.email && <p className="errorMessage">{errors.email}</p>}
        </div>

        <div className={'inputBox'}>
          <p>Password</p>
          <input name="password" type="password" />
          {errors.password && <p className="errorMessage">{errors.password}</p>}
        </div>

        <div className={'inputBox'}>
          <p>Confirm Password</p>
          <input name="confirmPassword" type="password" />
          {errors.confirmPassword && (
            <p className="errorMessage">{errors.confirmPassword}</p>
          )}
        </div>

        <div className={'selectGender'}>
          <label className={'selectGenderBox'}>
            <p>Men</p>
            <input type="radio" name="gender" value="male" />
          </label>
          <label className={'selectGenderBox'}>
            <p>Women</p>
            <input type="radio" name="gender" value="female" />
          </label>
        </div>
        {errors.gender && <p className="errorMessage">{errors.gender}</p>}

        <div className={'termsAndConditions'}>
          <label>
            <p>Terms and Conditions</p>
            <input type="checkbox" name="termsAndConditions" />
          </label>
        </div>
        {errors.termsAndConditions && (
          <p className="errorMessage">{errors.termsAndConditions}</p>
        )}

        <div className={'uploadImage'}>
          <p>Upload Image</p>
          <input name="image" type="file" />
        </div>
        {errors.image && <p className="errorMessage">{errors.image}</p>}

        <button type="submit" id="Submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FirstForm;

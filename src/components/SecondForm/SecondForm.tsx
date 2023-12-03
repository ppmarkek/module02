import '../style.css';
import { formSchema } from '../../yupSchema';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import {
  setName,
  setAge,
  setEmail,
  setPassword,
  setGender,
  setImage,
  setTermsAndConditions,
  setCountry,
} from '../../redux/formReducer';

interface FormValidationValues {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: 'male' | 'female';
  termsAndConditions: boolean;
  image: File | null;
  countries: string;
}

interface RootState {
  countries: {
    countries: string[];
  };
}

const SecondForm = () => {
  const countries = useSelector(
    (state: RootState) => state.countries.countries
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<FormValidationValues>({
    resolver: yupResolver(formSchema as never),
  });

  const handleBlur = async (field: keyof FormValidationValues) => {
    await trigger(field);
  };

  const onSubmit: SubmitHandler<FormValidationValues> = (values) => {
    dispatch(setName(values.name));
    dispatch(setAge(values.age));
    dispatch(setEmail(values.email));
    dispatch(setPassword(values.password));
    dispatch(setGender(values.gender));
    dispatch(setTermsAndConditions(values.termsAndConditions));
    dispatch(setCountry(values.countries));

    const imageInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const imageFile = imageInput?.files ? imageInput.files[0] : null;

    if (imageFile && imageFile.size > 0) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          dispatch(setImage(event.target.result.toString()));
          navigate('/');
        }
      };
      reader.readAsDataURL(imageFile);
    } else {
      navigate('/');
    }
  };

  return (
    <div className={'wrapper'}>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className={'inputBox'}>
          <p>Name</p>
          <input
            type="text"
            {...register('name')}
            onBlur={() => handleBlur('name')}
          />
          {errors.name && <p className="errorMessage">{errors.name.message}</p>}
        </div>
        <div className={'inputBox'}>
          <p>Age</p>
          <input
            type="number"
            {...register('age')}
            onBlur={() => handleBlur('age')}
          />
          {errors.age && <p className="errorMessage">{errors.age.message}</p>}
        </div>

        <div className={'inputBox'}>
          <p>Email</p>
          <input
            type="email"
            {...register('email')}
            onBlur={() => handleBlur('email')}
          />
          {errors.email && (
            <p className="errorMessage">{errors.email.message}</p>
          )}
        </div>

        <div className={'inputBox'}>
          <p>Password</p>
          <input
            type="password"
            {...register('password')}
            onBlur={() => handleBlur('password')}
          />
          {errors.password && (
            <p className="errorMessage">{errors.password.message}</p>
          )}
        </div>

        <div className={'inputBox'}>
          <p>Confirm password</p>
          <input
            type="password"
            {...register('confirmPassword')}
            onBlur={() => handleBlur('confirmPassword')}
          />
          {errors.confirmPassword && (
            <p className="errorMessage">{errors.confirmPassword.message}</p>
          )}
        </div>

        <div className={'selectGender'}>
          <div className={'selectGenderBox'}>
            <p>Men</p>
            <input
              type="radio"
              value="male"
              {...register('gender')}
              onBlur={() => handleBlur('gender')}
            />
          </div>
          <div className={'selectGenderBox'}>
            <p>Women</p>
            <input
              type="radio"
              value="female"
              {...register('gender')}
              onBlur={() => handleBlur('gender')}
            />
          </div>
        </div>
        {errors.gender && (
          <p className="errorMessage">{errors.gender.message}</p>
        )}

        <div className={'termsAndConditions'}>
          <div>
            <p>Terms and Conditions</p>
            <input
              type="checkbox"
              {...register('termsAndConditions')}
              onBlur={() => handleBlur('termsAndConditions')}
            />
          </div>
          {errors.termsAndConditions && (
            <p className="errorMessage">{errors.termsAndConditions.message}</p>
          )}
        </div>

        <div className={'uploadImage'}>
          <p>Upload image</p>
          <input
            type="file"
            {...register('image')}
            onBlur={() => handleBlur('image')}
          />
          {errors.image && (
            <p className="errorMessage">{errors.image.message}</p>
          )}
        </div>
        <div className={'inputBox'}>
          <p>Country</p>
          <select
            {...register('countries')}
            onBlur={() => handleBlur('countries')}
          >
            {countries.map((country: string) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {errors.countries && (
            <p className="errorMessage">{errors.countries.message}</p>
          )}
        </div>

        <button id="Submit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SecondForm;

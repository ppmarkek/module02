import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './style.css';

interface FormState {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: string;
  image: string;
}

interface RootState {
  formReducer: FormState;
}

const Main = () => {
  const formReducer = useSelector((state: RootState) => state.formReducer);
  const [newData, setNewData] = useState(false);

  useEffect(() => {
    if (formReducer.name !== '') {
      setNewData(true);
      const timer = setTimeout(() => setNewData(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [formReducer]);

  const dataBoxStyle = newData ? 'allData newData' : 'allData';

  return (
    <div className="wrapper">
      <button>
        <Link to={'/firstForm'}>Form</Link>
      </button>
      <button>
        <Link to={'/secondForm'}>React Hook Form</Link>
      </button>
      {formReducer.name !== '' && (
        <div className={dataBoxStyle}>
          <div className="dataBox">
            <p>Name:</p>
            <p>{formReducer.name}</p>
          </div>
          <div className="dataBox">
            <p>Age:</p>
            <p>{formReducer.age}</p>
          </div>
          <div className="dataBox">
            <p>Email:</p>
            <p>{formReducer.email}</p>
          </div>
          <div className="dataBox">
            <p>Password:</p>
            <p>{formReducer.password}</p>
          </div>
          <div className="dataBox">
            <p>Gender:</p>
            <p>{formReducer.gender}</p>
          </div>
          <div className="dataBox">
            <p>Image:</p>
            <img src={formReducer.image} alt="img" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;

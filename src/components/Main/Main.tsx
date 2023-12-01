import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './style.css';

const Main = () => {
  const formReducer = useSelector((state: object) => state.formReducer);

  return (
    <div className="wrapper">
      <button>
        <Link to={'/firstForm'}>Form</Link>
      </button>
      <button>
        <Link to={'/secondForm'}>React Hook Form</Link>
      </button>
      {formReducer.name !== '' && (
        <div className="allData">
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

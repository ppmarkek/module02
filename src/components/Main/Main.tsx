import { Link } from 'react-router-dom';
import './style.css';

const Main = () => {
  return (
    <div className="wrapper">
      <button>
        <Link to={'/firstForm'}>Formik</Link>
      </button>
      <button>
        <Link to={'/secondForm'}>React Hook Form</Link>
      </button>
    </div>
  );
};

export default Main;

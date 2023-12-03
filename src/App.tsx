import { Routes, Route } from 'react-router-dom';
import FirstForm from './components/FirstForm/FirstForm';
import SecondForm from './components/SecondForm/SecondForm';
import Main from './components/Main/Main';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/firstForm" element={<FirstForm />} />
        <Route path="/secondForm" element={<SecondForm />} />
      </Routes>
    </>
  );
}

export default App;

import { Routes, Route } from 'react-router-dom';
import FirstForm from './components/FirstForm/FirstForm';

function App() {
  return (
    <>
      <Routes>
        <Route path="/firstForm" element={<FirstForm />} />
      </Routes>
    </>
  );
}

export default App;

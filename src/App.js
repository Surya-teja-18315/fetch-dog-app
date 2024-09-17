import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DogSearchPage from './pages/DogSearchPage';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<DogSearchPage />} />
      </Routes>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AudioProvider } from './context/AudioContext';
import Home from './components/pages/Home';
import CharacterCreation from './components/pages/CharacterCreation';
import Options from './components/pages/Options';
import Auth from './components/pages/Auth';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

function App() {
  return (
    <AudioProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/auth" />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/home" element={<Home />} />
          <Route path="/character-creation" element={<CharacterCreation />} />
          <Route path="/options" element={<Options />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </AudioProvider>
  );
}

export default App;

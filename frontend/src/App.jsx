import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AudioProvider } from './context/AudioContext';
import Home from './components/pages/Home';
import CharacterCreation from './components/pages/CharacterCreation';
import Options from './components/pages/Options';
import Auth from './components/pages/Auth';
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
        </Routes>
      </Router>
    </AudioProvider>
  );
}

export default App;

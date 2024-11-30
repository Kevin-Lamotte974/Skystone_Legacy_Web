import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AudioProvider } from './context/AudioContext';
import Home from './components/pages/Home';
import Options from './components/pages/Options';
import CharacterCreation from './components/pages/CharacterCreation';
import './App.css';

function App() {
  return (
    <AudioProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/options" element={<Options />} />
          <Route path="/character-creation" element={<CharacterCreation />} />
        </Routes>
      </Router>
    </AudioProvider>
  );
}

export default App;

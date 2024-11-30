import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AudioProvider } from './context/AudioContext';
import Home from './components/pages/Home';
import Options from './components/pages/Options';
import './App.css';

function App() {
  return (
    <AudioProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/options" element={<Options />} />
        </Routes>
      </Router>
    </AudioProvider>
  );
}

export default App;

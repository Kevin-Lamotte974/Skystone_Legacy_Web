import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AudioProvider } from './context/AudioContext';
import Home from './components/pages/Home';
import Auth from './components/pages/Auth';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';
import CardList from './components/pages/CardList';

function App() {
  return (
    <AudioProvider>
      <Router>
      <nav className='absolute top-[50%] left-10 z-50'>
        <div className="w-full bg-slate-900/80 backdrop-blur-sm border-b border-amber-600/20 z-50 p-2 flex flex-col gap-4">
          <Link to={'/home'} >Home</Link>
          <Link to={'/cards'}>Cards</Link>
          <Link to={'/auth'}>Auth</Link>
        </div>
      </nav>
        <Routes>
          
          <Route path="/" element={<Navigate to="/auth" />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cards" element={<CardList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </AudioProvider>
  );
}

export default App;

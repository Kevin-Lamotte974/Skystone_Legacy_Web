import Game from '../components/Game';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const GamePage = () => {
  const router = useRouter();

  useEffect(() => {
    // Vérifier si l'utilisateur est authentifié
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth');
    }
  }, []);

  return <Game />;
};

export default GamePage;

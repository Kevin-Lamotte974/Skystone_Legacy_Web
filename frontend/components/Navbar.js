import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
const openDashboard = (token) => {
  window.open(`http://localhost:8000/api/auth/admin/?Authorization=Bearer ${token}`, '_blank');
};

const Navbar = () => {
  const router = useRouter();
  const [activeLink, setActiveLink] = useState(router.pathname);
  const [playerInfo, setPlayerInfo] = useState({ pseudo: '', level: 1, roles: [] });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const response = await fetch('https://slapi.kevinlamotte.fr/api/auth/profile/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Erreur d\'authentification');
        }

        const data = await response.json();
        setPlayerInfo({ 
          pseudo: data.pseudo || 'Joueur', 
          level: data.level || 1,
          roles: data.roles || []
        });
      } catch (err) {
        console.error('Erreur lors de la récupération du profil:', err);
        if (err.message === 'Erreur d\'authentification') {
          localStorage.removeItem('token');
          router.push('/auth');
        }
      }
    };

    fetchProfile();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/auth');
  };

  return (
    <>
      {/* HUD du joueur (toujours visible) */}
      <div className="fixed top-4 left-4 flex items-center space-x-3 bg-black/70 backdrop-blur-sm p-2 rounded-full hover:bg-black/80 transition-all duration-300 z-50 shadow-lg shadow-black/50">
        <div className="w-10 h-10 rounded-full bg-[#4a90e2] flex items-center justify-center text-white text-lg font-bold cursor-pointer shadow-md"
             onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {playerInfo.pseudo.charAt(0)}
        </div>
        <span className="text-white pr-2 text-lg">{playerInfo.pseudo}</span>
      </div>

      {/* Ressources du joueur */}
      <div className="fixed top-4 right-4 flex space-x-4 z-50">
        <div className="game-resource shadow-lg shadow-black/50">
          <span className="text-xl">💎</span>
          <span className="text-lg">1000</span>
        </div>
        <div className="game-resource shadow-lg shadow-black/50">
          <span className="text-xl">🪙</span>
          <span className="text-lg">5000</span>
        </div>
      </div>

      {/* Menu de navigation (apparaît au clic sur l'avatar) */}
      {isMenuOpen && (
        <div className="fixed top-20 left-4 bg-black/90 backdrop-blur-md rounded-lg p-3 w-52 transform transition-all duration-300 border border-[#4a90e2]/50 z-50 shadow-xl shadow-black/50">
          <div className="flex flex-col space-y-3">
            <Link href="/">
              <div className={`game-menu-item ${activeLink === '/' ? 'active' : ''}`}
                   onClick={() => setActiveLink('/')}>
                <span className="text-xl">🏰</span>
                <span className="text-lg">Accueil</span>
              </div>
            </Link>
            <Link href="/cards">
              <div className={`game-menu-item ${activeLink === '/cards' ? 'active' : ''}`}
                   onClick={() => setActiveLink('/cards')}>
                <span className="text-xl">🎴</span>
                <span className="text-lg">Collections</span>
              </div>
            </Link>
            {playerInfo.roles.some(role => role.name === 'admin' || role.name === 'admin_dev') && (
              <div 
                className={`game-menu-item ${activeLink === '/admin' ? 'active' : ''} cursor-pointer`}
                onClick={() => {
                  const token = localStorage.getItem('token');
                  if (!token) {
                    router.push('/auth');
                    return;
                  }
                  openDashboard(token);
                }}>
                <span className="text-xl">📊</span>
                <span className="text-lg">Tableau de bord</span>
              </div>
            )}
            <div className="h-px bg-[#4a90e2]/20"></div>
            <button 
              onClick={handleLogout}
              className="game-menu-item text-red-400 hover:text-red-300 hover:bg-red-900/20"
            >
              <span className="text-xl">🚪</span>
              <span className="text-lg">Déconnexion</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
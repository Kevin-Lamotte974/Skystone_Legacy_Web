import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/auth');
  };

  return (
    <nav className='fixed top-[50%] left-10 z-50'>
      <div className="w-full bg-slate-900/80 text-white backdrop-blur-sm border-b border-amber-600/20 z-50 p-2 flex flex-col gap-4">
        <Link href="/">Home</Link>
        <Link href="/cards">Cards</Link>
        <button 
          onClick={handleLogout}
          className="text-left text-red-500 hover:text-red-400"
        >
          Déconnexion
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
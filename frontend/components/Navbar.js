import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className='fixed top-[50%] left-10 z-50'>
      <div className="w-full bg-slate-900/80 text-white backdrop-blur-sm border-b border-amber-600/20 z-50 p-2 flex flex-col gap-4">
        <Link href="/">Home</Link>
        <Link href="/cards">Cards</Link>
        <Link href="/auth">Auth</Link>
      </div>
    </nav>
  );
};

export default Navbar;
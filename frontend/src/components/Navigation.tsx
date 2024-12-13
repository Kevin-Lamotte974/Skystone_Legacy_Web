'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-sm border-b border-amber-600/20 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="font-cinzel text-2xl font-bold text-amber-500">
            Skystone Legacy
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link
              href="/map"
              className={`${
                isActive('/map')
                  ? 'text-amber-500 border-b-2 border-amber-500'
                  : 'text-slate-300 hover:text-amber-500'
              } transition-colors duration-200`}
            >
              Carte du Monde
            </Link>
            <Link
              href="/inventory"
              className={`${
                isActive('/inventory')
                  ? 'text-amber-500 border-b-2 border-amber-500'
                  : 'text-slate-300 hover:text-amber-500'
              } transition-colors duration-200`}
            >
              Inventaire
            </Link>
            <Link
              href="/ship"
              className={`${
                isActive('/ship')
                  ? 'text-amber-500 border-b-2 border-amber-500'
                  : 'text-slate-300 hover:text-amber-500'
              } transition-colors duration-200`}
            >
              Vaisseau
            </Link>
          </div>

          {/* Profile/Login Button */}
          <button className="px-4 py-2 text-sm bg-amber-600 hover:bg-amber-500 text-white rounded-lg transition-colors duration-200">
            Connexion
          </button>
        </div>
      </div>
    </nav>
  );
}

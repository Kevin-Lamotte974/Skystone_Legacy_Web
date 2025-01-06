import React, { useEffect } from 'react';
import Navbar from './Navbar';
import { useRouter } from 'next/router';

const Layout = ({ children }) => {
  const router = useRouter();
  const isAuthPage = router.pathname === '/auth';

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    const token = localStorage.getItem('token');
    if (!token && !isAuthPage) {
      router.push('/auth');
    }
  }, [router.pathname]);

  return (
    <div>
      {!isAuthPage && <Navbar />}
      <main>{children}</main>
    </div>
  );
};

export default Layout;
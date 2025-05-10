import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRole: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRole }) => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/auth/check-auth', {
          credentials: 'include',
        });

        if (!res.ok) throw new Error();

        const data = await res.json();
        if (data.user.role === allowedRole) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setIsAuth(false);
      }
    };

    checkAuth();
  }, [allowedRole]);

  if (isAuth === null) return <div>Chargement...</div>;

  return isAuth ? <>{children}</> : <Navigate to="/" />;
};

export default ProtectedRoute;

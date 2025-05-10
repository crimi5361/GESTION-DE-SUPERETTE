import { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';

const Header = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user?.nom) setUsername(user.nom);
  }, []);

  return (
  <header className="fixed top-0 left-0 right-0 w-full flex items-center justify-between px-6 py-4 bg-white shadow-md text-gray-800 z-50">
      <div className="flex items-center space-x-2">
        <span className="text-2xl font-extrabold tracking-wider text-blue-800">
          GESTMARKET
        </span>
      </div>

      <div className="flex flex-col items-center text-sm text-blue-700">
        <FaUserCircle className="text-3xl mb-1" />
        <span className="text-sm font-medium">
          {username ? username : 'Non identifié'}
        </span>
      </div>
    </header>
  );
};

export default Header;

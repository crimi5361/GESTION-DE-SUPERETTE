import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

const LoginAdmin = () => {
  const [nom, setNom] = useState('');
  const [motDePass, setMotDePass] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

try {
    const response = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        nom,
        password: motDePass,
        role: 'admin',
      }),
    });

    const data = await response.json();
    if (response.ok) {
      // ✅ Stocker les données utilisateur dans localStorage
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }
    setMessage('Connection reussie');
    navigate('/admin');
    }else{
      setMessage(data.message || 'Erreur de connection');
    }
    } catch (error) {
      console.error('Erreur lors de la connexion;', error);
      setMessage('erreur server')
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f6f7] p-4">
      <div className="bg-white rounded-xl shadow-lg flex max-w-4xl w-full overflow-hidden">
        <div className="w-1/2 bg-[#52BE80] flex items-center justify-center p-6">
          <img src="/homme1.png" alt="Admin Illustration" className="w-40 h-40 object-contain" />
        </div>
        <div className="w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">Connexion Administrateur</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-600">Nom</label>
              <input
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600">Mot de passe</label>
              <input
                type="password"
                value={motDePass}
                onChange={(e) => setMotDePass(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <button type="submit" className="w-full bg-[#52BE80] text-white py-2 rounded-lg hover:bg-green-600 transition">
              Se connecter
            </button>
          </form>
          {message && <p className="mt-4 text-center text-red-500">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;

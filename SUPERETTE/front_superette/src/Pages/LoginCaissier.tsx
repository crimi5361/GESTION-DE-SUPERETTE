import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginCaissier: React.FC = () => {
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
          role: 'caissier',
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // ✅ Stocker les données utilisateur dans localStorage
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
        }
  
        setMessage('Connexion réussie');
        navigate('/caissier');
      } else {
        setMessage(data.message || 'Erreur de connexion');
      }
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
      setMessage('Erreur serveur');
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f6f7] p-4">
      <div className="bg-white rounded-2xl shadow-xl flex max-w-4xl w-full overflow-hidden">
        <div className="w-1/2 bg-[#BB8FCE] flex items-center justify-center p-6">
          <img src="/caisse.png" alt="Illustration Caissier" className="w-30 h-30 object-contain" />
        </div>
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Connexion Caissier</h2>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Nom</label>
              <input
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BB8FCE]"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Mot de passe</label>
              <input
                type="password"
                value={motDePass}
                onChange={(e) => setMotDePass(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BB8FCE]"
                required
              />
            </div>
            <button type="submit" className="w-full bg-[#BB8FCE] text-white font-semibold py-2 rounded-lg hover:bg-[#a86fbe] transition">
              Se connecter
            </button>
          </form>
          {message && <p className="mt-4 text-center text-red-500">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default LoginCaissier;

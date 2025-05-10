import React, { useEffect, useState } from 'react';

const DashboardStats = () => {
  const [stats, setStats] = useState({
    stockTotal: 0,
    ventesOuvertes: 0,
    montantAchat: 0,
    montantVente: 0,
  });

  useEffect(() => {
    fetch('http://localhost:3001/api/dashboard/dashboard-stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error('Erreur API stats:', err));
  }, []);

  return (
    <div className="p-2">
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_2.5fr_1.5fr] gap-4">

        {/* Stock Total */}
        <div className="bg-blue-500 text-white p-6 rounded-xl shadow flex flex-col justify-center items-center">
          <h3 className="text-lg font-medium">Stock total produits</h3>
          <p className="text-4xl font-bold mt-2">{stats.stockTotal}</p>
        </div>

        {/* Graphique */}
        <div className="bg-white border border-gray-200 rounded-xl shadow p-4 flex items-center justify-center">
          <span className="text-gray-600 text-center">
            [ Graphique de la croissance des ventes ]
          </span>
        </div>

        {/* Mini Cards à droite */}
        <div className="flex flex-col justify-between gap-4">
          <div className="bg-[#52be80] text-white p-4 rounded-lg shadow">
            <h4 className="text-sm font-medium">Ventes total ouvertes</h4>
            <p className="text-2xl font-bold">{stats.ventesOuvertes.toLocaleString()} OXF</p>
          </div>
          <div className="bg-[#5499c7] text-white p-4 rounded-lg shadow">
            <h4 className="text-sm font-medium">Montant achat effectué</h4>
            <p className="text-2xl font-bold">{stats.montantAchat.toLocaleString()} OXF</p>
          </div>
          <div className="bg-[#cd6155] text-white p-4 rounded-lg shadow">
            <h4 className="text-sm font-medium">Montant vente attendu</h4>
            <p className="text-2xl font-bold">{stats.montantVente.toLocaleString()} OXF</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardStats;

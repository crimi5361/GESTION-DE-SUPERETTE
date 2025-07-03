import { useEffect, useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { TrendingUp, ShoppingCart, CreditCard, DollarSign } from 'lucide-react';

const DashboardStats = () => {
  const [stats, setStats] = useState({
    stockTotal: 0,
    ventesOuvertes: 0,
    montantAchat: 0,
    montantVente: 0,
  });

  const [chartData] = useState([
    { name: 'Jan', ventes: 1200 },
    { name: 'Fév', ventes: 2100 },
    { name: 'Mar', ventes: 3000 },
    { name: 'Avr', ventes: 1600 },
    { name: 'Mai', ventes: 2000 },
  ]);

  useEffect(() => {
    fetch('http://localhost:3001/api/dashboard/dashboard-stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error('Erreur API stats:', err));

    // Optionnel : fetch de données dynamiques pour le graphique ici
  }, []);

  return (
    <div className="p-4 bg-[#f9fafb]">
      <div className="grid grid-cols-1 lg:grid-cols-[1.7fr_2fr_1.2fr] gap-4">

        {/* Stock Total */}
        <div className="bg-[#d6eaf8] text-[#2e86c1] p-4 rounded-xl shadow flex flex-col justify-center items-center h-[150px]">
          <ShoppingCart className="w-6 h-6 mb-1" />
          <h3 className="text-sm font-medium">Stock total produits</h3>
          <p className="text-3xl font-bold mt-1">{stats.stockTotal}</p>
        </div>

        {/* Graphique */}
        <div className="bg-white border border-gray-200 rounded-xl shadow p-4 h-[150px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="ventes" stroke="#2980b9" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Cartes à droite */}
        <div className="flex flex-col justify-between gap-3">
          <div className="bg-[#d5f5e3] text-[#27ae60] p-3 rounded-md shadow">
            <DollarSign className="w-4 h-4 mb-1" />
            <h4 className="text-xs font-medium">Ventes ouvertes</h4>
            <p className="text-xl font-bold">{stats.ventesOuvertes.toLocaleString()} OXF</p>
          </div>

          <div className="bg-[#d6eaf8] text-[#2980b9] p-3 rounded-md shadow">
            <CreditCard className="w-4 h-4 mb-1" />
            <h4 className="text-xs font-medium">Montant achat</h4>
            <p className="text-xl font-bold">{stats.montantAchat.toLocaleString()} OXF</p>
          </div>

          <div className="bg-[#f5b7b1] text-[#c0392b] p-3 rounded-md shadow">
            <TrendingUp className="w-4 h-4 mb-1" />
            <h4 className="text-xs font-medium">Montant vente</h4>
            <p className="text-xl font-bold">{stats.montantVente.toLocaleString()} OXF</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;

import React, { useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { Search, Trash2 } from 'lucide-react';

interface Produit {
  nom: string;
  prix: number;
  quantite: number;
  stock: number;
}

const columns: TableColumn<Produit>[] = [
  {
    name: 'Nom',
    selector: (row) => row.nom,
    sortable: true,
  },
  {
    name: 'Prix U',
    selector: (row) => row.prix,
    sortable: true,
    format: (row) => `${row.prix.toLocaleString()} FCFA`,
  },
  {
    name: 'Quantité',
    selector: (row) => row.quantite,
    sortable: true,
  },
  {
    name: 'Stock',
    selector: (row) => row.stock,
    sortable: true,
  },
  {
    name: 'Action',
    cell: (row) => (
      <button
        onClick={() => alert(`Suppression du produit : ${row.nom}`)}
        className="text-[#cd6155] flex items-center gap-1 border border-[#cd6155] px-2 py-1 rounded hover:bg-[#cd6155] hover:text-white transition-all"
      >
        <Trash2 size={16} /> 
      </button>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];

const data: Produit[] = [
 
];

const customStyles = {
  headRow: {
    style: {
      backgroundColor: '#808b96',
      color: 'white',
      fontSize: '14px',
    },
  },
  rows: {
    style: {
      backgroundColor: 'white',
      color: '#333',
      fontSize: '14px',
    },
  },
  pagination: {
    style: {
      borderTop: 'none',
    },
  },
};

const VenteSection: React.FC = () => {
  const [search, setSearch] = useState('');

  const filteredData = data.filter((item) =>
    item.nom.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 rounded-lg bg-white shadow-md max-w-9xl mx-auto min-h-[400px] flex flex-col">
      <div className="relative mb-6 w-full max-w-md mx-auto">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Recherche produit clé via nom"
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#5dade2]"
        />
        <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
      </div>

      <div className="flex-grow overflow-auto rounded-lg">
        <DataTable
          columns={columns}
          data={filteredData}
          noDataComponent="Aucune vente en cours pour l’instant."
          customStyles={customStyles}
          highlightOnHover
          pagination
          responsive
        />
      </div>
    </div>
  );
};

export default VenteSection;

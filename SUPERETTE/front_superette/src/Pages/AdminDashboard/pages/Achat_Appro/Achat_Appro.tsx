import { useEffect, useState } from 'react';
import { Bell,  Edit, Trash2 } from 'lucide-react';
import DataTable, { TableColumn } from 'react-data-table-component';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import AddProduit from './AddProduit';
import { Button } from 'antd';
import { HolderOutlined, PlusOutlined } from '@ant-design/icons';

// Définition stricte du type de données produit
type Produit = {
  id: number;
  nom: string;
  code_barre: string;
  code_personnalise: string;
  prix_vente: number;
  prix_achat: number;
  stock: number;
  seuil_alerte: number;
  categorie: string;
  date_ajout: string;
};

// Colonnes avec typage strict
const columns: TableColumn<Produit>[] = [
  { name: 'ID', selector: row => row.id, sortable: true },
  { name: 'Nom', selector: row => row.nom, sortable: true },
  { name: 'Code Barre', selector: row => row.code_barre },
  { name: 'Code Perso', selector: row => row.code_personnalise },
  { name: 'Prix Vente', selector: row => row.prix_vente },
  { name: 'Prix Achat', selector: row => row.prix_achat },
  { name: 'Stock', selector: row => row.stock },
  { name: 'Seuil Alerte', selector: row => row.seuil_alerte },
  { name: 'Catégorie', selector: row => row.categorie },
  { name: 'Date Ajout', selector: row => row.date_ajout },
  {
    name: 'Actions',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    cell: (_row) => (
      <div className="flex gap-2">
        <button className="text-blue-600 hover:text-blue-800">
          <Edit size={18} />
        </button>
        <button className="text-red-600 hover:text-red-800">
          <Trash2 size={18} />
        </button>
      </div>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];

// Styles personnalisés pour le tableau
const customStyles = {
  headCells: {
    style: {
      backgroundColor: '#e5e7eb',
      fontWeight: 'bold',
      color: '#374151',
    },
  },
};

const GestionProduits = () => {
  const [produits, setProduits] = useState<Produit[]>([]);
  const [totalStock, setTotalStock] = useState<number>(0);
  const [showHistorique, setShowHistorique] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  //  Récupérer les produits
  const fetchProduits = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/StockProduit/produits'); // à adapter à ton API
      const data = await response.json();
      setProduits(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des produits:", error);
    }
  };

  // Calcul du stock total
  const fetchStockTotal = () => {
    const total = produits.reduce((sum, produit) => sum + produit.stock, 0);
    setTotalStock(total);
  };

  //  Exemple récupération notifications/historique (à adapter)
  const fetchNotifications = async () => {
    console.log("🔔 Notifications récupérées");
  };
  const fetchHistorique = async () => {
    console.log("🕒 Historique récupéré");
  };

  useEffect(() => {
    fetchProduits();
  }, []);

  useEffect(() => {
    fetchStockTotal();
  }, [produits]);

  const handleOpenAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);

  return (
    <div className="p-6 relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Gestion des Produits</h1>
        <div className="flex gap-4 items-center">
          <Button
            icon={< PlusOutlined/>}
            onClick={handleOpenAddModal}
            className="text-white bg-black p-2 rounded-full hover:bg-gray-800"
          >
            Ajouter Produit
          </Button>
          <Button
          icon={<HolderOutlined/>}
            onClick={() => {
              setShowHistorique(true);
              fetchHistorique();
            }}
            className="text-white bg-gray-600 p-2 rounded-full hover:bg-gray-700"
          >
           Historique
          </Button>
          <button
            onClick={() => {
              setShowNotifications(true);
              fetchNotifications();
            }}
            className="text-black hover:text-orange-500"
          >
            <Bell className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="mb-4 px-6 py-3 bg-gray-100 rounded-md text-gray-800 font-medium shadow w-fit">
        Qte du stock : <span className="font-bold text-lg text-blue-600">{totalStock}</span>
      </div>

      <div className="rounded-md overflow-hidden shadow bg-white">
        <DataTable
          columns={columns}
          data={produits}
          pagination
          responsive
          highlightOnHover
          noDataComponent={
            <div className="p-4 text-gray-500 text-center">
              Aucun produit affiché pour le moment.
            </div>
          }
          customStyles={customStyles}
        />
      </div>

      {/* Modal ajout */}
      <Modal
        open={showAddModal}
        onClose={handleCloseAddModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: 900,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            maxHeight: '90vh',
            overflowY: 'auto',
          }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Ajouter un Produit</h2>
            <IconButton onClick={handleCloseAddModal}>
              <CloseIcon />
            </IconButton>
          </div>
          <AddProduit
            onClose={handleCloseAddModal}
            onSuccess={() => {
              fetchProduits();
            }}
          />
        </Box>
      </Modal>

      {/* Historique */}
      <Drawer anchor="right" open={showHistorique} onClose={() => setShowHistorique(false)}>
        <div style={{ width: 1000, padding: '1rem' }}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Historique</h2>
            <IconButton onClick={() => setShowHistorique(false)}>
              <CloseIcon />
            </IconButton>
          </div>
          <p className="text-gray-500">Aucun historique pour le moment.</p>
        </div>
      </Drawer>

      {/* Notifications */}
      <Drawer anchor="right" open={showNotifications} onClose={() => setShowNotifications(false)}>
        <div style={{ width: 400, padding: '1rem' }}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Notifications</h2>
            <IconButton onClick={() => setShowNotifications(false)}>
              <CloseIcon />
            </IconButton>
          </div>
          <p className="text-gray-500">Aucune alerte pour le moment.</p>
        </div>
      </Drawer>
    </div>
  );
};

export default GestionProduits;

import { useEffect, useState } from 'react';
import { Bell, Edit, Trash2 } from 'lucide-react';
import { DataGrid, GridColDef, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import AddProduit from './AddProduit';
import { Button } from 'antd';
import { HolderOutlined, PlusOutlined } from '@ant-design/icons';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';


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


const GestionProduits = () => {
  const [produits, setProduits] = useState<Produit[]>([]);
  const [totalStock, setTotalStock] = useState<number>(0);
  const [showHistorique, setShowHistorique] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fetchProduits = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/api/StockProduit/produits');
      if (!response.ok) throw new Error('Erreur réseau');
      const data: Produit[] = await response.json();
      setProduits(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3001/api/StockProduit/produits/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Échec de la suppression');
      setProduits(prev => prev.filter(p => p.id !== id));
      setSuccessMessage('Produit supprimé avec succès');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la suppression');
    }
  };

  const handleEdit = (id: number) => {
    setSuccessMessage(`Édition du produit ID: ${id}`);
    // Ici vous pouvez implémenter la logique d'édition
  };

  useEffect(() => {
    fetchProduits();
  }, []);

  useEffect(() => {
    setTotalStock(produits.reduce((sum, p) => sum + p.stock, 0));
  }, [produits]);

  const columns: GridColDef<Produit>[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'nom', headerName: 'Nom', width: 180 },
    { field: 'code_barre', headerName: 'Code Barre', width: 150 },
    { field: 'code_personnalise', headerName: 'Code Perso', width: 190 },
    { 
      field: 'prix_vente',
      headerName: 'Prix Vente',
      width: 170,
     
    },
    { 
      field: 'prix_achat',
      headerName: 'Prix Achat',
      width: 170,

    },
    
    { 
      field: 'stock', 
      headerName: 'Stock', 
      width: 160,
      cellClassName: (params) => 
        params.value <= params.row.seuil_alerte ? 'bg-red-100' : ''
    },
    { field: 'seuil_alerte', headerName: 'Seuil Alerte', width: 160 },
    { field: 'categorie', headerName: 'Catégorie', width: 200 },
    { 
      field: 'date_ajout', 
      headerName: 'Date Ajout', 
      width: 150,

      
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      type: 'actions',
      getActions: (params) => [
        <GridActionsCellItem
          key="edit"
          icon={<Edit size={18} />}
          label="Modifier"
          onClick={() => handleEdit(params.row.id)}
        />,
        <GridActionsCellItem
          key="delete"
          icon={<Trash2 size={18} />}
          label="Supprimer"
          onClick={() => handleDelete(params.row.id)}
        />
      ]
    }
  ];

  const handleCloseAlert = () => {
    setError(null);
    setSuccessMessage(null);
  };

  return (
    <div className="p-6 relative">
      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
      <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert severity="success">{successMessage}</Alert>
      </Snackbar>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Gestion des Produits</h1>
        <div className="flex gap-4 items-center">
          <Button
            icon={<PlusOutlined />}
            onClick={() => setShowAddModal(true)}
            className="bg-black text-white"
          >
            Ajouter Produit
          </Button>
          <Button
            icon={<HolderOutlined />}
            onClick={() => setShowHistorique(true)}
            className="bg-gray-600 text-white"
          >
            Historique
          </Button>
          <button onClick={() => setShowNotifications(true)}>
            <Bell className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="mb-4 p-3 bg-gray-100 rounded-md w-fit">
        Stock total: <span className="font-bold">{totalStock}</span>
      </div>

      <div style={{ height: 650, width: '100%' }} className="bg-white rounded-md shadow">
        <DataGrid
          rows={produits}
          columns={columns}
          loading={loading}
          pageSizeOptions={[5, 10, 25]}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              printOptions: { disableToolbarButton: true },
              csvOptions: { disableToolbarButton: true }
            }
          }}
          localeText={{
            toolbarQuickFilterPlaceholder: 'Rechercher...',
            noRowsLabel: 'Aucun produit trouvé'
          }}
        />
      </div>

      <Modal open={showAddModal} onClose={() => setShowAddModal(false)}>
        <Box sx={{ 
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: 900,
          bgcolor: 'background.paper',
          p: 4,
          borderRadius: 2
        }}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Ajouter un Produit</h2>
            <IconButton onClick={() => setShowAddModal(false)}>
              <CloseIcon />
            </IconButton>
          </div>
          <AddProduit 
            onClose={() => setShowAddModal(false)}
            onSuccess={() => {
              fetchProduits();
              setSuccessMessage('Produit ajouté avec succès');
            }}
          />
        </Box>
      </Modal>

      <Drawer 
        anchor="right" 
        open={showHistorique} 
        onClose={() => setShowHistorique(false)}
      >
        <div className="p-4 w-full sm:w-[600px]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Historique</h2>
            <IconButton onClick={() => setShowHistorique(false)}>
              <CloseIcon />
            </IconButton>
          </div>
          <p className="text-gray-500">Aucun historique</p>
        </div>
      </Drawer>

      <Drawer
        anchor="right"
        open={showNotifications}
        onClose={() => setShowNotifications(false)}
      >
        <div className="p-4 w-full sm:w-[400px]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Alertes</h2>
            <IconButton onClick={() => setShowNotifications(false)}>
              <CloseIcon />
            </IconButton>
          </div>
          {produits.filter(p => p.stock <= p.seuil_alerte).map(p => (
            <Alert key={p.id} severity="warning" className="mb-2">
              Stock faible: {p.nom} ({p.stock})
            </Alert>
          ))}
        </div>
      </Drawer>
    </div>
  );
};

export default GestionProduits;
const express = require('express');
const route = express.Router();
const stockController = require('../Controllers/StockProduit.Controller');

route.get('/produits', stockController.getProduits);
route.get('/produits/total', stockController.getTotalProduit);
route.get('/produits/notifications', stockController.getNotification);
route.get('/produits/historique', stockController.getHistorique);
route.post('/produits/Ajouter_produit', stockController.addProduit);
route.put('/produits/:id', stockController.updateProduit);
route.delete('/produits/:id', stockController.deleteProduit);
route.get('/produits/searchProduit', stockController.searchProduits);
route.get('/categories', stockController.getCategories);



module.exports = route;

const sql = require('mssql');
const dbConfig = require('../dbConfig');
// const { v4: uuidv4 } = require('uuid');

// Récupérer tous les produits
exports.getProduits = async (req, res) => {
  try {
    await sql.connect(dbConfig);
    const result = await sql.query('SELECT * FROM Produits ORDER BY date_ajout DESC');
    res.status(200).json(result.recordset);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des produits', error: err.message });
  }
};

// Récupérer le total des produits en stock
exports.getTotalProduit = async (req, res) => {
  try {
    await sql.connect(dbConfig);
    const result = await sql.query('SELECT SUM(stock) AS total_stock FROM Produits');
    res.status(200).json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors du calcul du stock total', error: err.message });
  }
};

// Récupérer les notifications (produits sous le seuil)
exports.getNotification = async (req, res) => {
  try {
    await sql.connect(dbConfig);
    const result = await sql.query('SELECT * FROM Produits WHERE stock <= seuil_alerte');
    res.status(200).json(result.recordset);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des notifications', error: err.message });
  }
};

// Historique des produits (à adapter si tu as une table Historique)
exports.getHistorique = async (req, res) => {
  try {
    await sql.connect(dbConfig);
    const result = await sql.query('SELECT TOP 50 * FROM Produits ORDER BY date_ajout DESC');
    res.status(200).json(result.recordset);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération de l’historique', error: err.message });
  }
};



// Ajouter un produit
exports.addProduit = async (req, res) => {
  const {
    nom,
    code_barre,
    prix_vente,
    prix_achat,
    stock,
    seuil_alerte,
    nom_categorie,
    date_ajout
  } = req.body;

  try {
    const pool = await sql.connect(dbConfig);

    // Générer un code_personnalise unique
    let code_personnalise;
    let exists = true;

    while (exists) {
      code_personnalise = String(Math.floor(Math.random() * 100000)).padStart(5, '0');

      const check = await pool.request()
        .input('code', sql.NVarChar, code_personnalise)
        .query('SELECT COUNT(*) as count FROM Produits WHERE code_personnalise = @code');

      if (check.recordset[0].count === 0) {
        exists = false;
      }
    }

    await pool.request()
      .input('nom', sql.NVarChar, nom)
      .input('code_barre', sql.NVarChar, code_barre)
      .input('code_personnalise', sql.NVarChar, code_personnalise)
      .input('prix_vente', sql.Float, prix_vente)
      .input('prix_achat', sql.Float, prix_achat)
      .input('stock', sql.Int, stock)
      .input('seuil_alerte', sql.Int, seuil_alerte)
      .input('categorie', sql.NVarChar, nom_categorie)
      .input('date_ajout', sql.DateTime, date_ajout)
      .query(`
        INSERT INTO Produits 
        (nom, code_barre, code_personnalise, prix_vente, prix_achat, stock, seuil_alerte, categorie, date_ajout)
        VALUES 
        (@nom, @code_barre, @code_personnalise, @prix_vente, @prix_achat, @stock, @seuil_alerte, @categorie, @date_ajout)
      `);

    res.status(201).json({ message: 'Produit ajouté avec succès.', code_personnalise });
  } catch (err) {
    console.error('Erreur insertion produit :', err);
    res.status(500).json({ error: 'Erreur lors de l\'ajout du produit', details: err });
  }
};

  // Modifier un produit
exports.updateProduit = async (req, res) => {
    const {
      nom,
      code_barre,
      code_personnalise,
      prix_vente,
      prix_achat,
      stock,
      seuil_alerte,
      categorie,
      date_ajout
    } = req.body;
  
    const { id } = req.params;
  
    try {
      const pool = await sql.connect(dbConfig);
      await pool.request()
        .input('id', sql.Int, id)
        .input('nom', sql.NVarChar, nom)
        .input('code_barre', sql.NVarChar, code_barre)
        .input('code_personnalise', sql.NVarChar, code_personnalise)
        .input('prix_vente', sql.Float, prix_vente)
        .input('prix_achat', sql.Float, prix_achat)
        .input('stock', sql.Int, stock)
        .input('seuil_alerte', sql.Int, seuil_alerte)
        .input('categorie', sql.NVarChar, categorie)
        .input('date_ajout', sql.DateTime, date_ajout)
        .query(`
          UPDATE Produits
          SET nom = @nom, code_barre = @code_barre, code_personnalise = @code_personnalise,
              prix_vente = @prix_vente, prix_achat = @prix_achat,
              stock = @stock, seuil_alerte = @seuil_alerte,
              categorie = @categorie, date_ajout = @date_ajout
          WHERE id = @id
        `);
  
      res.status(200).json({ message: 'Produit mis à jour avec succès.' });
    } catch (err) {
      res.status(500).json({ error: 'Erreur lors de la mise à jour', details: err });
    }
  };
  
  
  //supprimer produit

  exports.deleteProduit = async (req, res) => {
    const { id } = req.params;
  
    try {
      const pool = await sql.connect(dbConfig);
      await pool.request()
        .input('id', sql.Int, id)
        .query(`DELETE FROM Produits WHERE id = @id`);
  
      res.status(200).json({ message: 'Produit supprimé avec succès.' });
    } catch (err) {
      res.status(500).json({ error: 'Erreur lors de la suppression', details: err });
    }
  };
  

  // Rechercher un produit par le nom 

  exports.searchProduits = async (req, res) => {
    const { keyword } = req.query;
  
    try {
      const pool = await sql.connect(dbConfig);
      const result = await pool.request()
        .input('keyword', sql.NVarChar, `%${keyword}%`)
        .query(`
          SELECT * FROM Produits
          WHERE nom LIKE @keyword OR code_barre LIKE @keyword OR code_personnalise LIKE @keyword
        `);
  
      res.status(200).json(result.recordset);
    } catch (err) {
      res.status(500).json({ error: 'Erreur lors de la recherche', details: err });
    }
  };


  // Récupérer les catégories depuis la table Categorie
  exports.getCategories = async (req, res) => {
    try {
      const pool = await sql.connect(dbConfig);
      const result = await pool.request().query('SELECT id_categorie, nom_categorie FROM categorie');
      res.status(200).json(result.recordset);
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la récupération des catégories", error });
    }
  };
  

  
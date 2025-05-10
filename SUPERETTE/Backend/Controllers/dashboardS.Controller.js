const sql = require('mssql');
const dbConfig = require('../dbConfig');

exports.gestDashboardStats = async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.query(`
      SELECT 
        (SELECT SUM(stock) FROM Produits) AS stockTotal,
        (SELECT SUM(prix_achat * stock) FROM Produits) AS montantAchat,
        (SELECT SUM(quantite) FROM Vente_Details) AS ventesOuvertes,
        (SELECT SUM(total) FROM Ventes) AS montantVente
    `);

    const stats = result.recordset[0];

    res.json({
      stockTotal: stats.stockTotal || 0,
      montantAchat: stats.montantAchat || 0,
      ventesOuvertes: stats.ventesOuvertes || 0,
      montantVente: stats.montantVente || 0
    });
  } catch (error) {
    console.error('Erreur récupération stats dashboard:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

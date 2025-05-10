const dbConfig = require('../dbConfig');
const sql = require('mssql');

exports.login = async (req, res) => {
    const { nom, password, role } = req.body;

    // // 👉 LOG des informations reçues du frontend
    // console.log('Tentative de connexion :');
    // console.log('Nom:', nom);
    // console.log('Mot de passe:', password); 
    // console.log('Role:', role);

    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool
            .request()
            .input('nom', sql.VarChar, nom)
            .input('role', sql.VarChar, role)
            .query(`SELECT * FROM Utilisateurs WHERE nom = @nom AND role = @role`);

        if (result.recordset.length === 0) {
            console.log('Utilisateur non trouvé avec ce nom et ce rôle.');
            return res.status(401).json({ message: 'Utilisateur non trouvé' });
        }

        const user = result.recordset[0];

        if (user.password !== password) {
            console.log('Mot de passe incorrect.');
            return res.status(401).json({ message: 'Mot de passe incorrect' });
        }

        // Stocker la session
        req.session.user = {
            id: user.id,
            nom: user.nom,
            role: user.role
        };

        console.log('Connexion réussie pour:', user.nom, '-', user.role);
        return res.json({ message: 'Connexion réussie', user: req.session.user });
    } catch (error) {
        console.error('Erreur login :', error);
        return res.status(500).json({ message: 'Erreur serveur' });
    }
};

exports.checkAuth = async (req, res) => {
    if (req.session.user) {
        return res.json({ user: req.session.user });
    }
    res.status(401).json({ message: 'Non authentifié' });
};

exports.logout = async (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).json({ message: 'Erreur déconnexion' });
        res.clearCookie('connect.sid');
        res.json({ message: 'Déconnecté' });
    });
};

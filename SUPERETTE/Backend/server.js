require('dotenv').config();
const express = require('express');
const session = require('express-session'); 
const cors = require('cors');
const { connectDB } = require('./dbConfig');
const authRoutes = require('./Routes/auth.routes');
const dashStat = require('./Routes/dashboard.routes');
const Stock_Produits = require ('./Routes/StockProduit.routes')

const app = express();
const PORT = process.env.PORT || 3001;

// ✅ Connexion à la base de données
connectDB();

// ✅ Middleware pour accepter les JSON
app.use(express.json());

// ✅ CORS (autorise le frontend à faire des requêtes vers le backend)
const corsOptions = {
  origin: 'http://localhost:5173', 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

// ✅ Middleware pour les sessions
app.use(session({
  secret: 'superette_secret_key', 
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false, 
    maxAge: 1000 * 60 * 60 * 24 // 1 jour
  }
}));

//=======================================================================================================//
                                            // ✅ Routes d'authentification
//=======================================================================================================//

app.use('/api/auth', authRoutes);
app.use('/api/dashboard',dashStat )
app.use('/api/StockProduit', Stock_Produits )





//=======================================================================================================//
//=======================================================================================================//

// ✅ Route test de base
app.get('/', (req, res) => {
  res.send('Bienvenue sur l’API SUPERETTE !');
});

// ✅ Démarrage du serveur
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});

const sql = require('mssql/msnodesqlv8');
require('dotenv').config(); 



const dbConfig = {
    user: process.env.BD_USER,
    password: process.env.BD_PWD,
    server: process.env.BD_SERVER,
    database: process.env.BD_NAME,
    options: {
        encrypt: true,
        trustServerCertificate: true,
        enableArithAbort: true
    }
};


// const dbConfig = {
//     server: process.env.BD_SERVER,
//     database: process.env.BD_NAME,
//     driver: "msnodesqlv8",
//     options: {
//         trustedConnection: true,
//         trustServerCertificate: true,
//         enableArithAbort: true
//     }
// };

//
/**
 *    a utiliser si je veux utiliser un user et un password
 * @returns const sql = require("mssql");
require("dotenv").config();

const dbConfig = {
    user: process.env.BD_USER,
    password: process.env.BD_PWD,
    server: process.env.BD_SERVER,
    database: process.env.BD_NAME,
    options: {
        encrypt: true,
        trustServerCertificate: true,
        enableArithAbort: true
    }
};

 */

// Fonction pour se connecter à la base
async function connectDB() {
    try {
        const pool = await sql.connect(dbConfig);
        console.log("✅ Connexion réussie à la base de données !");
        return pool;
    } catch (error) {
        console.error("❌ Erreur lors de la connexion à la base de données :", error);
        throw error;
    }
}

module.exports = { connectDB, sql };

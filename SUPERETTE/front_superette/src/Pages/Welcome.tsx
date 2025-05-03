import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className=" rounded-2xl  p-8   flex flex-col md:flex-row">
        {/* Section Admin */}
        <div className="flex-1 bg-[#52BE80] text-white rounded-xl m-2 p-6 flex flex-col items-center justify-center">
          <img
            src="/homme1.png"
            alt="Admin"
            className="w-28 h-28 mb-4"
          />
          <h2 className="text-2xl font-bold mb-2">Espace Administrateur</h2>
          <p className="text-center text-sm mb-4">
            Gérer les utilisateurs, consulter les statistiques, et plus encore.
          </p>
          <Link to="/login-admin">
            <button className="bg-white text-[#52BE80] px-4 py-2 rounded-full font-semibold shadow hover:bg-gray-100 transition">
              Accès Admin
            </button>
          </Link>
        </div>

        {/* Section Caissier */}
        <div className="flex-1 bg-[#BB8FCE] text-white rounded-xl m-2 p-6 flex flex-col items-center justify-center">
          <img
            src="/caisse.png"
            alt="Caissier"
            className="w-28 h-28 mb-4"
          />
          <h2 className="text-2xl font-bold mb-2">Espace Caissier</h2>
          <p className="text-center text-sm mb-4">
            Accéder aux opérations de caisse de manière rapide et sécurisée.
          </p>
          <Link to="/login-caissier">
            <button className="bg-white text-[#BB8FCE] px-4 py-2 rounded-full font-semibold shadow hover:bg-gray-100 transition">
              Accès Caissier
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;

import {Route, Routes} from "react-router-dom";  
import Achat_Appro from "../../pages/Achat_Appro/Achat_Appro";
import Rapports from "../../pages/Rapports/Rapports";
import Utilisateurs from "../../pages/Utilisateurs/utilisateurs";
import Gestion_produits from "../../pages/Gestion_produits/Gestion_produits";
import Appro from "../../pages/Appro/Appro";


const AppRoutes= () => {

    return (
        <Routes>
            <Route index element={<Gestion_produits/>}/>
            <Route path="Achat_appro" element={<Achat_Appro/>}/>
            <Route path="Approvisionnement" element={<Appro/>}/>
            <Route path="Rapport" element={<Rapports/>}/>
            <Route path="Utilisateurs" element={<Utilisateurs/>}/>
        </Routes>
    );
};

export default AppRoutes;
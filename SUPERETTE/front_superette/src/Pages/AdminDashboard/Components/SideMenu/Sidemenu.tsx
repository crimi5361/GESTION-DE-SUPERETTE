import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  DashboardOutlined,
  ShoppingCartOutlined,
  BarChartOutlined,
  UserOutlined,
} from "@ant-design/icons";

// Menu latéral pour la navigation
const Sidemenu = () => {
  const location = useLocation(); // Récupère l'URL actuelle
  const [selectedKeys, setSelectedKeys] = useState<string>("/");

  // Met à jour la sélection actuelle selon l'URL
  useEffect(() => {
    setSelectedKeys(location.pathname);
  }, [location.pathname]);

  const navigate = useNavigate();

  // Redirige vers la page sélectionnée
  const handleMenuClick = (item: { key: string }) => {
    navigate(item.key);
  };

  // Liste des éléments du menu avec icônes
  const items = [
    { key: "/admin", icon: <DashboardOutlined />, label: "Dashboard" },
    { key: "/admin/Achat_appro", icon: <ShoppingCartOutlined />, label: "Stock Produits" },
    { key: "/admin/Approvisionnement", icon: <ShoppingCartOutlined />, label: "Approvisionnement" },
    { key: "/admin/Rapport", icon: <BarChartOutlined />, label: "Rapport" },
    { key: "/admin/Utilisateurs", icon: <UserOutlined />, label: "Utilisateurs" },
  ];

  return (
    <div
      className="fixed top-0 left-0 z-40 h-screen   w-[200] pt-22  transition-all bg-white shadow-md "
    >
      <Menu
        onClick={handleMenuClick}
        selectedKeys={[selectedKeys]}
        mode="inline"
        
        items={items}
      />
    </div>
  );
};

export default Sidemenu;

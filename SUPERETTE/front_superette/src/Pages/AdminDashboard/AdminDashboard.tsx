import Header from '../../Components/Hearder';
import PageContent from './Components/PageContent/PageContent';
import Sidemenu from './Components/SideMenu/Sidemenu';

// Mise en page du dashboard admin avec layout fixe
const AdminDashboard = () => {
  return (
    <div className="flex  flex-col flex-1 ml-[200px]">
      <Sidemenu />
      <div className="flex flex-col flex-1">
        <Header />
        <div className="flex-1 overflow-auto">
        <PageContent />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

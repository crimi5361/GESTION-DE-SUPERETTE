
import DashboardStats from '../../Components/DashboardStats'
import Hearder from '../../Components/Hearder'
import VenteSection from '../../Components/VenteSection'
import PanierSection from '../../Components/PanierSection'


const CaissierDashboard = () => {
  return (
    <div className="min-h-screen pt-22 p-4">
      <Hearder />
     <DashboardStats />
      

       {/* Section Vente + Panier */}
       <div className="flex flex-col lg:flex-row gap-4 mt-6 w-full">
        {/* VenteSection à gauche */}
        <div className="w-full lg:w-2/3 border border-gray-300 rounded-lg p-2">
          <VenteSection />
        </div>

        {/* PanierSection à droite */}
        <div className="w-full lg:w-1/3 border border-gray-300 rounded-lg p-2">
          <PanierSection />
        </div>
      </div>
    </div>
  )
}

export default CaissierDashboard

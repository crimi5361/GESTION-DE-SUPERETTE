
import DashboardStats from '../../Components/DashboardStats'
import Hearder from '../../Components/Hearder'
import VenteSection from '../../Components/VenteSection'
import PanierSection from '../../Components/PanierSection'


const CaissierDashboard = () => {
  return (
    <div className="min-h-screen pt-22 p-4">
      <Hearder />
      <DashboardStats />
      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        <div className="lg:w-2/3">
          <VenteSection />
        </div>
        <div className="lg:w-1/3">
          <PanierSection />
        </div>
      </div>
    </div>
  )
}

export default CaissierDashboard

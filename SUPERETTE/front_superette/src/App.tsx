import { Routes, Route } from 'react-router-dom';
import Welcome from './Pages/Welcome';
import LoginAdmin from './Pages/LoginAdmin';
import LoginCaissier from './Pages/LoginCaissier';
import AdminDashboard from './Pages/AdminDashboard/AdminDashboard';
import CaissierDashboard from './Pages/CaissierDashboard/CaissierDashboard';
import ProtectedRoute from './Components/ProtectedRoute';
import "./App.css"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/login-admin" element={<LoginAdmin />} />
      <Route path="/login-caissier" element={<LoginCaissier />} />
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/caissier"
        element={
          <ProtectedRoute allowedRole="caissier">
            <CaissierDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;

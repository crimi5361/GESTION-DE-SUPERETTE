import {Routes, Route} from "react-router-dom";
import Welcome from "./Pages/Welcome";
import "./App.css"
import LoginAdmin from "./Pages/LoginAdmin";
import LoginCaissier from "./Pages/LoginCaissier";
import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard";
import CaissierDashboard from "./Pages/CaissierDashboard/CaissierDashboard";

const App = () => {
  return (
   <Routes>
       <Route path="/" element={<Welcome/>}/>
       <Route path="/login-admin" element={<LoginAdmin/>}/>
       <Route path="/login-caissier" element={<LoginCaissier/>}/>
       <Route path="/admin" element={<AdminDashboard/>}/>
       <Route path="/caissier" element={<CaissierDashboard/>}/>
   </Routes>
  )
}

export default App

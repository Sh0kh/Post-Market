import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import AppLayout from "./layouts/AppLayout";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./Components/ProtectedRoute"; // Импорт компонента защиты маршрутов
import Login from "./Components/Login/Login";
import Dashboard from "./Components/Dashboard/Dashboard";
import Orders from "./Components/Dashboard/components/Orders/Orders";
import Box from "./Components/Dashboard/components/Box/Box";
import Benefit from "./Components/Dashboard/components/Benefit/Benefit";
import Debtors from "./Components/Debtors/Debtors";
import Expenses from "./Components/Expenses/Expenses";
import Profile from "./Components/Profile/Profile";
import Sell from "./Components/Sell/Sell";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<AppLayout />}>
          <Route
            element={
              // <ProtectedRoute>
              <AdminLayout />
              //  </ProtectedRoute>
            }
          >
            <Route path="/" element={<Dashboard />} />
            <Route path="/order" element={<Orders />} />
            <Route path="/benefits" element={<Benefit />} />
            <Route path="/box" element={<Box />} />
            <Route path="/debtors" element={<Debtors />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/profil" element={<Profile />} />
            <Route path="/sell" element={<Sell />} />
          </Route>
          <Route element={<MainLayout />}>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

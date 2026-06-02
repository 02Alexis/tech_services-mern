import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import ServicesPage from "../pages/ServicesPage";
import EquipmentTypesPage from "../pages/EquipmentTypesPage";
import UsersPage from "../pages/UsersPage";

import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../layouts/MainLayout";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<DashboardPage />} />

          <Route path="/services" element={<ServicesPage />} />

          <Route path="/equipment-types" element={<EquipmentTypesPage />} />

          <Route path="/users" element={<UsersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

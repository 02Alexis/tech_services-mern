import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import ServicesPage from "../pages/ServicesPage";
import EquipmentTypesPage from "../pages/EquipmentTypesPage";
import UsersPage from "../pages/UsersPage";
import CreateServicePage from "../pages/CreateServicePage";
import ServiceDetailPage from "../pages/ServiceDetailPage";

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
          <Route path="/services/:id" element={<ServiceDetailPage />} />

          <Route path="/equipment-types" element={<EquipmentTypesPage />} />

          <Route path="/users" element={<UsersPage />} />
          <Route path="/services/new" element={<CreateServicePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import ServicesPage from "../pages/ServicesPage";
import EquipmentTypesPage from "../pages/EquipmentTypesPage";
import UsersPage from "../pages/UsersPage";
import CreateServicePage from "../pages/CreateServicePage";
import ServiceDetailPage from "../pages/ServiceDetailPage";
import EditServicePage from "../pages/EditServicePage";

import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
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
          <Route path="/services/:id/edit" element={<EditServicePage />} />

          <Route path="/equipment-types" element={<AdminRoute><EquipmentTypesPage /></AdminRoute>} />

          <Route path="/users" element={<AdminRoute><UsersPage /></AdminRoute>} />
          <Route path="/services/new" element={<CreateServicePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

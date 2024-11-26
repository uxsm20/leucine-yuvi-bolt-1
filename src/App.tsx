import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CreateApplicationPage from './pages/CreateApplicationPage';
import CompaniesPage from './pages/CompaniesPage';
import FeaturesPage from './pages/FeaturesPage';
import BenefitsPage from './pages/BenefitsPage';
import SecurityPage from './pages/SecurityPage';
import UserManagementPage from './pages/UserManagementPage';
import RoleManagementPage from './pages/RoleManagementPage';
import OntologyPage from './pages/OntologyPage';
import ApiLogsPage from './pages/ApiLogsPage';
import AuditLogPage from './pages/GlobalAuditLogPage';
import ChangeLogPage from './pages/GlobalChangeLogPage';
import ProjectPlanPage from './pages/ProjectPlanPage';
import WorkflowsPage from './pages/WorkflowsPage';
import TestPlanPage from './pages/TestPlanPage';
import PagesPage from './pages/PagesPage';
import PageEditorPage from './pages/PageEditorPage';
import AuthenticatedLayout from './layouts/AuthenticatedLayout';
import JobsPage from './pages/JobsPage';
import DataSourcesPage from './pages/DataSourcesPage';
import IndustrySolutionsPage from './pages/IndustrySolutionsPage';
import UseCasesPage from './pages/UseCasesPage';
import SuccessStoriesPage from './pages/SuccessStoriesPage';
import ApplicationsPage from './pages/ApplicationsPage';
import BatchRecordReviewerPage from './pages/products/BatchRecordReviewerPage';
import ElectronicBatchRecordPage from './pages/products/ElectronicBatchRecordPage';
import BatchRecipeBuilderPage from './pages/products/BatchRecipeBuilderPage';
import MaterialManagementPage from './pages/products/MaterialManagementPage';
import ShopFloorMonitoringPage from './pages/products/ShopFloorMonitoringPage';
import ELogbookPage from './pages/products/ELogbookPage';
import FacilitiesPage from './pages/FacilitiesPage';
import FacilityDepartmentsPage from './pages/FacilityDepartmentsPage';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 w-full">
        <Routes>
          <Route path="/" element={
            <>
              <Header />
              <HomePage />
            </>
          } />
          <Route path="/login" element={
            <>
              <Header />
              <LoginPage />
            </>
          } />
          <Route path="/solutions" element={
            <>
              <Header />
              <IndustrySolutionsPage />
            </>
          } />
          <Route path="/applications" element={
            <>
              <Header />
              <ApplicationsPage />
            </>
          } />
          <Route path="/use-cases" element={
            <>
              <Header />
              <UseCasesPage />
            </>
          } />
          <Route path="/success-stories" element={
            <>
              <Header />
              <SuccessStoriesPage />
            </>
          } />
          <Route path="/security" element={
            <>
              <Header />
              <SecurityPage />
            </>
          } />
          <Route path="/products/batch-record-reviewer" element={
            <>
              <Header />
              <BatchRecordReviewerPage />
            </>
          } />
          <Route path="/products/electronic-batch-record" element={
            <>
              <Header />
              <ElectronicBatchRecordPage />
            </>
          } />
          <Route path="/products/batch-recipe-builder" element={
            <>
              <Header />
              <BatchRecipeBuilderPage />
            </>
          } />
          <Route path="/products/material-management" element={
            <>
              <Header />
              <MaterialManagementPage />
            </>
          } />
          <Route path="/products/shop-floor-monitoring" element={
            <>
              <Header />
              <ShopFloorMonitoringPage />
            </>
          } />
          <Route path="/products/elogbook" element={
            <>
              <Header />
              <ELogbookPage />
            </>
          } />
          
          {/* Authenticated Routes */}
          <Route path="/dashboard" element={
            <AuthenticatedLayout>
              <DashboardPage />
            </AuthenticatedLayout>
          } />
          <Route path="/create-application" element={
            <AuthenticatedLayout>
              <CreateApplicationPage />
            </AuthenticatedLayout>
          } />
          <Route path="/companies" element={
            <AuthenticatedLayout>
              <CompaniesPage />
            </AuthenticatedLayout>
          } />
          <Route path="/companies/:companyId/users" element={
            <AuthenticatedLayout>
              <UserManagementPage />
            </AuthenticatedLayout>
          } />
          <Route path="/companies/:companyId/roles" element={
            <AuthenticatedLayout>
              <RoleManagementPage />
            </AuthenticatedLayout>
          } />
          <Route path="/companies/:companyId/facilities" element={
            <AuthenticatedLayout>
              <FacilitiesPage />
            </AuthenticatedLayout>
          } />
          <Route path="/facilities/:facilityId/departments" element={
            <AuthenticatedLayout>
              <FacilityDepartmentsPage />
            </AuthenticatedLayout>
          } />
          <Route path="/companies/:companyId/build-ontology" element={
            <AuthenticatedLayout>
              <DataSourcesPage />
            </AuthenticatedLayout>
          } />
          <Route path="/companies/:companyId/ontology" element={
            <AuthenticatedLayout>
              <OntologyPage />
            </AuthenticatedLayout>
          } />
          <Route path="/companies/:companyId/api-logs" element={
            <AuthenticatedLayout>
              <ApiLogsPage />
            </AuthenticatedLayout>
          } />
          <Route path="/audit-log" element={
            <AuthenticatedLayout>
              <AuditLogPage />
            </AuthenticatedLayout>
          } />
          <Route path="/change-log" element={
            <AuthenticatedLayout>
              <ChangeLogPage />
            </AuthenticatedLayout>
          } />
          <Route path="/companies/:companyId/applications/:appId/project-plan" element={
            <AuthenticatedLayout>
              <ProjectPlanPage />
            </AuthenticatedLayout>
          } />
          <Route path="/companies/:companyId/applications/:appId/test-plan" element={
            <AuthenticatedLayout>
              <TestPlanPage />
            </AuthenticatedLayout>
          } />
          <Route path="/companies/:companyId/applications/:appId/workflows" element={
            <AuthenticatedLayout>
              <WorkflowsPage />
            </AuthenticatedLayout>
          } />
          <Route path="/companies/:companyId/applications/:appId/pages" element={
            <AuthenticatedLayout>
              <PagesPage />
            </AuthenticatedLayout>
          } />
          <Route path="/companies/:companyId/applications/:appId/pages/:pageId" element={
            <AuthenticatedLayout>
              <PageEditorPage />
            </AuthenticatedLayout>
          } />
          <Route path="/companies/:companyId/jobs" element={
            <AuthenticatedLayout>
              <JobsPage />
            </AuthenticatedLayout>
          } />
        </Routes>
      </div>
    </Router>
  );
}
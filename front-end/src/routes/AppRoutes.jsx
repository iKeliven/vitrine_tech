import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

import Home from "../pages/Home/Home";
import ProjectsPage from "../pages/ProjectsPage/ProjectsPage";
import CoursesPage from "../pages/CoursesPage/CoursesPage";
import CourseDetailsPage from "../pages/CourseDetailsPage/CourseDetailsPage";
import AboutPage from "../pages/AboutPage/AboutPage";
import ProjectDetailsPage from "../pages/ProjectDetailsPage/ProjectDetailsPage";
import StudentsPage from "../pages/StudentsPage/StudentsPage";
import StudentProfilePage from "../pages/StudentProfilePage/StudentProfilePage";

import CompaniesPage from "../pages/CompaniesPage/CompaniesPage";
import CompanyProfilePage from "../pages/CompanyProfilePage/CompanyProfilePage";

import LoginPage from "../pages/AuthPages/LoginPage";
import SignupPage from "../pages/AuthPages/SignupPage";
import CompanySignupPage from "../pages/AuthPages/CompanySignupPage";
import CompanyLoginPage from "../pages/AuthPages/CompanyLoginPage";
import StudentPoliciesPage from "../pages/policies/StudentPoliciesPage";
import CompanyPoliciesPage from "../pages/policies/CompanyPoliciesPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/projetos" element={<ProjectsPage />} />
        <Route path="/cursos" element={<CoursesPage />} />
        <Route path="/curso/:courseId" element={<CourseDetailsPage />} />
        <Route path="/sobre" element={<AboutPage />} />
<Route path="/projeto/:projectId" element={<ProjectDetailsPage />} />
        <Route path="/alunos" element={<StudentsPage />} />
        <Route path="/aluno/:studentId" element={<StudentProfilePage />} />

        <Route path="/empresas" element={<CompaniesPage />} />
        <Route path="/empresa/:companyId" element={<CompanyProfilePage />} />
      </Route>

      <Route element={<AuthLayout />}>

      <Route path="/politicas/aluno" element={<StudentPoliciesPage />} />
<Route path="/politicas/empresa" element={<CompanyPoliciesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<SignupPage />} />

        <Route path="/login-empresa" element={<CompanyLoginPage />} />
        <Route path="/cadastro-empresa" element={<CompanySignupPage />} />
      </Route>
    </Routes>
  );
}
import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

import Home from "../pages/Home/Home";
import ProjectsPage from "../pages/ProjectsPage/ProjectsPage";
import CoursesPage from "../pages/CoursesPage/CoursesPage";
import CourseDetailsPage from "../pages/CourseDetailsPage/CourseDetailsPage";
import AboutPage from "../pages/AboutPage/AboutPage";

import StudentsPage from "../pages/StudentsPage/StudentsPage";
import StudentProfilePage from "../pages/StudentProfilePage/StudentProfilePage";

import CompaniesPage from "../pages/CompaniesPage/CompaniesPage";
import CompanyProfilePage from "../pages/CompanyProfilePage/CompanyProfilePage";

import LoginPage from "../pages/AuthPages/LoginPage";
import SignupPage from "../pages/AuthPages/SignupPage";
import CompanySignupPage from "../pages/AuthPages/CompanySignupPage";
import CompanyLoginPage from "../pages/AuthPages/CompanyLoginPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/projetos" element={<ProjectsPage />} />
        <Route path="/cursos" element={<CoursesPage />} />
        <Route path="/curso/:courseId" element={<CourseDetailsPage />} />
        <Route path="/sobre" element={<AboutPage />} />

        <Route path="/alunos" element={<StudentsPage />} />
        <Route path="/aluno/:studentId" element={<StudentProfilePage />} />

        <Route path="/empresas" element={<CompaniesPage />} />
        <Route path="/empresa/:companyId" element={<CompanyProfilePage />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<SignupPage />} />

        <Route path="/empresa-login" element={<CompanyLoginPage />} />
        <Route path="/empresa-cadastro" element={<CompanySignupPage />} />
      </Route>
    </Routes>
  );
}
import { useEffect, useState } from "react";

import PageLayout from "../../layouts/PageLayout";
import ProjectCard from "../../componentes/Cards/ProjectCard";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import Loading from "../../componentes/Loading/Loading";
import CTA from "../../componentes/CTA/CTA";
import AboutSection from "../../componentes/AboutSection/AboutSection";

export default function ProjectsPage() {

  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {

    try {

      setLoading(true);
      setError("");

      const response = await api.get("/projects");

      setProjects(response.data);

    } catch (err) {

      console.error(
        "Erro ao buscar projetos:",
        err
      );

      setError(
        err.response?.data?.error ||
        "Erro ao carregar projetos"
      );

    } finally {

      setLoading(false);
    }
  }

  if (loading) {
    return (
      <Loading />
    );
  }

  if (error) {
    return (
      <div>
        {error}
      </div>
    );
  }
  const navigate = useNavigate();

  const benefits = [
    { label: "Portfólio real para os alunos", icon: <FiFolder /> },
    { label: "Mais engajamento nas disciplinas", icon: <FiTrendingUp /> },
    { label: "Aproximação com o mercado", icon: <FiBriefcase /> },
    { label: "Valorização dos projetos acadêmicos", icon: <FiTarget /> }
  ];

  function handleLogin() {
    navigate("/login");
  }
  return (
    <>
      <PageLayout
        title="Projetos"
        subtitle="Explore projetos desenvolvidos pelos alunos do Senai de São José"
        placeholder="Buscar projeto..."
        data={projects}
        renderItem={(project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            student={project.student?.name}
            email={project.student?.email}
            description={project.description}
            techs={project.techs}
            avatar={project.student?.avatar}
          />
        )}
      />
      <AboutSection
        title="Por que usar o"
        highlight="VitrineTech?"
        list={benefits}
      />

      <CTA
        title="Faça parte da VitrineTech"
        buttonText="Começar agora"
        onClick={handleLogin}
      />
    </>
  );
}
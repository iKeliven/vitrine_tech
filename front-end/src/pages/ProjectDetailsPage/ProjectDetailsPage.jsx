import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./ProjectDetailsPage.module.css";

import Title from "../../componentes/Title/Title";
import Subtitle from "../../componentes/Subtitle/Subtitle";
import Badge from "../../componentes/Badge/Badge";
import Button from "../../componentes/Button/Button";
import Loading from "../../componentes/Loading/Loading";

import { FiArrowLeft, FiGithub, FiExternalLink } from "react-icons/fi";

import api from "../../services/api";

export default function ProjectDetailsPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProject();
  }, [projectId]);

  async function fetchProject() {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(`/projects/${projectId}`);

      setProject(response.data);
    } catch (err) {
      console.error("Erro ao buscar projeto:", err);

      setError(
        err.response?.data?.error ||
        "Erro ao carregar projeto"
      );
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className={styles.page}>
        <p>{error}</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className={styles.page}>
        <p>Projeto não encontrado.</p>
      </div>
    );
  }

  const projectImage =
    project.images?.[0]?.url ||
    project.image ||
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085";

  const githubLink =
    project.links?.github ||
    project.github;

  const demoLink =
    project.links?.demo ||
    project.demo;

  return (
    <main className={styles.page}>
      <button
        className={styles.backButton}
        onClick={() => navigate("/projetos")}
      >
        <FiArrowLeft />
        Voltar para projetos
      </button>

      <section className={styles.hero}>
        <div className={styles.imageBox}>
          <img src={projectImage} alt={project.title} />
        </div>

        <div className={styles.info}>
          <Title size="lg">{project.title}</Title>

          <Subtitle size="md">
            {project.description}
          </Subtitle>

          <div className={styles.student}>
            <img
              src={project.user?.avatar || "https://i.pravatar.cc/100"}
              alt={project.user?.name || "Aluno"}
            />

            <div>
              <strong>{project.user?.name}</strong>
              <p>{project.user?.email}</p>
            </div>
          </div>

          <div className={styles.techs}>
            {project.techs?.map((tech) => (
              <Badge key={tech} text={tech} />
            ))}
          </div>

          <div className={styles.actions}>
            {demoLink && (
              <Button
                rightIcon={<FiExternalLink />}
                onClick={() => window.open(demoLink, "_blank")}
              >
                Acessar projeto
              </Button>
            )}

            {githubLink && (
              <Button
                rightIcon={<FiGithub />}
                onClick={() => window.open(githubLink, "_blank")}
              >
                GitHub
              </Button>
            )}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <Title size="md">Sobre o projeto</Title>

        <p>{project.description}</p>
      </section>
    </main>
  );
}
import styles from "./ProfilePage.module.css";

import { useEffect, useState } from "react";

import Button from "../../componentes/Button/Button";
import Title from "../../componentes/Title/Title";
import ProjectCard from "../../componentes/ProjectCard/ProjectCard";

import { FiPlus, FiEdit } from "react-icons/fi";

import api from "../../services/api";
import Loading from "../../componentes/Loading/Loading";

export default function ProfilePage() {

  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProfileData();
  }, []);

  async function fetchProfileData() {

    try {

      setLoading(true);
      setError("");

      const [userResponse, projectsResponse] = await Promise.all([
        api.get("/users/me"),
        api.get("/projects/me")
      ]);

      setUser(userResponse.data);
      setProjects(projectsResponse.data);

    } catch (err) {

      console.error("Erro ao carregar perfil:", err);

      setError(
        err.response?.data?.error ||
        "Erro ao carregar dados do perfil"
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
      <div className={styles.page}>
        <p>{error}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={styles.page}>
        <p>Usuário não encontrado.</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>

      <div className={styles.profile}>

        <img
          src={
            user.avatar ||
            "https://i.pravatar.cc/150?img=5"
          }
          alt={user.name}
        />

        <div>

          <h2>
            {user.name} {user.lastName}
          </h2>

          <p>
            {user.course || "Curso não informado"}
          </p>

          <span>
            {user.turma
              ? `Turma: ${user.turma}`
              : "Turma não informada"}
          </span>

          <Button
            size="sm"
            leftIcon={<FiEdit />}
          >
            Editar perfil
          </Button>

        </div>

      </div>

      <div className={styles.header}>

        <Title size="md">
          Meus projetos
        </Title>

        <Button
          size="sm"
          leftIcon={<FiPlus />}
        >
          Adicionar projeto
        </Button>

      </div>

      <div className={styles.grid}>

        {projects.length > 0 ? (

          projects.map((project) => (
            <ProjectCard
              key={project.id}
              {...project}
              student={user.name}
            />
          ))

        ) : (

          <p>
            Você ainda não cadastrou nenhum projeto.
          </p>

        )}

      </div>

    </div>
  );
}
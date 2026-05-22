import styles from "./ProfilePage.module.css";
import { useState } from "react";
import Button from "../../componentes/Button/Button";
import Title from "../../componentes/Title/Title";
import ProjectCard from "../../componentes/ProjectCard/ProjectCard";
import { FiPlus, FiEdit } from "react-icons/fi";

export default function ProfilePage() {
  const [user, setUser] = useState({
    name: "Keliven",
    course: "Dev Sistemas",
    bio: "Desenvolvedora front-end apaixonada por UI/UX",
    avatar: "https://i.pravatar.cc/150?img=5"
  });

  const [projects, setProjects] = useState([
    {
      title: "App Fitness",
      description: "App de treino",
      student: "Keliven",
      techs: ["React"]
    }
  ]);

  return (
    <div className={styles.page}>

      {/* PERFIL */}
      <div className={styles.profile}>
        <img src={user.avatar} alt="" />

        <div>
          <h2>{user.name}</h2>
          <p>{user.course}</p>
          <span>{user.bio}</span>

          <Button size="sm" leftIcon={<FiEdit />}>
            Editar perfil
          </Button>
        </div>
      </div>

      {/* HEADER PROJETOS */}
      <div className={styles.header}>
        <Title size="md">Meus projetos</Title>

        <Button size="sm" leftIcon={<FiPlus />}>
          Adicionar projeto
        </Button>
      </div>

      {/* LISTA */}
      <div className={styles.grid}>
        {projects.map((p, i) => (
          <ProjectCard key={i} {...p} />
        ))}
      </div>

    </div>
  );
}
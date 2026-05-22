import styles from "./Highlights.module.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ProjectCard from "../Cards/ProjectCard";
import ProjectModal from "../ProjectModal/ProjectModal";
import HeaderSection from "../HeaderSection/HeaderSection";

import { motion } from "framer-motion";

import api from "../../services/api";

export default function Highlights() {
  const navigate = useNavigate();

  const [selected, setSelected] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      const response = await api.get("/projects");

      setProjects(response.data.slice(0, 3));
    } catch (error) {
      console.error("Erro ao buscar projetos:", error);
      setProjects([]);
    }
  }

  return (
    <section className={styles.section}>
      <HeaderSection
        title="Nossos"
        highlight="projetos"
        buttonText="Ver todos os projetos"
        onClick={() => navigate("/projetos")}
      />

      <div className={styles.grid}>
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            onClick={() => setSelected(project)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: i * 0.15,
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1]
            }}
            viewport={{ once: true, amount: 0.25 }}
            whileHover={{ scale: 1.04 }}
            style={{ cursor: "pointer" }}
          >
            <ProjectCard
              title={project.title}
              description={project.description}
              techs={project.techs}
              student={project.user?.name}
              email={project.user?.email}
              avatar={project.user?.avatar}
            />
          </motion.div>
        ))}
      </div>

      <ProjectModal
        project={selected}
        onClose={() => setSelected(null)}
      />
    </section>
  );
}
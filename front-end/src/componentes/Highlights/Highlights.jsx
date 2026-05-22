import styles from "./Highlights.module.css";
import Title from "../Title/Title";
import ProjectCard from "../Cards/ProjectCard";
import { useState } from "react";
import ProjectModal from "../ProjectModal/ProjectModal";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import Button from "../Button/Button";
import HeaderSection from "../HeaderSection/HeaderSection";

export default function Highlights() {
  const [selected, setSelected] = useState(null);

  const projects = [
    {
      title: "App Fitness",
      student: "Maria",
      email: "email@email.com",
      description: "App para treinos personalizados",
      techs: ["React"],
      avatar: "https://i.pravatar.cc/100?img=5"
    },
    {
      title: "Sistema Escolar",
      student: "João",
      email: "email@email.com",
      description: "Gerenciamento de alunos",
      techs: ["Node"],
      avatar: "https://i.pravatar.cc/100?img=12"
    },
    {
      title: "Portfólio Dev",
      student: "Ana",
      email: "email@email.com",
      description: "Site pessoal responsivo",
      techs: ["HTML", "CSS"],
      avatar: "https://i.pravatar.cc/100?img=8"
    }
  ];
  return (
    <section className={styles.section}>
      <HeaderSection
        title="Nossos"
        highlight="projetos"
        buttonText="Ver todos os projetos"
        onClick={() => navigate("/projetos")}
      />
      <div className={styles.grid}>
        {projects.map((p, i) => (
          <motion.div
            key={i}
            onClick={() => setSelected(p)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, amount: 0.25 }}
            whileHover={{ scale: 1.04 }}
            style={{ cursor: "pointer" }}
          >
            <ProjectCard {...p} />
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
import { motion, AnimatePresence } from "framer-motion";
import styles from "./ProjectModal.module.css";
import { useEffect } from "react";
import Button from "../Button/Button";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import Title from "../Title/Title";
import Badge from "../Badge/Badge";

export default function ProjectModal({ project, onClose }) {

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >

          <motion.div
            className={styles.modal}
            initial={{ scale: 0.9, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.close} onClick={onClose}>
              ✕
            </button>

            {/* IMAGEM */}
            <div className={styles.preview}>
              <img src={project.image} alt={project.title} />
            </div>
            {/* BOTÃO FECHAR */}



            {/* CONTEÚDO */}
            <div className={styles.content}>
              <Title size="md">{project.title}</Title>

              <div className={styles.student}>
                <img src={project.avatar} alt="" />
                <span>{project.student}</span>
              </div>


              <div className={styles.content}>
                <Title size="sm">Sobre o projeto</Title>
                <p className={styles.description}>
                  {project.description}
                </p>
                <Title size="sm">Tecnologias Utilizadas</Title>
                <div className={styles.techs}>
                  {project.techs?.map((t) => (
                    <Badge key={t} text={t}></Badge>
                  ))}
                </div>
              </div>


              <div className={styles.actions}>
                <Title size="sm">Links do projeto</Title>
                <div className={styles.actionsContent}>
                  <Button variant="primary" size="md"
                    rightIcon={<FiExternalLink />}
                  >
                    Acesse o projeto
                  </Button>
                  <Button variant="primary" size="md"
                    rightIcon={<FiGithub />}
                  >
                    Github do projeto
                  </Button>
                </div>

              </div>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
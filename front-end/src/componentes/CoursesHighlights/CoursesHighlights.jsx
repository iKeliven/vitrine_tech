import { motion } from "framer-motion";
import styles from "./CoursesHighlights.module.css";
import Title from "../Title/Title";
import { FiCode, FiLayout, FiCpu, FiDatabase } from "react-icons/fi";
import HeaderSection from "../HeaderSection/HeaderSection";
import CourseCard from "../Cards/CourseCard";
import { useNavigate } from "react-router-dom";

const courses = [
  {
    title: "Desenvolvimento Front-end (React)",
    desc: "Crie interfaces modernas e responsivas.",
    icon: <FiLayout />
  },
  {
    title: "Desenvolvimento de Interfaces",
    desc: "Design e usabilidade na prática.",
    icon: <FiCode />
  },
  {
    title: "Lógica de Programação",
    desc: "Algoritmos e resolução de problemas.",
    icon: <FiCpu />
  }
];

export default function CoursesHighlights() {
  const navigate = useNavigate();

  return (
    <section className={styles.section}>
      <HeaderSection
        title="Nossos"
        highlight="cursos"
        buttonText="Ver todos os cursos"
        onClick={() => navigate("/cursos")}
      />

      <div className={styles.grid}>
        {courses.map((course, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <CourseCard
              title={course.title}
              desc={course.desc}
              icon={course.icon}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./CoursesHighlights.module.css";

import HeaderSection from "../HeaderSection/HeaderSection";
import CourseCard from "../Cards/CourseCard";

import api from "../../services/api";

export default function CoursesHighlights() {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  async function fetchCourses() {
    try {
      const response = await api.get("/courses");

      setCourses(response.data.slice(0, 3));
    } catch (error) {
      console.error("Erro ao buscar cursos:", error);
      setCourses([]);
    }
  }

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
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              delay: i * 0.1,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            <CourseCard
              title={course.title}
              description={course.shortDescription || course.description}
              duration={course.duration}
              level={course.level}
              image={course.image}
              onClick={() => navigate(`/curso/${course.id}`)}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
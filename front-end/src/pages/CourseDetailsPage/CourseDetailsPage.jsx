import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import styles from "./CourseDetailsPage.module.css";

import {
  FiArrowRight,
  FiClock,
  FiBarChart2,
  FiCheckCircle
} from "react-icons/fi";

import CTA from "../../componentes/CTA/CTA";
import AboutSection from "../../componentes/AboutSection/AboutSection";
import DetailsSection from "../../componentes/DetailsSection/DetailsSection";
import HeroContent from "../../componentes/HeroContent/HeroContent";

import api from "../../services/api";
import Loading from "../../componentes/Loading/Loading";

export default function CourseDetailsPage() {
  const { courseId } = useParams();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourse();
  }, [courseId]);

  async function fetchCourse() {
    try {
      setLoading(true);

      const response = await api.get(`/courses/${courseId}`);

      setCourse(response.data);
    } catch (error) {
      console.error("Erro ao buscar curso:", error);
    } finally {
      setLoading(false);
    }
  }

  function handleOfficialCourse() {
    if (course?.officialUrl) {
      window.open(course.officialUrl, "_blank");
    }
  }

  if (loading) {
    return <Loading />;
  }

  if (!course) {
    return <p>Curso não encontrado.</p>;
  }

  const details = [
    {
      label: "Duração",
      value: course.duration || "Não informado",
      icon: <FiClock />
    },
    {
      label: "Nível",
      value: course.level || "Técnico",
      icon: <FiBarChart2 />
    }
  ];

  const content =
    course.modules?.flatMap((module) =>
      module.subjects?.map((subject) => ({
        label: `${subject.title} - ${subject.workload}`,
        icon: <FiCheckCircle />
      }))
    ) || [];

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.overlay}></div>

        <div className={styles.heroContent}>
          <HeroContent
            layout="start"
            image={course.image}
            title={course.title}
            subtitle={course.shortDescription || course.description}
            buttonText="Ver página oficial"
            buttonIcon={<FiArrowRight />}
            onButtonClick={handleOfficialCourse}
          />
        </div>
      </section>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <AboutSection title="Sobre o" highlight="curso">
          {course.description}
        </AboutSection>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <DetailsSection details={details} content={content} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <AboutSection
          title="Conteúdo"
          highlight="do curso"
          list={content}
          itemIcon={<FiCheckCircle />}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <CTA
          title="Quer conhecer mais sobre este curso?"
          buttonText="Acessar página oficial"
          onClick={handleOfficialCourse}
        />
      </motion.div>
    </>
  );
}
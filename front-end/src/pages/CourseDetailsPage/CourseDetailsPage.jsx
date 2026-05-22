import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import styles from "./CourseDetailsPage.module.css";
import { FiArrowRight, FiClock, FiBarChart2, FiCheckCircle } from "react-icons/fi";
import CTA from "../../componentes/CTA/CTA";
import AboutSection from "../../componentes/AboutSection/AboutSection";
import DetailsSection from "../../componentes/DetailsSection/DetailsSection";
import HeroContent from "../../componentes/HeroContent/HeroContent";

export default function CourseDetailsPage() {
  const navigate = useNavigate();

  const course = {
    title: "Desenvolvimento Front-end",
    description:
      "Aprenda a construir interfaces modernas com React, HTML, CSS e boas práticas de mercado.",
    duration: "120h",
    level: "Intermediário",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
  };

  const details = [
    {
      label: "Duração",
      value: course.duration,
      icon: <FiClock />
    },
    {
      label: "Nível",
      value: course.level,
      icon: <FiBarChart2 />
    }
  ];

  const content = [
    { label: "HTML, CSS e responsividade", icon: <FiCheckCircle /> },
    { label: "JavaScript moderno", icon: <FiClock /> },
    { label: "React e componentização", icon: <FiBarChart2 /> },
    { label: "Consumo de APIs", icon: <FiCheckCircle /> },
    { label: "Boas práticas e performance", icon: <FiArrowRight /> }
  ];

  return (
    <>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.overlay}></div>

        <div className={styles.heroContent}>
          <HeroContent
            layout="start"
            image={course.image}
            title={course.title}
            subtitle={course.description}
            buttonText="Inscrever-se"
            buttonIcon={<FiArrowRight />}
            onButtonClick={() => navigate('/login')}
          />
        </div>
      </section>

      {/* SOBRE */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <AboutSection
          title="Sobre o"
          highlight="curso"
        >
          Este curso foi desenvolvido para preparar você para o mercado de
          desenvolvimento front-end, com foco em projetos reais, boas práticas
          e tecnologias modernas.
        </AboutSection>
      </motion.div>

      {/* DETALHES */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <DetailsSection details={details} content={content} />
      </motion.div>
      
      {/* CONTEÚDO */}
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

      {/* CTA FINAL */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <CTA 
          title="Comece agora" 
          buttonText="Garantir vaga"
        />
      </motion.div>
    </>
  );
}
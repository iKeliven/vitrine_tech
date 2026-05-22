import { motion } from "framer-motion";
import styles from "./AboutPage.module.css";
import Title from "../../componentes/Title/Title";
import Subtitle from "../../componentes/Subtitle/Subtitle";
import { FiArrowRight, FiFolder, FiTrendingUp, FiBriefcase, FiTarget } from "react-icons/fi";
import HowItWorks from "../../componentes/HowItWorks/HowItWorks";
import CTA from "../../componentes/CTA/CTA";
import AboutSection from "../../componentes/AboutSection/AboutSection";
import HeroContent from "../../componentes/HeroContent/HeroContent";
import { useNavigate } from "react-router-dom";

export default function AboutPage() {
  const navigate = useNavigate();

  const benefits = [
    { label: "Portfólio real para os alunos", icon: <FiFolder /> },
    { label: "Mais engajamento nas disciplinas", icon: <FiTrendingUp /> },
    { label: "Aproximação com o mercado", icon: <FiBriefcase /> },
    { label: "Valorização dos projetos acadêmicos", icon: <FiTarget /> }
  ];

  function handleLogin() {
    navigate('/login');
  }

  return (
    <>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.overlay}></div>

        <div className={styles.heroContent}>
          <HeroContent
            layout="center"
            title="VitrineTech"
            subtitle="Uma plataforma para dar visibilidade aos projetos desenvolvidos pelos alunos e conectar aprendizado com o mercado."
            buttonText="Ver projetos"
            buttonIcon={<FiArrowRight />}
            onButtonClick={() => navigate('/projetos')}
          />
        </div>
      </section>

      {/* MISSÃO */}
      <AboutSection
        title="Nossa"
        highlight="missão"
      >
        O VitrineTech nasce com o objetivo de transformar projetos acadêmicos
        em portfólios reais. Aqui, os alunos deixam de apenas aprender e passam
        a demonstrar suas habilidades para o mundo.
      </AboutSection>

      {/* COMO FUNCIONA */}
      <HowItWorks />

      {/* BENEFÍCIOS */}
      <AboutSection
        title="Por que usar o"
        highlight="VitrineTech?"
        list={benefits}
      />

      {/* CTA FINAL */}
      <CTA 
        title="Faça parte da VitrineTech" 
        buttonText="Começar agora"
        onClick={handleLogin}
      />
    </>
  );
}
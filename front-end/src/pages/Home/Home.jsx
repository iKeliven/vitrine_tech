import styles from "./Home.module.css";
import HeroSection from "../../componentes/HeroSection/HeroSection";
import Highlights from "../../componentes/Highlights/Highlights";
import CoursesHighlights from "../../componentes/CoursesHighlights/CoursesHighlights";
import HowItWorks from "../../componentes/HowItWorks/HowItWorks";
import AboutSection from "../../componentes/AboutSection/AboutSection";
import CTA from "../../componentes/CTA/CTA";
import { useNavigate } from "react-router-dom";
import { FiFolder,FiTrendingUp,FiBriefcase, FiTarget } from "react-icons/fi";

export default function Home() {
    const navigate = useNavigate();

  const benefits = [
    { label: "Portfólio real para os alunos", icon: <FiFolder /> },
    { label: "Mais engajamento nas disciplinas", icon: <FiTrendingUp /> },
    { label: "Aproximação com o mercado", icon: <FiBriefcase /> },
    { label: "Valorização dos projetos acadêmicos", icon: <FiTarget /> }
  ];

  function handleLogin() {
    navigate("/cadastro");
  }
  return (
    <>
      <HeroSection />

      <div className={styles.content}>
        <Highlights />
        <CoursesHighlights />
        <HowItWorks />
      </div>
            <AboutSection
              title="Por que usar o"
              highlight="VitrineTech?"
              list={benefits}
            />
      
            <CTA
              title="Faça parte da VitrineTech"
              buttonText="Começar agora"
              onClick={handleLogin}
            />
    </>
  );
}
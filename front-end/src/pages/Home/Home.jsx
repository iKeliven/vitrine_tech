import styles from "./Home.module.css";
import HeroSection from "../../componentes/HeroSection/HeroSection";
import Highlights from "../../componentes/Highlights/Highlights";
import CoursesHighlights from "../../componentes/CoursesHighlights/CoursesHighlights";
import HowItWorks from "../../componentes/HowItWorks/HowItWorks";

export default function Home() {
  return (
    <>
      <HeroSection />

      <div className={styles.content}>
        <Highlights />
        <CoursesHighlights />
        <HowItWorks />
      </div>
    </>
  );
}
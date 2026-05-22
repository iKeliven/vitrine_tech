import styles from "./PageLayout.module.css";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import HeaderSection from "../componentes/HeaderSection/HeaderSection";
import Subtitle from "../componentes/Subtitle/Subtitle";
import Input from "../componentes/Input/Input";
import AboutSection from "../componentes/AboutSection/AboutSection";
import CTA from "../componentes/CTA/CTA";
import HeroContent from "../componentes/HeroContent/HeroContent";

import {
  FiSearch,
  FiFolder,
  FiTrendingUp,
  FiBriefcase,
  FiTarget
} from "react-icons/fi";

export default function PageLayout({
  title,
  subtitle,
  placeholder = "Buscar...",
  data = [],
  renderItem,
  heroTitle,
  heroDescription,
}) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const benefits = [
    { label: "Portfólio real para os alunos", icon: <FiFolder /> },
    { label: "Mais engajamento nas disciplinas", icon: <FiTrendingUp /> },
    { label: "Aproximação com o mercado", icon: <FiBriefcase /> },
    { label: "Valorização dos projetos acadêmicos", icon: <FiTarget /> }
  ];

  function handleLogin() {
    navigate("/login");
  }

  const filtered = data.filter((item) => {
    const query = search.toLowerCase();

    return Object.values(item).some((value) =>
      typeof value === "string" &&
      value.toLowerCase().includes(query)
    );
  });

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.overlay}></div>

        <div className={styles.heroContent}>
          <HeroContent
            layout="center"
            title={heroTitle}
            subtitle={heroDescription}
          />
        </div>
      </section>

      <div className={styles.page}>
        <div className={styles.header}>
          <div className={styles.content}>
            <HeaderSection
              title={title}
              showButton={false}
            />

            <Subtitle>
              {subtitle}
            </Subtitle>
          </div>

          <div className={styles.filters}>
            <Input
              placeholder={placeholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              rightIcon={<FiSearch />}
              background="var(--color-light)"
            />
          </div>
        </div>

        <div className={styles.grid}>
          {filtered.length === 0 && search ? (
            <div className={styles.empty}>
              <p>
                Nenhum resultado para "<strong>{search}</strong>"
              </p>
            </div>
          ) : (
            filtered.map((item, i) => (
              <motion.div
                key={item.id || i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {renderItem(item, i)}
              </motion.div>
            ))
          )}
        </div>
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
import styles from "./HowItWorks.module.css";
import Title from "../Title/Title";
import { motion } from "framer-motion";
import HeaderSection from "../HeaderSection/HeaderSection";

const steps = [
  {
    number: "1",
    title: "Aprenda nas aulas",
    desc: "Cursos com teoria e prática com professores especializados."
  },
  {
    number: "2",
    title: "Desenvolva seu projeto",
    desc: "Coloque em prática criando projetos reais."
  },
  {
    number: "3",
    title: "Publique na vitrine",
    desc: "Compartilhe com a comunidade e fortaleça seu portfólio."
  }
];

export default function HowItWorks() {
  return (
    <section className={styles.section}>

      <HeaderSection
        title="Como"
        highlight="funciona?"
        showButton={false}
      />
      <div className={styles.steps}>
        {steps.map((step, i) => (
          <motion.div
            key={step.number}
            className={styles.step}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, amount: 0.25 }}
            whileHover={{ y: -4 }} // 👈 efeito leve só no card
          >

            <div className={styles.number}>
              {step.number}
            </div>

            <div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>

          </motion.div>
        ))}
      </div>

    </section>
  );
}
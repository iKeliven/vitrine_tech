import { motion } from "framer-motion";
import styles from "./CTA.module.css";
import Title from "../Title/Title";
import Button from "../Button/Button";
import { FiArrowRight } from "react-icons/fi";

export default function CTA({ title, buttonText = "Começar agora", buttonIcon = <FiArrowRight />, onClick }) {
  return (
    <motion.section
      className={styles.cta}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      <Title size="md">{title}</Title>
      <Button size="lg" rightIcon={buttonIcon} onClick={onClick}>
        {buttonText}
      </Button>
    </motion.section>
  );
}

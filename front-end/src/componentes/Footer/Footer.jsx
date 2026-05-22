import { motion } from "framer-motion";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <motion.footer
      className={styles.footer}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      <p>© 2026 VitrineTech - Projetos reais</p>
    </motion.footer>
  );
}
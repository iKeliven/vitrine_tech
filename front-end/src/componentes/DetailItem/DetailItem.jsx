import { motion } from "framer-motion";
import Subtitle from "../Subtitle/Subtitle";
import Title from "../Title/Title";
import styles from "./DetailItem.module.css";

export default function DetailItem({ label, value, icon }) {
  return (
    <motion.div
      className={styles.item}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {icon && <div className={styles.icon}>{icon}</div>}
      <div className={styles.content}>
        <Subtitle size="md">{label}</Subtitle>
        <Title size="bg">{value}</Title>
      </div>
    </motion.div>
  );
}

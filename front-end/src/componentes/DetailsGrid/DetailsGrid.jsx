import { motion } from "framer-motion";
import styles from "./DetailsGrid.module.css";
import DetailItem from "../DetailItem/DetailItem";

export default function DetailsGrid({ details = [] }) {
  return (
    <motion.div
      className={styles.grid}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      {details.map((detail, index) => (
        <DetailItem
          key={index}
          label={detail.label}
          value={detail.value}
          icon={detail.icon}
        />
      ))}
    </motion.div>
  );
}

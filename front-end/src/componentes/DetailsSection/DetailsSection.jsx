import { motion } from "framer-motion";
import styles from "./DetailsSection.module.css";
import DetailsGrid from "../DetailsGrid/DetailsGrid";

export default function DetailsSection({ details, content }) {
  return (
    <motion.section
      className={styles.detailsSection}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      <DetailsGrid details={details} />
    </motion.section>

  )
}
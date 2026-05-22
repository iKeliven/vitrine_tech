import { motion } from "framer-motion";
import styles from "./AboutSection.module.css";
import Title from "../Title/Title";
import { FiCheckCircle } from "react-icons/fi";

export default function AboutSection({ title, highlight, children, list, itemIcon }) {
  const defaultIcon = <FiCheckCircle />;

  return (
    <motion.section
      className={styles.section}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      {title && (
        <Title size="md" highlight={highlight}>
          {title}
        </Title>
      )}

      {children && <div className={styles.text}>{children}</div>}

      {list && (
        <ul className={styles.list}>
          {list.map((item, index) => {
            const icon = item.icon || itemIcon || defaultIcon;
            const label = typeof item === "string" ? item : item.label;

            return (
              <motion.li
                key={index}
                className={styles.listItem}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className={styles.icon}>{icon}</span>
                <span>{label}</span>
              </motion.li>
            );
          })}
        </ul>
      )}
    </motion.section>
  );
}

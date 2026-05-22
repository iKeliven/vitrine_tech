import { motion } from "framer-motion";
import styles from "./HeaderSection.module.css";
import Title from "../Title/Title";
import Button from "../Button/Button";
import { FiArrowRight } from "react-icons/fi";

export default function HeaderSection({
  title,
  highlight,
  buttonText,
  onClick,
  showButton = true
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className={styles.header}>
        
        <Title size="md" highlight={highlight}>
          {title}
        </Title>

        {showButton && (
          <Button
            variant="ghost"
            size="sm"
            rightIcon={<FiArrowRight />}
            onClick={onClick}
          >
            {buttonText}
          </Button>
        )}

      </div>
    </motion.div>
  );
}
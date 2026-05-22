import { motion } from "framer-motion";
import styles from "./HeroContent.module.css";
import Title from "../Title/Title";
import Subtitle from "../Subtitle/Subtitle";
import Button from "../Button/Button";

export default function HeroContent({
  layout = 'center',
  image,
  title,
  subtitle,
  buttonText,
  buttonIcon,
  onButtonClick
}) {
  const flexClass = layout === 'start' ? styles.start : styles.center;

  return (
    <motion.div
      className={`${styles.heroContent} ${flexClass}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {image && (
        <motion.img
          src={image}
          alt="Hero"
          className={styles.image}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        />
      )}
      <div className={styles.textContent}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <Title size="lg">{title}</Title>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <Subtitle variant="light" align={layout === 'center' ? 'center' : 'left'} size="lg">
            {subtitle}
          </Subtitle>
        </motion.div>
        <motion.div
          className={styles.actions}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <Button size="bg" rightIcon={buttonIcon} onClick={onButtonClick}>
            {buttonText}
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
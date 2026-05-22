import styles from './Cards.module.css';
import { motion } from 'framer-motion';
import Title from '../Title/Title';
import Subtitle from '../Subtitle/Subtitle';
import Badge from '../Badge/Badge';

export default function CourseCard({
  title,
  description,
  logo,
  techs = [],
  icon,
  duration,
  onClick
}) {
  return (
    <motion.div
      className={styles.card}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {icon && <div className={styles.icon}>{icon}</div>}
      <div className={styles.content}>
        
        <div className={styles.info}>
          <Title size="sm">{title}</Title>
          {duration && (
            <Subtitle size="sm" variant="primary">
              {duration}
            </Subtitle>
          )}
        </div>
        <p className={styles.desc}>{description}</p>
        <div className={styles.footer}>
          <span className={styles.link}>
            Ver Curso →
          </span>{/* TECHS */}
          {techs.length > 0 && (
            <div className={styles.techs}>
              {techs.map((tech) => (
                <Badge key={tech} text={tech} />
              ))}
            </div>
          )}

        </div>

      </div>





    </motion.div>
  );
}
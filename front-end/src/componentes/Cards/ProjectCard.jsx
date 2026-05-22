import { motion } from 'framer-motion';
import Title from '../Title/Title';
import Subtitle from '../Subtitle/Subtitle';
import Button from '../Button/Button';
import Badge from '../Badge/Badge';
import styles from './Cards.module.css'


export default function ProjectCard({
  title,
  student,
  description,
  techs = [],
  avatar,
  email,
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
      <div className={styles.image}></div>
      <div className={styles.content}>
        <div className={styles.header}>
          <Title size="sm" color="dark">
            {title}
          </Title>
          <p className={styles.desc}>{description}</p>
        </div>

        {/* 👇 STUDENT COM AVATAR */}
        <div className={styles.student}>
          <img src={avatar} alt={student} className={styles.avatar} />
          <div className={styles.header}>
              <Subtitle size='md'>{student}</Subtitle>
              <Subtitle size='sm' variant='secondary'>{email}</Subtitle>
          </div>
          
        </div>

        <div className={styles.footer}>
          <Button size="sm">Ver projeto</Button>
          <div className={styles.techs}>
            {techs.map((tech) => (
              <Badge key={tech} text={tech}>
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
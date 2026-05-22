import { motion } from 'framer-motion';
import Title from '../Title/Title';
import Subtitle from '../Subtitle/Subtitle';
import Button from '../Button/Button';
import Badge from '../Badge/Badge';
import styles from './Cards.module.css'

export default function StudentCard({
  name,
  email,
  course,
  turma,
  avatar,
  projectCount,
  points,
  rank,
  onClick
}) {

    const level = Math.floor(points / 200) + 1;

    const details = [
        {
            label: "XP",
            value: points,
            size: "sm"
        },
        {
            label: "Projetos",
            value: projectCount,
            size: "sm"
        },
        {
            label: "Nível",
            value: level,
            size: "sm"
        }
    ];

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

            {/* 🏆 RANK */}
            <div className={styles.rank}>#{rank}</div>

            {/* 👤 AVATAR */}
            <div className={styles.image}>
                {avatar ? (
                    <img src={avatar} alt={name} className={styles.avatar} />
                ) : (
                    <div className={styles.avatarPlaceholder}>
                        <span>{name.charAt(0).toUpperCase()}</span>
                    </div>
                )}
            </div>

            <div className={styles.content}>
                <div className={styles.header}>
                <Title size='sm'>{name}</Title>
                <p className={styles.email}>{email}</p>
                </div>
                <div className={styles.info}>
                    {course && <Subtitle variant='primary'>{course}</Subtitle>}
                    {turma && <Badge size='sm' text={turma}></Badge>}
                </div>



                <div className={styles.stats}>
                    {details.map((item, i) => (
                        <div key={i} className={styles.stat}>
                            <span className={styles.value}>{item.value}</span>
                            <span className={styles.label}>{item.label}</span>
                        </div>
                    ))}
                </div>
                <Button size='md'>Ver Perfil</Button>
            </div>
        </motion.div>
    );
}
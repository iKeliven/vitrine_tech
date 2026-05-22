import Button from '../Button/Button';
import Subtitle from '../Subtitle/Subtitle';
import Title from '../Title/Title';
import { motion } from 'framer-motion';
import Badge from '../Badge/Badge';
import styles from './Cards.module.css'

export default function CompanyCard({ name, category, description, website, verified, logo, onClick }) {
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
      <div className={styles.image}>
        {logo ? (
          <img src={logo} alt={name} className={styles.logo} />
        ) : (
          <div className={styles.logoPlaceholder}>
            <span>{name.charAt(0).toUpperCase()}</span>
          </div>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.info}>
          <Title size="sm" color="dark">
            {name}
          </Title>
          {category && (
            <Subtitle variant='primary' size='sm' align='left' weight="bold" >{category}</Subtitle>
          )}
        </div>

        <p className={styles.desc}>
          {description || 'Empresa apoiadora de projetos de tecnologia'}
        </p>
        <div className={styles.footer}>
          <Button
            target="_blank"
            size='sm'
            rel="noopener noreferrer"
          >
            Visitar site
          </Button>
          {verified && (
            <Subtitle variant='success' size='sm' align='left' weight="bold" >✓ Verificada</Subtitle>
          )}
        </div>

      </div>


    </motion.div>
  );
}

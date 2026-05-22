import styles from './Badge.module.css';

export default function Badge({ text, variant = 'secondary', size = 'md' }) {
  return (
    <span className={`${styles.badge} ${styles[variant]} ${styles[size]}`}>
      {text}
    </span>
  );
}
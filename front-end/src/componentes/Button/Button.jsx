import { motion } from "framer-motion";
import styles from "./Button.module.css";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  leftIcon,
  rightIcon,
  loading = false,
  disabled = false,
  type = "button",
  href,
  target,
  rel,
  onClick,
  className = ""
}) {
  const Component = href ? motion.a : motion.button;

  return (
    <Component
      type={href ? undefined : type}
      href={href}
      target={href ? target : undefined}
      rel={href ? rel : undefined}
      className={`
        ${styles.button}
        ${styles[variant]}
        ${styles[size]}
        ${loading ? styles.loading : ""}
        ${className}
      `}
      onClick={onClick}
      disabled={!href && (disabled || loading)}
      whileHover={!disabled && !loading ? { scale: 1.02 } : undefined}
      whileTap={!disabled && !loading ? { scale: 0.98 } : undefined}
      transition={{ duration: 0.2 }}
    >
      {loading && <span className={styles.spinner}></span>}

      {!loading && leftIcon && (
        <span className={styles.icon}>{leftIcon}</span>
      )}

      <span className={styles.label}>{children}</span>

      {!loading && rightIcon && (
        <span className={styles.icon}>{rightIcon}</span>
      )}
    </Component>
  );
}
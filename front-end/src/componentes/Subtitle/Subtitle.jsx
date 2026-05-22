import styles from "./Subtitle.module.css";

export default function Subtitle({
  children,
  size = "md",
  variant = "dark",
  align = "left",
  className = "",
  weight = ""
}) {
  return (
    <p
      className={`
        ${styles.subtitle}
        ${styles[size]}
        ${styles[variant]}
        ${styles[align]}
        ${styles[weight]}
        ${className}
      `}
    >
      {children}
    </p>
  );
}
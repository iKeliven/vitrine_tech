import styles from "./Title.module.css";

export default function Title({
  children,
  color = "dark",
  size = "md",
  highlight
}) {
  return (
    <h2 className={`${styles.title} ${styles[size]}`}>
      {children}{" "}
      {highlight && <span>{highlight}</span>}
    </h2>
  );
}
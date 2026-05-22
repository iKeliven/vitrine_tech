import styles from "./Input.module.css";

export default function Input({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  error,
  rightIcon,
  background
}) {
  return (
    <div className={styles.field}>
      
      {label && <label>{label}</label>}

      <div className={styles.inputWrapper}>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={error ? styles.error : ""}
          style={background ? { background } : {}}
        />
        {rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
      </div>

      {error && <span className={styles.errorText}>{error}</span>}

    </div>
  );
}
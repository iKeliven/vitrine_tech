import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import styles from "./Dropdown.module.css";

export default function Dropdown({ 
  label, 
  options = [], 
  value = "",
  onChange,
  name,
  placeholder
}) {
  const [open, setOpen] = useState(false);

  const handleSelect = (option) => {
    if (onChange) {
      onChange({
        target: {
          name: name,
          value: option
        }
      });
    }
    setOpen(false);
  };

  return (
    <div className={styles.field}>
      {label && <label>{label}</label>}
      
      <div className={styles.dropdown}>
        <button
          type="button"
          className={styles.trigger}
          onClick={() => setOpen(!open)}
        >
          <span>{value || placeholder || "Selecionar..."}</span>
          <FiChevronDown className={`${styles.chevron} ${open ? styles.open : ""}`} />
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              className={styles.menu}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {options.map((item, index) => (
                <motion.div 
                  key={index} 
                  className={styles.item}
                  onClick={() => handleSelect(item)}
                  whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                  transition={{ duration: 0.15 }}
                >
                  {item}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
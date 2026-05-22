import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./Header.module.css";
import Button from "../Button/Button";
import logo from "../../assets/logotipo-light.png";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  const handleLogin = () => {
    navigate('/login');
  };

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.header
      className={`${styles.header} ${scrolled || !isHome ? styles.scrolled : ""}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={styles.container}>

        <div className={styles.logo}>
          <NavLink to="/">
            <img src={logo} alt="Logotipo" />
          </NavLink>
        </div>

        <button
          type="button"
          className={styles.menuButton}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
        >
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </button>

        <nav className={`${styles.nav} ${menuOpen ? styles.open : ""}`}>
          <NavLink to="/" end className={styles.link} onClick={closeMenu}>
            Início
          </NavLink>

          <NavLink to="/projetos" className={styles.link} onClick={closeMenu}>
            Projetos
          </NavLink>

          <NavLink to="/cursos" className={styles.link} onClick={closeMenu}>
            Cursos
          </NavLink>
          <NavLink to="/alunos" className={styles.link} onClick={closeMenu}>
            Alunos
          </NavLink>
          <NavLink to="/empresas" className={styles.link} onClick={closeMenu}>
            Empresas
          </NavLink>

          <NavLink to="/sobre" className={styles.link} onClick={closeMenu}>
            Sobre
          </NavLink>

          <div className={styles.actions}>
            <Button variant="light" onClick={handleLogin}>
              Entrar
            </Button>
          </div>
        </nav>


      </div>
    </motion.header>
  );
}
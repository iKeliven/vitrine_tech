import Header from "../componentes/Header/Header";
import Footer from "../componentes/Footer/Footer";
import styles from "./MainLayout.module.css";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className={styles.wrapper}>
      
      <Header />

      <main className={styles.main}>
        <div className={styles.container}>
          <Outlet />
        </div>
      </main>

      <Footer />

    </div>
  );
}
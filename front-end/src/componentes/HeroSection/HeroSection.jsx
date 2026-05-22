import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import styles from "./HeroSection.module.css";
import Button from "../Button/Button";
import Title from "../Title/Title";
import Subtitle from "../Subtitle/Subtitle";
import { FiArrowRight, FiBookOpen } from "react-icons/fi";

const ease = [0.22, 1, 0.36, 1];

const container = {
    hidden: {},
    show: {
        transition: {
            delayChildren: 0.2,
            staggerChildren: 0.2
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 30 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease
        }
    }
};

export default function HeroSection() {
    const navigate = useNavigate();

    return (
        <section className={styles.hero}>
            <motion.div
                className={styles.container}
                variants={container}
                initial="hidden"
                animate="show"
            >
                <div className={styles.content}>

                    <motion.div variants={item}>
                        <Title size="lg" highlight="Resultados reais">
                            Projetos reais. Alunos reais.
                        </Title>
                    </motion.div>

                    <motion.p variants={item}>
                        <Subtitle size="lg">
                            Explore os projetos desenvolvidos pelos alunos do SENAI.
                        </Subtitle>
                    </motion.p>

                    <motion.div variants={item} className={styles.actions}>
                        <motion.div variants={item} className={styles.actions}>
                            <Button
                                size="lg"
                                rightIcon={<FiArrowRight />}
                                onClick={() => navigate("/projetos")}
                            >
                                Ver projetos
                            </Button>

                            <Button
                                size="lg"
                                variant="secondary"
                                rightIcon={<FiBookOpen />}
                                onClick={() => navigate("/cursos")}
                            >
                                Ver cursos
                            </Button>
                        </motion.div>
                    </motion.div>

                </div>


            </motion.div>
        </section>
    );
}
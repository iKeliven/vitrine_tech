import styles from "./AuthPage.module.css";
import { useState } from "react";
import Title from "../../componentes/Title/Title";
import Button from "../../componentes/Button/Button";
import Input from "../../componentes/Input/Input";
import Dropdown from "../../componentes/Dropdown/Dropdown";
import { FiArrowRight } from "react-icons/fi";
import Subtitle from "../../componentes/Subtitle/Subtitle";
import Logo from "../../assets/logotipo.png";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

const CURSOS = [
    "Desenvolvimento de Sistemas",
    "Informática Para Internet",
    "Jogos Digitais",
    "Internet das Coisas",
    "Multimídia"
];

export default function SignupPage() {
    const [form, setForm] = useState({
        name: "",
        lastName: "",
        email: "",
        cpf: "",
        course: "",
        turma: "",
        matricula: "",
        password: "",
        confirmPassword: "",
        avatar: null
    });

    const [preview, setPreview] = useState(null);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setForm({ ...form, avatar: file });

            const url = URL.createObjectURL(file);
            setPreview(url);
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            alert("As senhas não coincidem");
            return;
        }

        console.log(form);
    };

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>

                <NavLink to="/" className={styles.link}>
                    <img src={Logo} alt="Logotipo" />
                </NavLink>

                <Title size="sm">
                    Criar conta
                </Title>

                <Subtitle size="md" variant="dark" align="center">
                    Cadastre-se para acessar a plataforma.
                </Subtitle>

                <div className={styles.switch}>
                    <div className={styles.rowTop}>
                        <div className={styles.avatarUpload}>
                            <label
                                htmlFor="avatar"
                                title="Cadastrar imagem"
                                className={styles.avatarLabel}
                            >
                                {preview ? (
                                    <img src={preview} alt="preview" title="Cadastrar imagem" />
                                ) : (
                                    <span>+</span>
                                )}
                            </label>



                            <input
                                id="avatar"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </div>
                        <div className={styles.inputs}>
                            <Input
                                label="Nome"
                                name="name"
                                placeholder="Seu nome"
                                value={form.name}
                                onChange={handleChange}
                            />

                            <Input
                                label="Sobrenome"
                                name="lastName"
                                placeholder="Seu sobrenome"
                                value={form.lastName}
                                onChange={handleChange}
                            />
                        </div>



                    </div>
                    <Input
                        label="CPF"
                        name="cpf"
                        placeholder="000.000.000-00"
                        value={form.cpf}
                        onChange={handleChange}
                    />

                    <Input
                        label="Matrícula"
                        name="matricula"
                        placeholder="Sua matrícula"
                        value={form.matricula}
                        onChange={handleChange}
                    />

                    <Dropdown
                        label="Curso"
                        name="course"
                        placeholder="Selecione um curso"
                        options={CURSOS}
                        value={form.course}
                        onChange={handleChange}
                    />

                    <Input
                        label="Turma"
                        name="turma"
                        placeholder="Ex: 2024/1"
                        value={form.turma}
                        onChange={handleChange}
                    />

                    <Button
                        type="submit"
                        size="md"
                        rightIcon={<FiArrowRight />}
                    >
                        Criar conta
                    </Button>

                </div>

                <Link to="/login" className={styles.link}>
                    <span></span>
                    <p>Já possui uma conta? Entrar</p>
                    <span></span>
                </Link>

            </form>
        </div>
    );
}
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import Input from '../../componentes/Input/Input';
import Button from '../../componentes/Button/Button';
import Dropdown from '../../componentes/Dropdown/Dropdown';
import Title from '../../componentes/Title/Title';
import Subtitle from '../../componentes/Subtitle/Subtitle';

import { FiArrowRight, FiFolder, FiAward, FiTrendingUp, FiUser } from 'react-icons/fi';

import styles from "./AuthPage.module.css";
import Logo from '../../assets/logotipo.png';

import api from "../../services/api";

const CURSOS = [
  "Desenvolvimento de Sistemas",
  "Informática Para Internet",
  "Jogos Digitais",
  "Internet das Coisas",
  "Multimídia"
];

export default function SignupPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    cpf: '',
    matricula: '',
    course: '',
    turma: '',
    password: '',
    confirmPassword: '',
    avatar: ''
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const url = URL.createObjectURL(file);

      setPreview(url);

      setFormData((prev) => ({
        ...prev,
        avatar: url
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError('');

    try {
      if (
        !formData.name ||
        !formData.email ||
        !formData.password
      ) {
        setError('Nome, email e senha são obrigatórios');
        setLoading(false);
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError('As senhas não coincidem');
        setLoading(false);
        return;
      }

      await api.post("/users/register", {
        name: formData.name,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        cpf: formData.cpf,
        matricula: formData.matricula,
        course: formData.course,
        turma: formData.turma,
        avatar: formData.avatar
      });

      setSuccess(true);

      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err) {
      setError(
        err.response?.data?.error ||
        'Erro ao cadastrar aluno'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>

      <div className={styles.formSection}>

        <div className={styles.header}>

          <NavLink to="/">
            <img src={Logo} alt="Logotipo" />
          </NavLink>

          <Title size="md">
            Criar conta de aluno
          </Title>

          <Subtitle size="md">
            Publique seus projetos, acompanhe sua evolução e fortaleça seu portfólio
          </Subtitle>

        </div>

        {success ? (

          <div className={styles.successMessage}>

            <div className={styles.successIcon}>
              ✓
            </div>

            <Subtitle
              variant="success"
              weight="bold"
            >
              Cadastro realizado com sucesso!
            </Subtitle>

            <p>
              Você será redirecionado para o login em breve...
            </p>

          </div>

        ) : (

          <form
            onSubmit={handleSubmit}
            className={styles.form}
          >

            {error && (
              <div className={styles.error}>
                {error}
              </div>
            )}

            <div className={styles.profileRow}>
              <div className={styles.avatarUpload}>
                <label
                  htmlFor="avatar"
                  title="Cadastrar imagem"
                  className={styles.avatarLabel}
                >
                  {preview ? (
                    <img src={preview} alt="Preview do avatar" />
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

              <div className={styles.profileInputs}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Nome *</label>
                    <Input
                      name="name"
                      placeholder="Seu nome"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Sobrenome</label>

                    <Input
                      name="lastName"
                      placeholder="Seu sobrenome"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.formRow}>

              <div className={styles.formGroup}>
                <label>Email *</label>

                <Input
                  name="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>CPF</label>

                <Input
                  name="cpf"
                  placeholder="000.000.000-00"
                  value={formData.cpf}
                  onChange={handleChange}
                />
              </div>

            </div>

            <div className={styles.formRow}>

              <div className={styles.formGroup}>
                <label>Matrícula</label>

                <Input
                  name="matricula"
                  placeholder="Sua matrícula"
                  value={formData.matricula}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Turma</label>

                <Input
                  name="turma"
                  placeholder="Ex: 2024/1"
                  value={formData.turma}
                  onChange={handleChange}
                />
              </div>

            </div>

            <div className={styles.formGroup}>
              <label>Curso</label>

              <Dropdown
                name="course"
                placeholder="Selecione um curso"
                options={CURSOS}
                value={formData.course}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formRow}>

              <div className={styles.formGroup}>
                <label>Senha *</label>

                <Input
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Confirmar senha *</label>

                <Input
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <div className={styles.termsBox}>
              <label htmlFor="terms" className={styles.termsLabel}>
                <input
                  type="checkbox"
                  id="terms"
                  required
                />
              </label>
              <p>
                Concordo com os{" "}
                <a href="/politicas/aluno" target="_blank">
                  Termos de Serviço</a>
                {" "}e a{" "}
                <a href="/politicas/aluno" target="_blank">
                  Política de Privacidade
                </a>
              </p>

            </div>

            <Button
              rightIcon={<FiArrowRight />}
              type="submit"
              label={
                loading
                  ? 'Criando conta...'
                  : 'Criar conta'
              }
              disabled={loading}
            />

            <Link
              to="/login"
              className={styles.link}
            >
              <span></span>

              <p>
                Já possui uma conta? Entrar
              </p>

              <span></span>
            </Link>

          </form>

        )}

      </div>

      <div className={styles.infoSection}>

        <div className={styles.header}>

          <Title
            size="md"
            color="primary"
          >
            Painel do Aluno
          </Title>

          <Subtitle
            size="md"
            variant="white"
          >
            Transforme seus projetos acadêmicos em portfólio profissional
          </Subtitle>

        </div>

        <div className={styles.infoContent}>

          <div className={styles.features}>

            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <FiFolder />
              </div>

              <Subtitle
                size="md"
                weight="bold"
                variant="white"
              >
                Publique Projetos
              </Subtitle>

              <p>
                Cadastre seus projetos, tecnologias utilizadas, imagens e links importantes.
              </p>
            </div>

            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <FiAward />
              </div>

              <Subtitle
                size="md"
                weight="bold"
                variant="white"
              >
                Ganhe XP
              </Subtitle>

              <p>
                Evolua na plataforma com pontos, níveis, recompensas e conquistas.
              </p>
            </div>

            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <FiTrendingUp />
              </div>

              <Subtitle
                size="md"
                weight="bold"
                variant="white"
              >
                Ganhe Visibilidade
              </Subtitle>

              <p>
                Mostre seu talento para professores, colegas e empresas apoiadoras.
              </p>
            </div>

            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <FiUser />
              </div>

              <Subtitle
                size="md"
                weight="bold"
                variant="white"
              >
                Construa seu Perfil
              </Subtitle>

              <p>
                Organize sua trajetória, seus projetos e suas habilidades em um único ambiente.
              </p>
            </div>

          </div>

          <div className={styles.process}>

            <Title size="md">
              Como funciona?
            </Title>

            <ol>
              <li>Crie sua conta de aluno</li>
              <li>Cadastre seus projetos acadêmicos</li>
              <li>Ganhe XP e acompanhe sua evolução</li>
              <li>Monte um portfólio real</li>
              <li>Conecte-se com oportunidades</li>
            </ol>

          </div>

        </div>

      </div>

    </div>
  );
}
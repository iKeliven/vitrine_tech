import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import Input from '../../componentes/Input/Input';
import Button from '../../componentes/Button/Button';
import Dropdown from '../../componentes/Dropdown/Dropdown';
import Title from '../../componentes/Title/Title';
import Subtitle from '../../componentes/Subtitle/Subtitle';

import {
  FiArrowRight,
  FiUsers,
  FiTrendingUp,
  FiEye,
  FiLink
} from 'react-icons/fi';

import styles from "./AuthPage.module.css";
import Logo from '../../assets/logotipo.png';

import api from "../../services/api";

const CATEGORIAS = [
  "Desenvolvimento de Sistemas",
  "Informática Para Internet",
  "Jogos Digitais",
  "Internet das Coisas",
  "Multimídia"
];

export default function CompanySignupPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    category: '',
    logo: null
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

  const handleLogoChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setPreview(URL.createObjectURL(file));

      setFormData((prev) => ({
        ...prev,
        logo: file
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
        !formData.password ||
        !formData.confirmPassword
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

      const data = new FormData();

      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("category", formData.category);

      if (formData.logo) {
        data.append("logo", formData.logo);
      }

      await api.post(
        "/company-auth/register",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      setSuccess(true);

      setTimeout(() => {
        navigate('/empresa-login');
      }, 2000);

    } catch (err) {
      setError(
        err.response?.data?.error ||
        'Erro ao cadastrar empresa'
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
            Seja um Apoiador
          </Title>

          <Subtitle size="md">
            Crie sua conta para investir em talentos e acompanhar projetos estudantis
          </Subtitle>
        </div>

        {success ? (
          <div className={styles.successMessage}>
            <div className={styles.successIcon}>
              ✓
            </div>

            <Subtitle
              variant='success'
              weight='bold'
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
                  htmlFor="logo"
                  title="Cadastrar logo da empresa"
                  className={styles.avatarLabel}
                >
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview do logo"
                    />
                  ) : (
                    <span>+</span>
                  )}
                </label>

                <input
                  id="logo"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                />
              </div>

              <div className={styles.profileInputs}>
                <div className={styles.formGroup}>
                  <label>
                    Nome da Empresa *
                  </label>

                  <Input
                    name="name"
                    placeholder="Ex: Google Brasil"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>


              </div>

            </div>
            <div className={styles.formGroup}>
              <label>
                Email Corporativo *
              </label>

              <Input
                name="email"
                type="email"
                placeholder="contato@empresa.com.br"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>
                Categoria
              </label>

              <Dropdown
                name="category"
                placeholder="Selecione uma categoria"
                options={CATEGORIAS}
                value={formData.category}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formRow}>

              <div className={styles.formGroup}>
                <label>
                  Senha *
                </label>

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
                <label>
                  Confirmar senha *
                </label>

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
                <a href="/politicas/empresa" target="_blank"> Termos de Serviçoo</a>
                {" "}e a{" "}
                <a href="/politicas/empresa" target="_blank">Política de Privacidade</a>
              </p>

            </div>


            <Button
              rightIcon={<FiArrowRight />}
              type="submit"
              label={
                loading
                  ? 'Cadastrando...'
                  : 'Registrar Empresa'
              }
              disabled={loading}
            />

            <Link
              to="/empresa-login"
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
          <Title>
            Por que ser um apoiador?
          </Title>
        </div>

        <div className={styles.features}>

          <div className={styles.feature}>
            <div className={styles.featureIcon}>
              <FiUsers />
            </div>

            <Subtitle size='md' weight='bold' variant='white'>
              Encontre Talentos
            </Subtitle>

            <p>
              Acesso direto a uma comunidade de alunos qualificados em tecnologia
            </p>
          </div>

          <div className={styles.feature}>
            <div className={styles.featureIcon}>
              <FiTrendingUp />
            </div>

            <Subtitle size='md' weight='bold' variant='white'>
              Retorno Real
            </Subtitle>

            <p>
              Invista em projetos promissores com potencial de crescimento
            </p>
          </div>

          <div className={styles.feature}>
            <div className={styles.featureIcon}>
              <FiEye />
            </div>

            <Subtitle size='md' weight='bold' variant='white'>
              Visibilidade
            </Subtitle>

            <p>
              Seja reconhecido como empresa apoiadora de inovação
            </p>
          </div>

          <div className={styles.feature}>
            <div className={styles.featureIcon}>
              <FiLink />
            </div>

            <Subtitle size='md' weight='bold' variant='white'>
              Parcerias Estratégicas
            </Subtitle>

            <p>
              Crie relacionamentos duradouros com talento emergente
            </p>
          </div>

        </div>

        <div className={styles.process}>
          <Title size="md">
            Como funciona?
          </Title>

          <ol>
            <li>Cadastre sua empresa na plataforma</li>
            <li>Navegue pelos projetos e talentos disponíveis</li>
            <li>Escolha os projetos para patrocinar</li>
            <li>Acompanhe o desenvolvimento e progresso</li>
            <li>Estabeleça parcerias duradouras</li>
          </ol>
        </div>

      </div>

    </div>
  );
}
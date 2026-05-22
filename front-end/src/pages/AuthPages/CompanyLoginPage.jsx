import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../componentes/Input/Input';
import Button from '../../componentes/Button/Button';
import styles from "./AuthPage.module.css";
import Title from '../../componentes/Title/Title';
import Subtitle from '../../componentes/Subtitle/Subtitle';
import { FiArrowRight, FiBarChart2, FiUsers, FiBriefcase, FiTrendingUp } from 'react-icons/fi';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../../assets/logotipo.png'



export default function CompanyLoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!formData.email || !formData.password) {
        setError('Email e senha são obrigatórios');
        setLoading(false);
        return;
      }

      // Chamada real seria aqui:
      // const response = await fetch('/api/company-auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      // const data = await response.json();
      // localStorage.setItem('companyToken', data.token);
      // navigate('/dashboard-empresa');

      // Mock - sucesso após 2 segundos
      await new Promise(resolve => setTimeout(resolve, 2000));

      localStorage.setItem('companyToken', 'mock-token-' + Date.now());
      localStorage.setItem('companyEmail', formData.email);
      navigate('/dashboard-empresa');
    } catch (err) {
      setError('Erro ao fazer login');
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
          <Title size="md">Login Apoiador</Title>
          <Subtitle size="md">Acesse sua conta para gerenciar patrocínios</Subtitle>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.formGroup}>
            <label htmlFor="email">Email Corporativo</label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="contato@empresa.com.br"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Senha</label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.options}>
            <label className={styles.checkbox}>
              <input type="checkbox" defaultChecked />
              Lembrar de mim
            </label>
            <a href="#forgot" className={styles.link}>
              Esqueceu a senha?
            </a>
          </div>

          <Button
            children={loading ? 'Conectando...' : 'Entrar'}
            onClick={handleSubmit}
            disabled={loading}
            size="md"
            rightIcon={<FiArrowRight />}
          />
        </form>



        <Link to="/cadastro-empresa" className={styles.link}>
          <span></span>
          <p>Não tem uma conta? Cadastre-se</p>
          <span></span>
        </Link>
      </div>

      <div className={styles.infoSection}>
        <div className={styles.header}>
          <Title size='md' color="primary">Painel da Empresa</Title>
          <Subtitle size='md' variant='white'>Gerencie seus patrocínios e invista em talentos</Subtitle>
        </div>
        <div className={styles.infoContent}>
          <div className={styles.features}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}><FiBarChart2 /></div>
                <Subtitle size='md' weight='bold' variant='white'>Dashboard Completo</Subtitle>
                <p>Acompanhe todos os seus projetos patrocinados em tempo real</p>
              
            </div>

            <div className={styles.feature}>
              <div className={styles.featureIcon}><FiUsers /></div>
                <Subtitle size='md' weight='bold' variant='white'>Encontre Talentos</Subtitle>
                <p>Navegue entre os melhores projetos e alunos da comunidade</p>
            </div>

            <div className={styles.feature}>
              <div className={styles.featureIcon}><FiBriefcase /></div>
                <Subtitle size='md' weight='bold' variant='white'>Gerencie Patrocínios</Subtitle>
                <p>Controle suas ofertas, aprovações e comunicação com alunos</p>
            </div>

            <div className={styles.feature}>
              <div className={styles.featureIcon}><FiTrendingUp /></div>
                <Subtitle size='md' weight='bold' variant='white'>Relatórios e Métricas</Subtitle>
                <p>Tenha insights sobre ROI e impacto de seus investimentos</p>
            </div>
          </div>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>500+</span>
              <span className={styles.statLabel}>Projetos Ativos</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>1000+</span>
              <span className={styles.statLabel}>Alunos Talentosos</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>50+</span>
              <span className={styles.statLabel}>Empresas Parceiras</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

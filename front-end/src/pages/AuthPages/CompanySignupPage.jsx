import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../componentes/Input/Input';
import Button from '../../componentes/Button/Button';
import styles from "./AuthPage.module.css";
import Title from '../../componentes/Title/Title';
import Subtitle from '../../componentes/Subtitle/Subtitle';
import { FiArrowRight, FiBarChart2, FiUsers, FiBriefcase, FiTrendingUp } from 'react-icons/fi';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../../assets/logotipo.png';
import Dropdown from '../../componentes/Dropdown/Dropdown';

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
    cnpj: '',
    description: '',
    website: '',
    category: '',
    commissionRate: 0.15
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'commissionRate' ? parseFloat(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validações básicas
      if (!formData.name || !formData.email || !formData.cnpj) {
        setError('Nome, email e CNPJ são obrigatórios');
        setLoading(false);
        return;
      }

      // Chamada real seria aqui:
      // const response = await fetch('/api/companies', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });

      // Mock - sucesso após 2 segundos
      await new Promise(resolve => setTimeout(resolve, 2000));

      setSuccess(true);
      setTimeout(() => {
        navigate('/empresas');
      }, 2000);
    } catch (err) {
      setError('Erro ao cadastrar empresa');
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
          <Title size="md">Seja um Apoiador</Title>
          <Subtitle size="md">Invista em talento, encontre os melhores projetos estudantis</Subtitle>
        </div>
        {success ? (
          <div className={styles.successMessage}>
            <div className={styles.successIcon}>✓</div>
            <Subtitle variant='success' weight='bold'>Cadastro realizado com sucesso!</Subtitle>
            <p>Você será redirecionado em breve...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            {error && <div className={styles.error}>{error}</div>}

            <div className={styles.formGroup}>
              <label>Nome da Empresa *</label>
              <Input
                name="name"
                placeholder="Ex: Google Brasil"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Email Corporativo *</label>
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
                <label>CNPJ *</label>
                <Input
                  name="cnpj"
                  placeholder="00.000.000/0000-00"
                  value={formData.cnpj}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Website</label>
                <Input
                  name="website"
                  type="url"
                  placeholder="https://empresa.com.br"
                  value={formData.website}
                  onChange={handleChange}
                />
              </div>


              <div className={styles.formGroup}>
                <label>Categoria</label>
                <Dropdown

                  name="category"
                  placeholder="Selecione uma categoria"
                  options={CATEGORIAS}
                  value={formData.category}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label>Descrição da Empresa</label>
              <Input
                type='textarea'
                name="description"
                placeholder="Conte um pouco sobre sua empresa e por que investe em talentos estudantis"
                value={formData.description}
                onChange={handleChange}
                className={styles.textarea}
                rows={5}
              />
            </div>

            <div className={styles.formGroup}>
              <Subtitle size='md'>Taxa de Comissão (%)</Subtitle>
              <label>
                Percentual da plataforma sobre os patrocínios. Padrão: 15%
              </label>
              <input
                type="number"
                name="commissionRate"
                min="0"
                max="50"
                step="0.5"
                value={formData.commissionRate * 100}
                onChange={(e) => handleChange({
                  target: {
                    name: 'commissionRate',
                    value: parseFloat(e.target.value) / 100
                  }
                })}
                className={styles.numberInput}
              />
            </div>
            <div className={styles.options}>
              <div className={styles.checkbox}>
                <label htmlFor="terms">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                  />

                  Concordo com os <a href="#terms">Termos de Serviço</a> e a <a href="#privacy">Política de Privacidade</a>
                </label>
              </div>
              <span></span>
            </div>
            <Button
              rightIcon={<FiArrowRight />}
              type="submit"
              label={loading ? 'Cadastrando...' : 'Registrar Empresa'}
              onClick={handleSubmit}
              disabled={loading}
            />

            <Link to="/empresa-login" className={styles.link}>
              <span></span>
              <p>Já possui uma conta? Entrar</p>
              <span></span>
            </Link>

          </form>
        )}
      </div>

      <div className={styles.infoSection}>
        <div className={styles.header}>
          <Title>Por que ser um apoiador?</Title>
        </div>
        <div className={styles.features}>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>🎯</div>
            <Subtitle size='md' weight='bold' variant='white'>Encontre Talentos</Subtitle>
            <p>Acesso direto a uma comunidade de alunos qualificados em tecnologia</p>
          </div>

          <div className={styles.feature}>
            <div className={styles.featureIcon}><FiBriefcase /></div>
            <Subtitle size='md' weight='bold' variant='white'>Retorno Real</Subtitle>
            <p>Invista em projetos promissores com potencial de crescimento</p>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}><FiBriefcase /></div>
            <Subtitle size='md' weight='bold' variant='white'>Visibilidade</Subtitle>
            <p>Seja reconhecido como empresa apoiadora de inovação</p>
          </div>

          <div className={styles.feature}>
            <div className={styles.featureIcon}><FiBriefcase /></div>
            <Subtitle size='md' weight='bold' variant='white'>Parcerias Estratégicas</Subtitle>
            <p>Crie relacionamentos duradouros com talento emergente</p>
          </div>
        </div>

        <div className={styles.process}>
          <Title size="md">Como funciona?</Title>
          <ol>
            <li>Cadastre sua empresa na plataforma</li>
            <li>Navegue pelos projetos e talentos disponíveis</li>
            <li>Escolha os projetos para patrocinar</li>
            <li>Acompanhe o desenvolvimento e progresso</li>
            <li>Estabeleça parcerias duradouras</li>
          </ol>
        </div>
      </div>
    </div >
  );
}

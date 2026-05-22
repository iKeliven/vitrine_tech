import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './CompanyProfilePage.module.css';

export default function CompanyProfilePage() {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompany();
  }, [companyId]);

  const fetchCompany = async () => {
    try {
      setLoading(true);
      // Mock data - substituir por chamada real da API
      const mockCompany = {
        id: companyId,
        name: 'Google Brasil',
        email: 'careers@google.com.br',
        cnpj: '00.000.000/0000-00',
        category: 'Tecnologia',
        description: 'Patrocinando talentos em desenvolvimento web e mobile',
        website: 'https://google.com.br',
        logo: null,
        verified: true,
        commissionRate: 0.15,
        createdAt: '2024-01-01',
        totalSponsored: 15,
        activeProjects: [
          {
            id: 1,
            title: 'E-commerce Platform',
            studentName: 'João Silva',
            amount: 1000,
            status: 'approved'
          },
          {
            id: 2,
            title: 'Mobile App',
            studentName: 'Maria Santos',
            amount: 800,
            status: 'pending'
          }
        ]
      };
      setCompany(mockCompany);
    } catch (error) {
      console.error('Erro ao buscar empresa:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className={styles.loading}>Carregando perfil...</div>;
  if (!company) return <div className={styles.notFound}>Empresa não encontrada</div>;

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => navigate('/empresas')}>
        ← Voltar
      </button>

      <div className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.logo}>
            {company.logo ? (
              <img src={company.logo} alt={company.name} />
            ) : (
              <div className={styles.logoPlaceholder}>
                {company.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          
          <div className={styles.headerInfo}>
            <h1>{company.name}</h1>
            <p className={styles.category}>{company.category}</p>
            {company.verified && (
              <span className={styles.verified}>✓ Empresa Verificada</span>
            )}
          </div>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Projetos Patrocinados</span>
            <span className={styles.statValue}>{company.totalSponsored}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Ativos Agora</span>
            <span className={styles.statValue}>{company.activeProjects.length}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Taxa de Comissão</span>
            <span className={styles.statValue}>{(company.commissionRate * 100)}%</span>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <h2>Sobre a Empresa</h2>
          <div className={styles.description}>
            <p>{company.description}</p>
          </div>
          
          <div className={styles.contactInfo}>
            <div className={styles.infoItem}>
              <label>Email</label>
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </div>
            <div className={styles.infoItem}>
              <label>CNPJ</label>
              <p>{company.cnpj}</p>
            </div>
            <div className={styles.infoItem}>
              <label>Website</label>
              <a href={company.website} target="_blank" rel="noopener noreferrer">
                {company.website}
              </a>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2>Projetos Patrocinados</h2>
          <div className={styles.projectsList}>
            {company.activeProjects.map(project => (
              <div key={project.id} className={styles.projectItem}>
                <div className={styles.projectInfo}>
                  <h3>{project.title}</h3>
                  <p className={styles.studentName}>Por: {project.studentName}</p>
                  <span className={`${styles.status} ${styles[project.status]}`}>
                    {project.status === 'approved' ? 'Aprovado' : 'Pendente'}
                  </span>
                </div>
                <div className={styles.projectAmount}>
                  <span>R$ {project.amount.toLocaleString('pt-BR')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

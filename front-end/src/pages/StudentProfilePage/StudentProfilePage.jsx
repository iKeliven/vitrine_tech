import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './StudentProfilePage.module.css';

export default function StudentProfilePage() {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudent();
  }, [studentId]);

  const fetchStudent = async () => {
    try {
      setLoading(true);
      // Mock data - substituir por chamada real da API
      const mockStudent = {
        id: studentId,
        name: 'João Silva',
        email: 'joao@email.com',
        course: 'Engenharia de Software',
        turma: '2024.1',
        cpf: '123.456.789-00',
        matricula: '2024001',
        avatar: null,
        createdAt: '2024-01-15',
        points: 450,
        projects: [
          {
            id: 1,
            title: 'E-commerce Platform',
            description: 'Plataforma de vendas online com React e Node.js',
            techs: ['React', 'Node.js', 'PostgreSQL'],
            type: 'Web',
            sponsors: 2
          },
          {
            id: 2,
            title: 'Mobile App',
            description: 'Aplicativo mobile para gestão de tarefas',
            techs: ['React Native', 'Firebase'],
            type: 'Mobile',
            sponsors: 1
          }
        ]
      };
      setStudent(mockStudent);
    } catch (error) {
      console.error('Erro ao buscar aluno:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className={styles.loading}>Carregando perfil...</div>;
  if (!student) return <div className={styles.notFound}>Aluno não encontrado</div>;

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => navigate('/alunos')}>
        ← Voltar
      </button>

      <div className={styles.header}>
        <div className={styles.profileSection}>
          <div className={styles.avatar}>
            {student.avatar ? (
              <img src={student.avatar} alt={student.name} />
            ) : (
              <div className={styles.avatarPlaceholder}>
                {student.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          
          <div className={styles.info}>
            <h1>{student.name}</h1>
            <p className={styles.email}>{student.email}</p>
            <div className={styles.badges}>
              <span className={styles.badge}>{student.course}</span>
              <span className={styles.badge}>{student.turma}</span>
            </div>
          </div>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Pontos</span>
            <span className={styles.statValue}>{student.points}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Projetos</span>
            <span className={styles.statValue}>{student.projects.length}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Membro desde</span>
            <span className={styles.statValue}>
              {new Date(student.createdAt).toLocaleDateString('pt-BR')}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <h2>Informações Pessoais</h2>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <label>Matrícula</label>
              <p>{student.matricula || 'Não informada'}</p>
            </div>
            <div className={styles.infoItem}>
              <label>CPF</label>
              <p>{student.cpf || 'Não informado'}</p>
            </div>
            <div className={styles.infoItem}>
              <label>Email</label>
              <p>{student.email}</p>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2>Projetos ({student.projects.length})</h2>
          <div className={styles.projectsGrid}>
            {student.projects.map(project => (
              <div key={project.id} className={styles.projectCard}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className={styles.techStack}>
                  {project.techs.map(tech => (
                    <span key={tech} className={styles.tech}>{tech}</span>
                  ))}
                </div>
                <div className={styles.projectFooter}>
                  <span className={styles.type}>{project.type}</span>
                  {project.sponsors > 0 && (
                    <span className={styles.sponsors}>💰 {project.sponsors} patrocínio(s)</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

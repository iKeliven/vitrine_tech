import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import styles from './StudentProfilePage.module.css';

import api from '../../services/api';
import Loading from '../../componentes/Loading/Loading';

export default function StudentProfilePage() {
  const { studentId } = useParams();

  const navigate = useNavigate();

  const [student, setStudent] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState('');

  useEffect(() => {
    fetchStudent();
  }, [studentId]);

  const fetchStudent = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await api.get("/:id", getUserById);

      setStudent(response.data);

    } catch (error) {
      console.error('Erro ao buscar aluno:', error);

      setError(
        error.response?.data?.error ||
        'Erro ao carregar perfil do aluno'
      );

      setStudent(null);

    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Loading />
    );
  }

  if (error) {
    return (
      <div className={styles.notFound}>
        {error}
      </div>
    );
  }

  if (!student) {
    return (
      <div className={styles.notFound}>
        Aluno não encontrado
      </div>
    );
  }

  return (
    <div className={styles.container}>

      <button
        className={styles.backButton}
        onClick={() => navigate('/alunos')}
      >
        ← Voltar
      </button>

      <div className={styles.header}>

        <div className={styles.profileSection}>

          <div className={styles.avatar}>

            {student.avatar ? (
              <img
                src={student.avatar}
                alt={student.name}
              />
            ) : (
              <div className={styles.avatarPlaceholder}>
                {student.name?.charAt(0).toUpperCase()}
              </div>
            )}

          </div>

          <div className={styles.info}>

            <h1>
              {student.name} {student.lastName}
            </h1>

            <p className={styles.email}>
              {student.email}
            </p>

            <div className={styles.badges}>

              <span className={styles.badge}>
                {student.course || 'Curso não informado'}
              </span>

              <span className={styles.badge}>
                {student.turma || 'Turma não informada'}
              </span>

            </div>

          </div>

        </div>

        <div className={styles.stats}>

          <div className={styles.stat}>

            <span className={styles.statLabel}>
              Pontos
            </span>

            <span className={styles.statValue}>
              {student.userPoints?.balance || 0}
            </span>

          </div>

          <div className={styles.stat}>

            <span className={styles.statLabel}>
              Projetos
            </span>

            <span className={styles.statValue}>
              {student.projects?.length || 0}
            </span>

          </div>

          <div className={styles.stat}>

            <span className={styles.statLabel}>
              Membro desde
            </span>

            <span className={styles.statValue}>
              {student.createdAt
                ? new Date(student.createdAt).toLocaleDateString('pt-BR')
                : 'Não informado'}
            </span>

          </div>

        </div>

      </div>

      <div className={styles.content}>

        <div className={styles.section}>

          <h2>
            Informações Pessoais
          </h2>

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

          <h2>
            Projetos ({student.projects?.length || 0})
          </h2>

          <div className={styles.projectsGrid}>

            {student.projects?.length > 0 ? (

              student.projects.map((project) => (

                <div
                  key={project.id}
                  className={styles.projectCard}
                >

                  <h3>
                    {project.title}
                  </h3>

                  <p>
                    {project.description}
                  </p>

                  <div className={styles.techStack}>

                    {project.techs?.map((tech) => (
                      <span
                        key={tech}
                        className={styles.tech}
                      >
                        {tech}
                      </span>
                    ))}

                  </div>

                  <div className={styles.projectFooter}>

                    <span className={styles.type}>
                      {project.type}
                    </span>

                    {project.projectSponsors?.length > 0 && (
                      <span className={styles.sponsors}>
                        💰 {project.projectSponsors.length} patrocínio(s)
                      </span>
                    )}

                  </div>

                </div>

              ))

            ) : (

              <p>
                Este aluno ainda não possui projetos cadastrados.
              </p>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}
import { useState, useEffect } from 'react';

import PageLayout from '../../layouts/PageLayout';
import StudentCard from '../../componentes/Cards/StudentCard';

import api from '../../services/api';
import Loading from '../../componentes/Loading/Loading';

export default function StudentsPage() {

  const [students, setStudents] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {

    try {

      setLoading(true);
      setError("");

      const response = await api.get(
        '/gamification/ranking'
      );

      const formattedStudents =
        response.data.ranking.map((student) => ({

          id: student.id,

          name: student.name,

          email: student.email,

          course: student.course,

          turma: student.turma,

          avatar: student.avatar,

          points: student.totalXp,

          level: student.level,

          projectCount:
            student.projects?.length || 0
        }));

      setStudents(formattedStudents);

    } catch (error) {

      console.error(
        'Erro ao buscar alunos:',
        error
      );

      setError(
        error.response?.data?.error ||
        'Erro ao carregar alunos'
      );

      setStudents([]);

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
      <div>
        {error}
      </div>
    );
  }

  return (
    <PageLayout
      title="Alunos"

      heroTitle="
        Descubra talentos da tecnologia
      "

      heroDescription="
        Explore perfis de alunos,
        projetos desenvolvidos e acompanhe
        o ranking dos destaques da plataforma.
      "

      subtitle="
        Explore alunos do Senai de São José
      "

      placeholder="Buscar aluno..."

      data={students}

      renderItem={(student, i) => (
        <StudentCard
          key={student.id}
          {...student}
          rank={i + 1}
        />
      )}
    />
  );
}
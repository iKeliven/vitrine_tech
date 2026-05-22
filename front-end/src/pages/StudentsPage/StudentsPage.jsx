import { useState, useEffect } from 'react';

import PageLayout from '../../layouts/PageLayout';
import StudentCard from '../../componentes/Cards/StudentCard';

import api from '../../services/api';

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);

      const response = await api.get('/gamification/ranking');

      const formattedStudents = response.data.ranking.map((student) => ({
        id: student.id,
        name: student.name,
        email: student.email,
        course: student.course,
        turma: student.turma,
        avatar: student.avatar,
        points: student.totalXp,
        level: student.level,
        projectCount: student.projects?.length || 0
      }));

      setStudents(formattedStudents);

    } catch (error) {
      console.error('Erro ao buscar alunos:', error);
      setStudents([]);

    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return null;
  }

  return (
    <PageLayout
      title="Alunos"
      subtitle="Explore alunos do Senai de São José"
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
import { useState, useEffect } from 'react';
import PageLayout from '../../layouts/PageLayout';
import StudentCard from '../../componentes/Cards/StudentCard';

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);

      const mockData = [
        {
          id: 1,
          name: 'João Silva',
          email: 'joao@email.com',
          course: 'Engenharia de Software',
          turma: '2024.1',
          avatar: null,
          projectCount: 3,
          points: 450
        },
        {
          id: 2,
          name: 'Maria Santos',
          email: 'maria@email.com',
          course: 'Design Digital',
          turma: '2024.1',
          avatar: null,
          projectCount: 5,
          points: 850
        },
        {
          id: 3,
          name: 'Pedro Oliveira',
          email: 'pedro@email.com',
          course: 'Desenvolvimento Web',
          turma: '2024.2',
          avatar: null,
          projectCount: 2,
          points: 200
        }
      ];

      setStudents(mockData);
    } catch (error) {
      console.error('Erro ao buscar alunos:', error);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 ordena ranking
  const sortedStudents = [...students].sort((a, b) => b.points - a.points);

  if (loading) {
    return null;
  }

  return (
    <PageLayout
      title="Alunos"
      subtitle="Explore alunos do Senai de São José"
      placeholder="Buscar aluno..."
      data={sortedStudents}
      renderItem={(student, i) => (
        <StudentCard {...student} rank={i + 1} />
      )}
    />
  );
}

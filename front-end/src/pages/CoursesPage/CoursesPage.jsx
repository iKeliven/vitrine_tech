import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PageLayout from "../../layouts/PageLayout";
import CourseCard from "../../componentes/Cards/CourseCard";

import api from "../../services/api";
import Loading from "../../componentes/Loading/Loading";

export default function CoursesPage() {

  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    fetchCourses();
  }, []);

  async function fetchCourses() {

    try {

      setLoading(true);
      setError("");

      const response = await api.get("/courses");

      setCourses(response.data);

    } catch (error) {

      console.error(
        "Erro ao buscar cursos:",
        error
      );

      setError(
        error.response?.data?.error ||
        "Erro ao carregar cursos"
      );

      setCourses([]);

    } finally {

      setLoading(false);
    }
  }

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
      title="Nossos Cursos"

      heroTitle="
        Capacitação prática para o mercado
      "

      heroDescription="
        Explore trilhas de aprendizagem desenvolvidas
        para preparar alunos para desafios reais
        do mercado de tecnologia.
      "

      subtitle="Explore os cursos disponíveis"

      placeholder="Buscar curso..."

      data={courses}

      renderItem={(course) => (

        <CourseCard
          key={course.id}

          title={course.title}

          description={
            course.shortDescription ||
            course.description
          }

          duration={course.duration}

          level={course.level}

          image={course.image}

          onClick={() =>
            navigate(`/curso/${course.id}`)
          }
        />

      )}
    />
  );
}
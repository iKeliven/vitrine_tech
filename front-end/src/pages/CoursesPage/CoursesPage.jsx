import { useNavigate } from "react-router-dom";

import {
  FiLayout,
  FiCpu,
  FiDatabase
} from "react-icons/fi";

import PageLayout from "../../layouts/PageLayout";
import CourseCard from "../../componentes/Cards/CourseCard";

export default function CoursesPage() {

  const navigate = useNavigate();

  const courses = [
    {
      id: 1,
      title: "Desenvolvimento Front-end",
      description:
        "Aprenda React, HTML, CSS e boas práticas de desenvolvimento moderno.",

      duration: "120h",

      level: "Intermediário",

      techs: [
        "HTML",
        "CSS",
        "React"
      ],

      icon: <FiLayout />
    },

    {
      id: 2,
      title: "Back-end com Node.js",

      description:
        "Criação de APIs REST, autenticação JWT e integração com banco de dados.",

      duration: "100h",

      level: "Intermediário",

      techs: [
        "Node.js",
        "Express",
        "Prisma"
      ],

      icon: <FiCpu />
    },

    {
      id: 3,
      title: "Banco de Dados",

      description:
        "Modelagem relacional, SQL e integração com aplicações reais.",

      duration: "80h",

      level: "Iniciante",

      techs: [
        "PostgreSQL",
        "SQL",
        "Prisma"
      ],

      icon: <FiDatabase />
    }
  ];

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
          {...course}
          onClick={() =>
            navigate(`/curso/${course.id}`)
          }
        />
      )}
    />
  );
}
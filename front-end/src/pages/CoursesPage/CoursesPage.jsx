import { useNavigate } from "react-router-dom";
import { FiLayout, FiCpu, FiDatabase } from "react-icons/fi";
import PageLayout from "../../layouts/PageLayout";
import CourseCard from "../../componentes/Cards/CourseCard";

export default function CoursesPage() {
    const navigate = useNavigate();

    const courses = [

        {
            title: "Desenvolvimento Front-end",
            description: "Aprenda React, HTML, CSS e boas práticas.",
            duration: "120h",
            level: "Intermediário",
            techs: ["React", "node"],
            icon: <FiLayout />
        },
        {
            title: "Back-end com Node.js",
            description: "Criação de APIs e integração com banco de dados.",
            duration: "100h",
            level: "Intermediário",
             techs: ["React", "node"],
            icon: <FiCpu />
        },
        {
            title: "Design UX/UI",
            description: "Criação de interfaces modernas e usáveis.",
            duration: "80h",
            level: "Iniciante",
             techs: ["React", "node"],
            icon: <FiDatabase />
        },
        {
            title: "Back-end com Node.js",
            description: "Criação de APIs e integração com banco de dados.",
            duration: "100h",
            level: "Intermediário",
             techs: ["React", "node"],
            icon: <FiCpu />
        },
        {
            title: "Design UX/UI",
            description: "Criação de interfaces modernas e usáveis.",
            duration: "80h",
            level: "Iniciante",
             techs: ["React", "node"],
            icon: <FiDatabase />
        },{
            title: "Back-end com Node.js",
            description: "Criação de APIs e integração com banco de dados.",
            duration: "100h",
            level: "Intermediário",
             techs: ["React", "node"],
            icon: <FiCpu />
        },
        {
            title: "Design UX/UI",
            description: "Criação de interfaces modernas e usáveis.",
            duration: "80h",
            level: "Iniciante",
             techs: ["React", "node"],
            icon: <FiDatabase />
        }
    ];

    return (
         <PageLayout
            title="Nossos Cursos"
            subtitle="Explore os cursos disponíveis"
            placeholder="Buscar curso..."
            data={courses}
            renderItem={(course) => (
                <CourseCard {...course} onClick={() => navigate(`/curso/${course.id}`)} />
            )}
        />
    );
}
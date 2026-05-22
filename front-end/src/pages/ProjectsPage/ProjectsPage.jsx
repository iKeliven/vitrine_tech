import PageLayout from "../../layouts/PageLayout";
import ProjectCard from "../../componentes/Cards/ProjectCard";

export default function ProjectsPage() {
    const projects = [
        {
            title: "App Fitness",
            student: "Maria",
            email: "email@email.com",
            description: "App para treinos personalizados",
            techs: ["React"],
            avatar: "https://i.pravatar.cc/100?img=5"
        },
        {
            title: "Sistema Escolar",
            student: "João",
            email: "email@email.com",
            description: "Gerenciamento de alunos",
            techs: ["Node"],
            avatar: "https://i.pravatar.cc/100?img=6"
        },
        {
            title: "Portfólio Dev",
            student: "Ana",
            email: "email@email.com",
            description: "Site pessoal responsivo",
            techs: ["HTML", "CSS"],
            avatar: "https://i.pravatar.cc/100?img=7"
        }
    ];

    return (
        <PageLayout
            title="Projetos"
            subtitle="Explore projetos desenvolvidos pelos alunos do Senai de São José"
            placeholder="Buscar projeto..."
            data={projects}
            renderItem={(project) => (
                <ProjectCard {...project} />
            )}
        />
    );
}

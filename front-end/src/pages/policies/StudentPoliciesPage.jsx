import styles from "./PoliciesPage.module.css";
import Title from "../../componentes/Title/Title";
import Subtitle from "../../componentes/Subtitle/Subtitle";

export default function StudentPoliciesPage() {
  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <Title size="md">Termos de Serviço e Política de Privacidade</Title>

        <Subtitle size="md">
          Aplicável aos alunos da plataforma VitrineTech
        </Subtitle>

        <h2>1. Uso da plataforma</h2>
        <p>
          A VitrineTech permite que alunos cadastrem seus perfis, publiquem projetos acadêmicos,
          adicionem tecnologias utilizadas, imagens, links e acompanhem sua evolução na plataforma.
        </p>

        <h2>2. Dados coletados</h2>
        <p>
          Podemos coletar dados como nome, sobrenome, email, CPF, matrícula, turma, curso,
          avatar e informações dos projetos publicados.
        </p>

        <h2>3. Finalidade dos dados</h2>
        <p>
          Os dados são utilizados para identificação do aluno, exibição do portfólio,
          organização dos projetos, rankings, gamificação e conexão com empresas apoiadoras.
        </p>

        <h2>4. Projetos publicados</h2>
        <p>
          Ao publicar um projeto, o aluno declara que possui autorização para compartilhar
          os materiais, imagens, textos, links e demais informações cadastradas.
        </p>

        <h2>5. Visibilidade</h2>
        <p>
          As informações públicas do perfil e dos projetos poderão ser visualizadas por
          professores, colegas, empresas apoiadoras e visitantes da plataforma.
        </p>

        <h2>6. Responsabilidades do aluno</h2>
        <p>
          O aluno é responsável pelas informações inseridas, pelo uso adequado da plataforma
          e por não publicar conteúdos ofensivos, ilegais ou de terceiros sem autorização.
        </p>

        <h2>7. Segurança</h2>
        <p>
          A plataforma utiliza autenticação e boas práticas para proteger os dados cadastrados,
          mas o aluno também deve manter sua senha em segurança.
        </p>

        <h2>8. Atualizações</h2>
        <p>
          Estes termos podem ser atualizados conforme a evolução da plataforma.
        </p>
      </section>
    </main>
  );
}
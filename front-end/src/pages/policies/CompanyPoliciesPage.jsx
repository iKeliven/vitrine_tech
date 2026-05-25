import styles from "./PoliciesPage.module.css";
import Title from "../../componentes/Title/Title";
import Subtitle from "../../componentes/Subtitle/Subtitle";

export default function CompanyPoliciesPage() {
  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <Title size="md">Termos de Serviço e Política de Privacidade</Title>

        <Subtitle size="md">
          Aplicável às empresas apoiadoras da plataforma VitrineTech
        </Subtitle>

        <h2>1. Uso da plataforma</h2>
        <p>
          A VitrineTech permite que empresas criem uma conta, visualizem projetos acadêmicos,
          conheçam talentos e acompanhem oportunidades de apoio e patrocínio.
        </p>

        <h2>2. Dados coletados</h2>
        <p>
          Podemos coletar dados como nome da empresa, email corporativo, logo, categoria
          e demais informações que poderão ser editadas posteriormente no painel da empresa.
        </p>

        <h2>3. Finalidade dos dados</h2>
        <p>
          Os dados são utilizados para identificação da empresa, exibição institucional,
          comunicação com a plataforma e conexão com projetos e alunos.
        </p>

        <h2>4. Relação com alunos</h2>
        <p>
          A empresa deve utilizar as informações dos alunos e projetos de forma ética,
          respeitosa e relacionada aos objetivos educacionais e profissionais da plataforma.
        </p>

        <h2>5. Patrocínios e apoios</h2>
        <p>
          Funcionalidades relacionadas a patrocínios, valores, comissões e aprovações
          poderão ser configuradas e gerenciadas em áreas específicas da plataforma.
        </p>

        <h2>6. Responsabilidades da empresa</h2>
        <p>
          A empresa é responsável pelas informações cadastradas e pelo uso adequado da plataforma,
          não podendo utilizar os dados para spam, discriminação ou finalidades indevidas.
        </p>

        <h2>7. Segurança</h2>
        <p>
          A plataforma utiliza autenticação e boas práticas para proteção dos dados, mas a empresa
          também deve manter suas credenciais em segurança.
        </p>

        <h2>8. Atualizações</h2>
        <p>
          Estes termos podem ser atualizados conforme novas funcionalidades forem adicionadas.
        </p>
      </section>
    </main>
  );
}
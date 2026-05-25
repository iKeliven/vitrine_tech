import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  // =========================================
  // DESENVOLVIMENTO DE SISTEMAS
  // =========================================

  await prisma.course.create({
    data: {

      title: "Técnico em Desenvolvimento de Sistemas",

      modality: "Presencial",

      category: "Cursos Técnicos",

      shortDescription:
        "Aprenda a desenvolver sistemas, aplicativos e soluções digitais.",

      description:
        "O profissional de Desenvolvimento de Sistemas trabalha na criação de programas para computadores, celulares e outros dispositivos para diferentes empresas e setores.",

      targetAudience:
        "Destinado a estudantes a partir do 2º ano ou concluintes do Ensino Médio que desejam aprender uma profissão.",

      requirements:
        "Escolaridade mínima: matriculado a partir do 2º ano do Ensino Médio ou Ensino Médio concluído.",

      documents:
        "Comprovante de matrícula ou certificado de conclusão, RG, CPF e documentos do responsável quando aplicável.",

      duration: "1200h",

      level: "Técnico",

      officialUrl:
        "https://cursos.sesisenai.org.br/cursos-tecnicos/tecnico-em-desenvolvimento-de-sistemas/8006",

      image:
        "https://cursos.sesisenai.org.br/sgn/arquivos/portifolio_imagem/a8/ff/8e/a8ff8e19dff7ff516ffd50e21881f656/TecnicoemDesenvolvimentodeSistemas.jpg?origin=https://senaiservices-files.sesisenai.org.br",

      modules: {

        create: [

          {
            title: "Módulo Indústria",

            order: 1,

            subjects: {

              create: [

                {
                  title: "Introdução à Tecnologia da Informação e Comunicação",
                  workload: "40h",
                  semester: "1º Semestre"
                },

                {
                  title: "Introdução ao Desenvolvimento de Projetos",
                  workload: "12h",
                  semester: "2º Semestre"
                },

                {
                  title: "Introdução a Qualidade e Produtividade",
                  workload: "16h",
                  semester: "3º Semestre"
                },

                {
                  title: "Sustentabilidade nos Processos Industriais",
                  workload: "8h",
                  semester: "3º Semestre"
                },

                {
                  title: "Introdução a Indústria 4.0",
                  workload: "24h",
                  semester: "4º Semestre"
                },

                {
                  title: "Saúde e Segurança no Trabalho",
                  workload: "12h",
                  semester: "4º Semestre"
                }
              ]
            }
          },

          {
            title: "Módulo Introdutório",

            order: 2,

            subjects: {

              create: [

                {
                  title: "Fundamentos de Eletroeletrônica Aplicada",
                  workload: "80h",
                  semester: "1º Semestre"
                },

                {
                  title: "Lógica de Programação",
                  workload: "220h",
                  semester: "1º Semestre"
                }
              ]
            }
          },

          {
            title: "Módulo Específico I",

            order: 3,

            subjects: {

              create: [

                {
                  title: "Banco de Dados",
                  workload: "120h",
                  semester: "2º Semestre"
                },

                {
                  title: "Programação de Aplicativos",
                  workload: "100h",
                  semester: "2º Semestre"
                },

                {
                  title: "Internet das Coisas",
                  workload: "128h",
                  semester: "4º Semestre"
                }
              ]
            }
          },

          {
            title: "Módulo Específico II",

            order: 4,

            subjects: {

              create: [

                {
                  title: "Modelagem de Sistemas",
                  workload: "100h",
                  semester: "2º Semestre"
                },

                {
                  title: "Desenvolvimento de Sistemas",
                  workload: "200h",
                  semester: "3º Semestre"
                },

                {
                  title: "Teste de Sistemas",
                  workload: "60h",
                  semester: "3º Semestre"
                },

                {
                  title: "Implantação de Sistemas",
                  workload: "40h",
                  semester: "4º Semestre"
                },

                {
                  title: "Manutenção de Sistemas",
                  workload: "40h",
                  semester: "4º Semestre"
                }
              ]
            }
          }
        ]
      }
    }
  });


  // =========================================
  // INTERNET DAS COISAS
  // =========================================

  await prisma.course.create({
    data: {

      title: "Técnico em Internet das Coisas - IoT",

      modality: "Presencial",

      category: "Cursos Técnicos",

      shortDescription:
        "Desenvolva soluções com sensores, automação e sistemas embarcados para IoT.",

      description:
        "Desenvolver e implementar soluções com sistemas embarcados e sensoriamento para IoT aplicados ao monitoramento e controle automatizado de processos.",

      targetAudience:
        "Destinado a estudantes a partir do 2º ano ou concluintes do Ensino Médio.",

      requirements:
        "Escolaridade mínima: matriculado a partir do 2º ano do Ensino Médio ou Ensino Médio concluído.",

      documents:
        "Comprovante de matrícula ou certificado de conclusão, RG, CPF e documentos do responsável quando aplicável.",

      duration: "1200h",

      level: "Técnico",

      officialUrl:
        "https://cursos.sesisenai.org.br/cursos-tecnicos/tecnico-em-internet-das-coisas-iot/8151",

      image:
        "https://cursos.sesisenai.org.br/images/product/areas_group/eletronica-e-automacao/eletronica-e-automacao-desk.webp",

      modules: {

        create: [

          {
            title: "Módulo Indústria",

            order: 1,

            subjects: {

              create: [

                {
                  title: "Introdução a Tecnologia da Informação e Comunicação",
                  workload: "40h",
                  semester: "1º Semestre"
                },

                {
                  title: "Saúde e Segurança no Trabalho",
                  workload: "12h",
                  semester: "1º Semestre"
                },

                {
                  title: "Introdução a Indústria 4.0",
                  workload: "24h",
                  semester: "2º Semestre"
                }
              ]
            }
          },

          {
            title: "Módulo Introdutório",

            order: 2,

            subjects: {

              create: [

                {
                  title: "Fundamentos da Instrumentação",
                  workload: "60h",
                  semester: "1º Semestre"
                },

                {
                  title: "Fundamentos de Redes de Comunicação",
                  workload: "80h",
                  semester: "1º Semestre"
                },

                {
                  title: "Fundamentos do Desenvolvimento de Software",
                  workload: "70h",
                  semester: "1º Semestre"
                }
              ]
            }
          },

          {
            title: "Módulo Específico",

            order: 3,

            subjects: {

              create: [

                {
                  title: "Programação de Sistemas Embarcados",
                  workload: "90h",
                  semester: "2º Semestre"
                },

                {
                  title: "Instalação de Sensores e Dispositivos de Automação",
                  workload: "90h",
                  semester: "3º Semestre"
                },

                {
                  title: "Redes de Comunicação para IoT",
                  workload: "92h",
                  semester: "4º Semestre"
                }
              ]
            }
          }
        ]
      }
    }
  });

  //Multimidia
  // =========================================
  await prisma.course.create({
    data: {
      title: "Técnico em Multimídia",
      modality: "Presencial",
      category: "Cursos Técnicos",

      shortDescription:
        "Aprenda a criar identidades visuais, sites, vídeos, animações e projetos digitais para comunicação visual.",

      description:
        "Animações em 3D, produção de vídeo, desenvolvimento de marcas, embalagens, sites e conteúdos digitais fazem parte da formação. O curso prepara profissionais para atuar na área de comunicação visual, criando identidades, interfaces, vídeos e soluções multimídia.",

      targetAudience:
        "Destinado a estudantes a partir do 2º ano ou concluintes do Ensino Médio que desejam aprender uma profissão, entrar no mercado de trabalho ou buscar uma melhor colocação profissional.",

      requirements:
        "Escolaridade mínima: candidatos matriculados a partir do 2º ano do Ensino Médio ou que já tenham concluído o Ensino Médio.",

      documents:
        "Comprovante de matrícula no 2º ano ou certificado de conclusão do Ensino Médio; RG e CPF; comprovante de deficiência, se aplicável; RG e CPF do responsável legal, caso o candidato seja menor de idade; RG e CPF do responsável financeiro, se houver.",

      duration: "1200h",
      level: "Técnico",

      officialUrl:
        "https://cursos.sesisenai.org.br/cursos-tecnicos/tecnico-em-multimidia/8047",

      image:
        "https://cursos.sesisenai.org.br/sgn/arquivos/portifolio_imagem/54/21/07/542107b872c0e05b1c017d9bf1473fbf/TecnicoemMultimidia.png?origin=https://senaiservices-files.sesisenai.org.br",
      modules: {
        create: [
          {
            title: "Módulo Indústria",
            order: 1,
            subjects: {
              create: [
                {
                  title: "Introdução ao Desenvolvimento de Projetos",
                  workload: "12h",
                  semester: "1º Semestre"
                },
                {
                  title: "Introdução à Tecnologia da Informação e Comunicação",
                  workload: "40h",
                  semester: "1º Semestre"
                },
                {
                  title: "Saúde e Segurança no Trabalho",
                  workload: "12h",
                  semester: "1º Semestre"
                },
                {
                  title: "Sustentabilidade nos Processos Industriais",
                  workload: "8h",
                  semester: "3º Semestre"
                },
                {
                  title: "Introdução a Indústria 4.0",
                  workload: "24h",
                  semester: "4º Semestre"
                },
                {
                  title: "Introdução a Qualidade e Produtividade",
                  workload: "16h",
                  semester: "4º Semestre"
                }
              ]
            }
          },
          {
            title: "Módulo Introdutório",
            order: 2,
            subjects: {
              create: [
                {
                  title: "Fundamentos de Desenho e Percepção Visual",
                  workload: "40h",
                  semester: "1º Semestre"
                },
                {
                  title: "Fundamentos de Fotografia Digital e de Semiótica",
                  workload: "40h",
                  semester: "1º Semestre"
                },
                {
                  title: "Fundamentos de Teoria da Cor",
                  workload: "40h",
                  semester: "1º Semestre"
                },
                {
                  title: "História do Design Gráfico",
                  workload: "40h",
                  semester: "1º Semestre"
                }
              ]
            }
          },
          {
            title: "Módulo Específico I",
            order: 3,
            subjects: {
              create: [
                {
                  title: "Imagem Digital",
                  workload: "80h",
                  semester: "2º Semestre"
                },
                {
                  title: "Tipografia",
                  workload: "60h",
                  semester: "2º Semestre"
                },
                {
                  title: "Projeto de Mídias Digitais",
                  workload: "80h",
                  semester: "4º Semestre"
                }
              ]
            }
          },
          {
            title: "Módulo Específico II",
            order: 4,
            subjects: {
              create: [
                {
                  title: "Design Web",
                  workload: "100h",
                  semester: "2º Semestre"
                },
                {
                  title: "Produção Audiovisual",
                  workload: "98h",
                  semester: "2º Semestre"
                },
                {
                  title: "Design de Interfaces",
                  workload: "100h",
                  semester: "3º Semestre"
                },
                {
                  title: "Projeto de Identidade Visual",
                  workload: "100h",
                  semester: "3º Semestre"
                }
              ]
            }
          },
          {
            title: "Módulo Específico III",
            order: 5,
            subjects: {
              create: [
                {
                  title: "Design de Animação 3D",
                  workload: "110h",
                  semester: "3º Semestre"
                },
                {
                  title: "Motion Design",
                  workload: "100h",
                  semester: "4º Semestre"
                },
                {
                  title: "Projeto de Mídias Integradas",
                  workload: "100h",
                  semester: "4º Semestre"
                }
              ]
            }
          }
        ]
      }
    }
  });

}

main()
  .then(() => {
    console.log("Seed executado com sucesso!");
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
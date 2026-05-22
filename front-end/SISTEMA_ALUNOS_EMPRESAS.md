# Sistema de Alunos e Empresas Apoiadoras - Frontend

## Visão Geral
Sistema completo de apresentação de alunos e empresas apoiadoras, com páginas de listagem, detalhe e cadastro de empresa.

---

## 📁 Estrutura de Pastas

### Componentes Criados
```
src/componentes/
├── CompanyCard/
│   ├── CompanyCard.jsx
│   └── CompanyCard.module.css
└── StudentCard/
    ├── StudentCard.jsx
    └── StudentCard.module.css
```

### Páginas Criadas
```
src/pages/
├── StudentsPage/
│   ├── StudentsPage.jsx
│   └── StudentsPage.module.css
├── StudentProfilePage/
│   ├── StudentProfilePage.jsx
│   └── StudentProfilePage.module.css
├── CompaniesPage/
│   ├── CompaniesPage.jsx
│   └── CompaniesPage.module.css
├── CompanyProfilePage/
│   ├── CompanyProfilePage.jsx
│   └── CompanyProfilePage.module.css
└── CompanySignupPage/
    ├── CompanySignupPage.jsx
    └── CompanySignupPage.module.css
```

---

## 🎨 Componentes

### CompanyCard
Card reutilizável para exibir informações da empresa.

**Props:**
- `company` - Objeto com dados da empresa
- `onClick` - Função callback ao clicar no card

**Exibe:**
- Logo da empresa (ou inicial)
- Nome
- Categoria
- Descrição
- Link do website
- Status de verificação

### StudentCard
Card reutilizável para exibir informações do aluno.

**Props:**
- `student` - Objeto com dados do aluno
- `onClick` - Função callback ao clicar

**Exibe:**
- Avatar do aluno (ou inicial)
- Nome e email
- Curso
- Turma
- Quantidade de projetos
- Saldo de pontos

---

## 📄 Páginas

### 1. StudentsPage (`/alunos`)
Página de listagem de todos os alunos com busca e filtro.

**Funcionalidades:**
- Busca por nome ou email
- Filtro por curso
- Grid responsivo de cards
- Navegação para perfil do aluno

**Mock Data:**
- João Silva - 3 projetos, 450 pontos
- Maria Santos - 5 projetos, 850 pontos
- Pedro Oliveira - 2 projetos, 200 pontos

### 2. StudentProfilePage (`/aluno/:studentId`)
Perfil completo do aluno com seus projetos.

**Exibe:**
- Avatar e informações pessoais
- Estatísticas (pontos, projetos, data de ingresso)
- Matrícula, CPF, email
- Lista de projetos com:
  - Título e descrição
  - Stack de tecnologias
  - Tipo de projeto
  - Quantidade de patrocínios

### 3. CompaniesPage (`/empresas`)
Página de listagem de empresas apoiadoras.

**Funcionalidades:**
- Busca por nome
- Filtro por categoria
- Botão "Seja um Apoiador"
- Grid responsivo de cards
- Navegação para perfil da empresa

**Mock Data:**
- Google Brasil - Tecnologia
- Adobe - Design & Software
- Microsoft - Tecnologia

### 4. CompanyProfilePage (`/empresa/:companyId`)
Perfil completo da empresa com projetos patrocinados.

**Exibe:**
- Logo e informações da empresa
- Estatísticas (projetos, ativos, taxa)
- Dados de contato (email, CNPJ, website)
- Lista de projetos patrocinados com:
  - Nome do projeto
  - Nome do aluno responsável
  - Valor investido
  - Status (aprovado/pendente)

### 5. CompanySignupPage (`/empresa-cadastro`)
Formulário de cadastro para empresas (Seja um Apoiador).

**Campos do Formulário:**
- Nome da Empresa (obrigatório)
- Email Corporativo (obrigatório)
- CNPJ (obrigatório)
- Website
- Categoria
- Descrição
- Taxa de Comissão

**Seção de Benefícios:**
- Encontre Talentos
- Retorno Real
- Visibilidade
- Parcerias Estratégicas

**Passo a Passo:**
1. Cadastre sua empresa
2. Navegue pelos projetos
3. Escolha projetos para patrocinar
4. Acompanhe o desenvolvimento
5. Estabeleça parcerias

---

## 🛣️ Rotas Adicionadas

```
GET /alunos                    → StudentsPage
GET /aluno/:studentId          → StudentProfilePage
GET /empresas                  → CompaniesPage
GET /empresa/:companyId        → CompanyProfilePage
GET /empresa-cadastro          → CompanySignupPage
```

---

## 🎯 Integração com API

Todos os componentes estão preparados para integração com a API. 

### Chamadas de API a fazer:

**Para StudentsPage:**
```javascript
// GET /api/users (com paginação)
const students = await fetch('/api/users?page=1&limit=12');
```

**Para StudentProfilePage:**
```javascript
// GET /api/users/:id
// GET /api/projects?userId=:id
// GET /api/gamification/points?userId=:id
```

**Para CompaniesPage:**
```javascript
// GET /api/companies (apenas verificadas)
const companies = await fetch('/api/companies');
```

**Para CompanyProfilePage:**
```javascript
// GET /api/companies/:id
// GET /api/sponsors/company/:companyId/offers
```

**Para CompanySignupPage:**
```javascript
// POST /api/companies
// POST /api/auth/login (se necessário)
```

---

## 🎨 Design e Estilos

### Paleta de Cores
- **Primária**: #667eea (roxo)
- **Secundária**: #764ba2 (roxo escuro)
- **Destaque**: #f5576c (vermelho/rosa)
- **Texto**: #333 (cinza escuro)
- **Fundo**: white / #f9f9f9

### Componentes de UI
- Cards com hover effect
- Inputs com validação visual
- Buttons com gradient
- Badges para status
- Grids responsivas

---

## 📱 Responsividade

Todas as páginas são responsivas:
- Desktop: Grid 3+ colunas
- Tablet: Grid 2 colunas
- Mobile: Grid 1 coluna

---

## 🔄 Estado e Dados

### Mock Data (Atual)
Todas as páginas usam dados mock para demonstração. Substituir por chamadas reais de API.

### Próximas Implementações
1. Context API ou Redux para gerenciar estado global
2. Integração real com endpoints `/api/users`, `/api/companies`, `/api/sponsors`
3. Paginação
4. Filtros avançados
5. Favoritos e wishlist
6. Sistema de notificações

---

## 🚀 Como Usar

### Para acessar as páginas:
```
/alunos                  - Listar todos os alunos
/aluno/1                 - Perfil do aluno (ID: 1)
/empresas                - Listar todas as empresas
/empresa/1               - Perfil da empresa (ID: 1)
/empresa-cadastro        - Cadastrar nova empresa
```

### Para testar o formulário:
1. Acesse `/empresa-cadastro`
2. Preencha o formulário
3. Clique em "Registrar Empresa"
4. Você será redirecionado para `/empresas` após 2 segundos

---

## 📝 Observações

- Componentes reutilizáveis facilitam manutenção
- CSS Modules evitam conflitos de estilo
- Estrutura preparada para integração com API
- Mock data pode ser facilmente substituída por fetch real
- Componentes responsivos testados em diferentes resoluções

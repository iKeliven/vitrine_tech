# Sistema de Gamificação - Vitrine Tech

## Visão Geral

O sistema de gamificação foi implementado para resolver os seguintes problemas:
- Muitos alunos fazem projetos que não são aproveitados
- Falta de incentivo para que alunos compartilhem seus trabalhos
- Projetos não ganham visibilidade de empresas
- Necessidade de monetização através de parcerias empresariais

## Componentes Principais

### 1. **Sistema de Pontos (UserPoints)**

Cada aluno possui um saldo de pontos que é acumulado através de atividades:

#### Ganho de Pontos
- **Criação de Projeto**: +50 pontos
- **Patrocínio de Empresa**: Pontos baseados no valor do patrocínio (1 ponto = R$ 1,00)

#### Gastos de Pontos
- **Resgate de Recompensas**: Conforme o custo da recompensa

### 2. **Recompensas (Reward)**

O sistema permite aos administradores criarem recompensas que os alunos podem resgatar com seus pontos.

**Exemplos de Recompensas**:
- Mouse gamer
- Teclado mecânico
- Assinatura de programa (Adobe, Figma Pro, etc)
- Certificados
- Cashback

**Estrutura**:
```
Reward {
  id: int
  name: string
  description: string
  pointsCost: int
  quantity: int (disponíveis)
  image: string
  active: boolean
}
```

### 3. **Empresas (Company)**

Empresas parceiras que podem patrocinar projetos de alunos.

**Campos**:
- `name`: Nome da empresa
- `email`: Email corporativo
- `cnpj`: CNPJ
- `commissionRate`: Taxa de comissão (padrão 15%)
- `verified`: Status de verificação

### 4. **Patrocínio de Projetos (ProjectSponsor)**

Quando uma empresa patrocina um projeto:

1. **Empresa oferece**: Valor em dinheiro
2. **Plataforma cobra taxa**: `valor * commissionRate`
3. **Aluno recebe**: `valor - comissão` em dinheiro + pontos

**Exemplo de Transação**:
```
Empresa oferece: R$ 1.000,00
Taxa da plataforma (15%): R$ 150,00
Aluno recebe: R$ 850,00 + 850 pontos
```

### 5. **Transações (Transaction)**

Registro de todas as movimentações:
- `project_creation`: Aluno cria projeto
- `company_sponsorship`: Empresa patrocina projeto
- `reward_redemption`: Aluno resgata recompensa

## Endpoints da API

### Gamificação
- `GET /api/gamification/points` - Ver pontos do usuário (autenticado)
- `GET /api/gamification/rewards` - Listar recompensas disponíveis
- `POST /api/gamification/rewards/redeem` - Resgatar recompensa (autenticado)
- `GET /api/gamification/my-rewards` - Meus resgates (autenticado)

### Empresas
- `POST /api/companies` - Registrar empresa
- `GET /api/companies` - Listar empresas verificadas
- `GET /api/companies/:id` - Perfil da empresa + seus patrocínios

### Patrocínios
- `POST /api/sponsors` - Empresa oferece patrocínio a projeto
- `PUT /api/sponsors/:sponsorId/approve` - Admin aprova patrocínio
- `PUT /api/sponsors/:sponsorId/reject` - Admin rejeita patrocínio
- `GET /api/sponsors/project/:projectId` - Patrocínios de um projeto
- `GET /api/sponsors/company/:companyId/offers` - Ofertas de uma empresa
- `GET /api/sponsors/top/projects` - Projetos mais patrocinados

## Fluxo de Gamificação

### 1. Aluno cria projeto
```
POST /api/projects
↓
Projeto criado + 50 pontos ganhos
```

### 2. Empresa descobre e patrocina o projeto
```
POST /api/sponsors
{
  "projectId": 1,
  "companyId": 1,
  "amount": 1000
}
↓
Patrocínio criado com status "pending"
```

### 3. Admin aprova patrocínio
```
PUT /api/sponsors/1/approve
↓
- Aluno recebe R$ 850,00 (valor - comissão)
- Aluno recebe 850 pontos
- Plataforma cobra R$ 150,00 (15% de comissão)
```

### 4. Aluno resgata recompensa
```
POST /api/gamification/rewards/redeem
{
  "rewardId": 1  // Mouse gamer custando 200 pontos
}
↓
- 200 pontos debitados
- Resgate criado com status "pending"
- Admin processa o envio da recompensa
```

## Modelos de Negócio

### 1. Marketplace de Talento
- Alunos ganham visibilidade
- Empresas encontram talent pool qualificado
- Plataforma captura 15% como taxa

### 2. Programa de Recompensas
- Incentiva engajamento contínuo
- Criar parcerias com:
  - Lojas de informática (mouse, teclado)
  - Plataformas de software (Adobe, Figma)
  - Provedores de certificação

### 3. Monetização
- **Taxa de patrocínio**: 15% (configurável por empresa)
- **Recompensas**: Parcerias B2B com desconto para volume
- **Premium**: Empresas podem pagar para destaque premium

## Configurações Importantes

No arquivo `.env`:
```
JWT_SECRET=sua_chave_secreta
DATABASE_URL=postgresql://keliven@localhost:5432/vitrine_tech
```

## Próximos Passos

1. **Admin Dashboard**: Interface para gerenciar recompensas, empresas e patrocínios
2. **Email Notifications**: Notificar alunos e empresas sobre eventos
3. **Analytics**: Dashboard de métricas (projetos mais patrocinados, alunos top)
4. **Integração de Pagamento**: Stripe, PayPal para transferência real de dinheiro
5. **Leaderboard**: Ranking de alunos por pontos
6. **Categorias**: Filtrar empresas e recompensas por categoria

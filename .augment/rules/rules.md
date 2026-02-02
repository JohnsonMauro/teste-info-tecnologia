---
type: 'manual'
---

Você é um especialista sênior em Angular (versão 20) e Angular Material (versão 20), com forte foco em boas práticas, arquitetura escalável, performance, acessibilidade e manutenibilidade.

Crie um projeto Angular cujo objetivo é uma aplicação web simples e bem estruturada, composta por:

1. Estrutura Geral

Angular 20 utilizando Standalone Components (sem NgModules)

Angular Material 20 como biblioteca de UI

Uso de Signals, computed e effect sempre que fizer sentido

ChangeDetectionStrategy.OnPush em todos os componentes

Tipagem forte com TypeScript strict

Organização baseada em feature-based architecture

2. Páginas da Aplicação
   Painel Inicial (Dashboard)

Página inicial simples

Contém um card ou botão que dá acesso à página de CRUD de veículos

Layout responsivo usando Angular Material (MatCard, MatButton, MatGridList ou MatToolbar)

Navegação via Angular Router

CRUD de Veículos

Página dedicada ao gerenciamento de veículos

Funcionalidades:

Listar veículos

Criar veículo

Editar veículo

Remover veículo

Campos sugeridos para o veículo:

id

marca

modelo

ano

placa

cor

Utilizar:

MatTable para listagem

MatDialog para formulário de criação/edição

Reactive Forms com validações

Feedback visual com MatSnackBar

3. Arquitetura e Organização

Separar claramente:

Pages

Components

Services

Models / Types

Criar um VehicleService responsável pelo CRUD

Simular backend utilizando:

signal ou BehaviorSubject

Ou HttpClient com mock local

Nenhuma lógica de negócio dentro de componentes de template

4. Boas Práticas Obrigatórias

Componentes pequenos e focados em uma única responsabilidade

Uso consistente de Smart vs Dumb Components

Evitar lógica no template

Uso correto do trackBy em listas

Nomes semânticos e padronizados

Código comentado apenas quando necessário

Acessibilidade (ARIA, labels, focus)

5. Roteamento

Rotas bem definidas:

/ → Dashboard

/vehicles → CRUD de veículos

Lazy loading por rota

Uso de provideRouter

6. Estilo e UX

Tema Angular Material customizado

Layout limpo e profissional

Responsividade mobile-first

7. Extras (se aplicável)

Uso de Resolver ou Route Data para pré-carregamento

Guards se fizer sentido

Estrutura preparada para futura integração com backend real

Gere:

Estrutura de pastas

Exemplos de código (componentes, serviço, rotas)

Explicações breves das decisões arquiteturais

O foco principal é qualidade de código Angular, aderência às melhores práticas modernas e facilidade de manutenção.

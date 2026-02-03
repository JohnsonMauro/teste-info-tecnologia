# Sistema de Veículos

Sistema de gerenciamento de veículos.

## 📋 Sobre o Projeto

Aplicação CRUD completa para gerenciamento de veículos, permitindo cadastrar, visualizar, editar e excluir registros de veículos com informações como marca, modelo, ano, placa e cor.

## 🚀 Tecnologias Utilizadas

- **Angular 20.3.0** - Framework frontend
- **Angular Material 20** - Biblioteca de componentes UI
- **TypeScript 5.8** - Linguagem de programação
- **SCSS** - Pré-processador CSS
- **RxJS** - Programação reativa
- **JSON Server** - API REST fake para desenvolvimento

## ✨ Funcionalidades

- ✅ Dashboard com contador de veículos
- ✅ Listagem de veículos em tabela (MatTable)
- ✅ Cadastro de veículos (MatDialog + Reactive Forms)
- ✅ Edição de veículos
- ✅ Exclusão de veículos com confirmação (MatDialog)
- ✅ Feedback visual com notificações (MatSnackBar)
- ✅ Validação de formulários
- ✅ Layout responsivo com sidebar

## 🏗️ Arquitetura

- **Standalone Components** - Componentes independentes sem NgModules
- **Signals** - Gerenciamento de estado reativo
- **OnPush Change Detection** - Otimização de performance
- **Lazy Loading** - Carregamento sob demanda das rotas
- **Feature-based Architecture** - Organização por funcionalidades
- **DDD Principles** - Componentes específicos dentro de suas features

## 📁 Estrutura do Projeto

```
src/app/
├── components/           # Componentes compartilhados
│   └── confirm-dialog/
├── core/                 # Configurações e utilitários
│   ├── config/           # Tokens de injeção e configurações
│   └── directives/       # Diretivas reutilizáveis
├── database/             # Banco de dados JSON Server
│   └── db.json
├── layout/               # Componentes de layout
│   ├── aside/
│   ├── footer/
│   ├── header/
│   └── main/
├── pages/                # Páginas da aplicação
│   ├── dashboard/
│   ├── not-found/
│   └── vehicles/
│       ├── components/   # Componentes específicos da feature
│       └── models/       # Interfaces e tipos da feature
└── services/             # Serviços da aplicação
```

## 🛠️ Como Executar

### Pré-requisitos

- Node.js 22+
- npm ou yarn

### Instalação

```bash
npm install
```

### Executando a aplicação

A aplicação utiliza JSON Server como API REST fake para persistência de dados.

```bash
# Terminal 1 - Iniciar o JSON Server (API)
npm run server

# Terminal 2 - Iniciar o Angular (Frontend)
npm start
```

Ou execute ambos simultaneamente:

```bash
npm run dev
```

| Serviço          | URL                    |
| ---------------- | ---------------------- |
| Frontend Angular | http://localhost:4200/ |
| API JSON Server  | http://localhost:3000/ |

### Build

```bash
npm run build
```

## 📝 Licença

Este projeto está sob a licença MIT.

# Sistema de Veículos

Sistema de gerenciamento de veículos desenvolvido com Angular 20 e Angular Material 20.

## 📋 Sobre o Projeto

Aplicação CRUD completa para gerenciamento de veículos, permitindo cadastrar, visualizar, editar e excluir registros de veículos com informações como marca, modelo, ano, placa e cor.

## 🚀 Tecnologias Utilizadas

- **Angular 20.3.0** - Framework frontend
- **Angular Material 20** - Biblioteca de componentes UI
- **TypeScript 5.8** - Linguagem de programação
- **SCSS** - Pré-processador CSS
- **RxJS** - Programação reativa

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
├── components/          # Componentes compartilhados
│   └── confirm-dialog/
├── layout/              # Componentes de layout
│   ├── header/
│   ├── aside/
│   ├── main/
│   └── footer/
├── models/              # Interfaces e tipos
├── pages/               # Páginas da aplicação
│   ├── dashboard/
│   └── vehicles/
│       └── components/  # Componentes específicos da feature
└── services/            # Serviços da aplicação
```

## 🛠️ Como Executar

### Pré-requisitos

- Node.js 24+
- npm ou yarn

### Instalação

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm start
```

Acesse `http://localhost:4200/` no navegador.

### Build

```bash
npm run build
```

## 📝 Licença

Este projeto está sob a licença MIT.

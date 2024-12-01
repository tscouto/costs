# Costs - Gerenciamento de Projetos

O **Costs** é um aplicativo web desenvolvido para auxiliar no gerenciamento de projetos, permitindo que os usuários criem, editem e visualizem projetos, além de adicionarem serviços específicos para cada projeto. Com foco na simplicidade e praticidade, o aplicativo oferece uma interface intuitiva e funcionalidades essenciais para o controle financeiro de projetos.

## Funcionalidades

- **Cadastro de Projetos**: Permite criar novos projetos com informações como nome, descrição e custos iniciais.
- **Adição de Serviços**: O usuário pode adicionar serviços aos projetos, controlando os custos de cada serviço.
- **Exibição de Projetos**: O aplicativo exibe todos os projetos cadastrados, permitindo ao usuário visualizar os detalhes de cada um.

## Imagens das telas
- **Tela Principal:
![Menu principal](https://github.com/user-attachments/assets/1f3e3afb-c59a-4d43-8dcb-93421b6cec20)

- **Adição de Serviços:
- ![Tela de criar](https://github.com/user-attachments/assets/02b831bd-5413-4eb9-ad93-65619fcaea14)


## Tecnologias Utilizadas

- **Frontend**: React.js
- **Backend**: Node.js (Express) com JSON Server para simular o backend
- **Estilos**: CSS Modules
- **Gerenciamento de Rotas**: React Router
- **Gerenciamento de Estado**: useState e useEffect
- **Bibliotecas**:
  - React
  - React Router DOM
  - JSON Server (simula um banco de dados local)
  - React Icons (para ícones sociais)

## Como Rodar o Projeto

### Passo 1: Clonar o Repositório

Primeiramente, clone o repositório do projeto para sua máquina local:

```bash
git clone https://github.com/tscouto/costs.git
```

Passo 2: Instalar Dependências
Após clonar o repositório, navegue até a pasta do projeto e instale as dependências necessárias utilizando o npm:

```bash
cd costs
npm install
```

Passo 3: Rodar o Projeto
Com as dependências instaladas, basta rodar o projeto em seu ambiente local com o comando abaixo:

```bash
npm start
```
Isso iniciará o servidor de desenvolvimento e abrirá o aplicativo no seu navegador.

Passo 4: Simulação de Backend
Como o projeto usa o JSON Server para simular o backend, inicie o servidor JSON com o seguinte coman

```bash
npm run server




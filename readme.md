# 💄 Beauty IA — Assistente Virtual de Beleza

O **Beauty IA** é uma aplicação web interativa de chatbot voltada para o universo de **beleza, cosméticos, maquiagem, skincare e cuidados corporais**.

O sistema utiliza a **API do Azure OpenAI** para fornecer recomendações personalizadas, rotinas de cuidados e dicas de beleza em tempo real.

---

## 🚀 Funcionalidades

### 💻 Interface Web Responsiva

- Layout moderno com tema visual voltado para beleza e cosméticos.
- Design responsivo para **desktop e dispositivos móveis**.
- Interface intuitiva e fácil de utilizar.

### ✨ Atalhos por Categorias

A aplicação possui botões laterais para facilitar o envio de dúvidas relacionadas a:

- 💇 **Cabelos**
- 🧴 **Skincare**
- 💄 **Maquiagem**
- 🌸 **Perfumes**
- 💅 **Unhas**
- 🧖 **Corpo**

### 🧠 Gerenciamento de Histórico

- Mantém as últimas interações da conversa.
- Permite que a IA utilize o contexto das mensagens anteriores.
- Proporciona uma conversa mais fluida e precisa.

### 💬 Recursos do Chat

- 📋 Botão para copiar rapidamente as respostas.
- Formatação automática para **negrito, listas e tópicos**.
- 🔄 Botão para iniciar uma nova conversa.
- ❌ Opção para encerrar o atendimento.

### 🖥️ Script CLI em Node.js

O projeto também possui uma versão de **linha de comando (CLI)** para:

- Realizar testes diretamente pelo terminal.
- Demonstrar o funcionamento do chatbot.
- Testar o envio de mensagens e histórico de conversação.

---

## 🛠️ Tecnologias Utilizadas

### Frontend

- **HTML5**
- **CSS3**
  - Gradientes
  - Flexbox
  - Animações
  - Responsividade
- **JavaScript ES6+**
  - Fetch API
  - Manipulação do DOM
  - Clipboard API

### Backend e Integração

- **Node.js** — Ambiente de execução JavaScript.
- **Express** — Criação da API REST.
- **CORS** — Liberação de requisições do frontend.
- **Dotenv** — Gerenciamento de variáveis de ambiente.
- **OpenAI SDK** — Comunicação com o endpoint Azure OpenAI.

---

## 📁 Estrutura do Projeto

```text
.
├── index.html          # Interface gráfica do usuário
├── server.js           # Servidor Express / Rota POST /chat
├── cli.js              # Script CLI interativo via readline
├── .env                # Variáveis de ambiente
├── package.json        # Dependências e scripts do Node.js
└── README.md           # Documentação do projeto
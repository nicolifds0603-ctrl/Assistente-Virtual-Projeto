Beauty IA — Assistente Virtual de Beleza
Beauty IA é uma aplicação web interativa de chatbot voltada para o universo de beleza, cosméticos, maquiagem, skincare e cuidados corporais. O sistema utiliza a API do Azure OpenAI para fornecer recomendações personalizadas, rotinas de cuidados e dicas estilizadas em tempo real.

🚀 Funcionalidades
Interface Web Responsiva: Layout moderno com tema visual voltado para beleza e cosméticos, otimizado para desktop e dispositivos móveis.

Atalhos por Categorias: Botões laterais para envio rápido de dúvidas frequentes sobre Cabelos, Skincare, Maquiagem, Perfumes, Unhas e Corpo.

Gerenciamento de Histórico: Retenção das últimas interações no contexto para manter a conversação fluida e precisa.

Recursos do Chat:

Botão de cópia rápida das respostas.

Formatação automática para negrito, listas e tópicos.

Botões para iniciar nova conversa ou encerrar o atendimento.

Scripts CLI em Node.js: Inclui versões em linha de comando (terminal) para testes rápidos e demonstração do envio de contexto/histórico.

🛠️ Tecnologias Utilizadas
Frontend
HTML5 & CSS3 (Gradient Design, Flexbox, Animations, Responsividade)

JavaScript (ES6+) (Fetch API, Manipulação de DOM, Clipboard API)

Backend & Integração
Node.js (Ambiente de execução)

Express (Criação da API REST)

CORS (Liberação de requisições do frontend)

Dotenv (Gerenciamento de variáveis de ambiente)

OpenAI SDK (Comunicação com o endpoint Azure OpenAI)

📁 Estrutura do Projeto
.
├── index.html          # Interface gráfica do usuário (Chat da Beauty IA)
├── server.js           # Servidor Express / Rota POST /chat
├── cli.js              # Script CLI interativo via readline (opcional/testes)
├── .env                # Variáveis de ambiente (chave de API)
├── package.json        # Dependências e scripts do Node.js
└── README.md           # Documentação do projeto

⚙️ Pré-requisitos
Node.js v18 ou superior.

Uma chave de API válida configurada no serviço Azure OpenAI / OpenAI.

📦 Configuração e Instalação
Instale as dependências:

Bash
npm install express cors dotenv openai
Configure o arquivo .env:
Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:

Snippet de código
OPENAI_API_KEY=sua_chave_de_api_aqui
Configuração de Variáveis de Endpoint:
Verifique no arquivo server.js se a URL do endpoint do Azure OpenAI e o deploymentName estão corretos:

JavaScript
const endpoint = "https://turmagpt.services.ai.azure.com/openai/v1";
const deploymentName = "gpt-5.6-luna";
🏃‍♂️ Como Executar
1. Iniciar o Servidor Backend
No terminal, execute:

Bash
node server.js
O servidor estará rodando em: http://localhost:3000.

2. Abrir o Frontend
Abra o arquivo index.html em qualquer navegador web moderno.

3. (Opcional) Executar o Chat via Terminal (CLI)
Se desejar testar o chatbot diretamente no console:

Bash
node cli.js
📌 Rotas da API
POST /chat
Envia a mensagem atual do usuário e o histórico de mensagens para a IA.

Payload Exemplo:

JSON
{
  "mensagem": "Qual é a melhor ordem de produtos para skincare?",
  "historico": [
    { "role": "user", "content": "Olá!" },
    { "role": "assistant", "content": "Oi! 💗 Como posso te ajudar?" }
  ]
}
Resposta Exemplo:

JSON
{
  "response": "A ordem ideal para a rotina de skincare diurna é:\n1. Sabonete facial\n2. Tônico\n3. Sérum (ex: Vitamina C)\n4. Hidratante\n5. Protetor solar"
}
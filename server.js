import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

/*
 * CONFIGURAÇÃO DA OPENAI
 *
 * Mantemos exatamente a configuração
 * que já estava funcionando no seu projeto.
 */

const endpoint =
    "https://turmagpt.services.ai.azure.com/openai/v1";

const deploymentName =
    "gpt-5.6-luna";

const apiKey =
    process.env.OPENAI_API_KEY;


/*
 * Verifica apenas se a chave foi carregada.
 *
 * Não mostra a chave no terminal.
 */

console.log(
    "API Key carregada:",
    !!apiKey
);


const openai = new OpenAI({
    baseURL: endpoint,
    apiKey: apiKey
});


/*
 * SYSTEM PROMPT
 *
 * Define a personalidade e o comportamento
 * da Beauty IA.
 */

const systemPrompt = `

Você é a Beauty IA, uma assistente virtual especializada
em beleza, cosméticos e cuidados pessoais.

Sua função é ajudar o usuário a encontrar produtos,
rotinas e ideias relacionadas a:

- cuidados com a pele;
- skincare;
- cabelo;
- shampoos;
- condicionadores;
- máscaras;
- cremes;
- leave-ins;
- finalizadores;
- produtos para cabelos ressecados, oleosos ou danificados;
- unhas;
- cuidados com as mãos e pés;
- cuidados com o corpo;
- hidratantes;
- sabonetes;
- séruns;
- perfumes;
- maquiagem;
- proteção solar;
- produtos de beleza em geral.

Você deve agir como uma consultora virtual de beleza,
sendo amigável, educada, clara, criativa e acolhedora.

Seu principal objetivo é ajudar o usuário a descobrir
o que pode ser mais adequado para suas necessidades,
preferências e orçamento.

Sempre que fizer uma recomendação, procure considerar:

1. O objetivo do usuário;
2. O tipo de pele ou cabelo, quando essa informação
   for relevante;
3. A rotina e as preferências do usuário;
4. O orçamento informado;
5. A facilidade de encontrar o produto;
6. Diferentes alternativas de marcas e preços.

Quando o usuário pedir indicação de produtos,
você pode citar marcas conhecidas e apresentar
alternativas mais acessíveis quando possível.

Não trate uma marca ou produto como universalmente
melhor para todas as pessoas.

Explique brevemente por que determinada categoria
de produto pode ser interessante.

Quando faltarem informações importantes,
faça perguntas simples antes de dar uma recomendação
muito específica.

Para cabelo, quando relevante, você pode perguntar:

- Qual é o tipo do seu cabelo?
- Ele é natural, tingido ou possui química?
- O principal problema é ressecamento, frizz,
  oleosidade, quebra ou outro?

Para skincare, quando relevante, você pode perguntar:

- Qual é o seu tipo de pele?
- Ela é oleosa, seca, mista ou sensível?
- Qual é o objetivo principal da rotina?

Não faça diagnósticos médicos.

Não prometa que um cosmético irá curar uma doença,
infecção ou condição médica.

Se o usuário apresentar sintomas intensos,
persistentes, dolorosos, feridas, inflamações importantes,
queda de cabelo intensa ou qualquer situação que possa
precisar de avaliação profissional, recomende procurar
um dermatologista ou outro profissional de saúde adequado.

Evite recomendar procedimentos perigosos ou ensinar
formas inseguras de utilizar produtos químicos.

Tenha cuidado especial com produtos de uso profissional,
progressivas, alisamentos e produtos químicos.

Sempre incentive o usuário a seguir as instruções
do fabricante e, quando necessário, procurar um profissional.

Nunca incentive o usuário a misturar produtos químicos
sem orientação adequada.

Não julgue a aparência, o corpo, a pele ou o cabelo
do usuário.

Seu objetivo é ajudar a pessoa a se sentir mais segura
e informada sobre suas escolhas de beleza.

Use linguagem simples e natural em português do Brasil.

Você pode usar emojis de maneira moderada para deixar
a conversa mais agradável.

Quando o usuário perguntar algo que não tenha relação
com beleza, cosméticos ou cuidados pessoais, explique
educadamente que sua especialidade é beleza e cosméticos
e tente direcionar a conversa para esse tema.

`;


/*
 * ROTA INICIAL
 */

app.get("/", (req, res) => {

    res.send(
        "Beauty IA - servidor funcionando!"
    );

});


/*
 * POST /chat
 *
 * Entrada:
 *
 * {
 *   "mensagem": "Oi"
 * }
 *
 * Também aceita o histórico:
 *
 * {
 *   "mensagem": "Oi",
 *   "historico": [...]
 * }
 */

app.post("/chat", async (req, res) => {

    try {

        const mensagemUsuario =
            req.body.mensagem;

        const historico =
            req.body.historico || [];


        /*
         * Verifica se a mensagem é válida.
         */

        if (
            !mensagemUsuario ||
            typeof mensagemUsuario !== "string"
        ) {

            return res.status(400).json({

                error:
                    "Digite uma mensagem válida."

            });

        }


        /*
         * Monta o histórico da conversa.
         *
         * O histórico continua sendo armazenado
         * no front-end através de:
         *
         * let messages = [];
         *
         * Aqui transformamos esse histórico
         * em texto para manter compatibilidade
         * com a chamada da API que já funcionava.
         */

        let contextoHistorico = "";

        if (Array.isArray(historico)) {

            contextoHistorico = historico
                .filter(
                    mensagem =>
                        mensagem.role === "user" ||
                        mensagem.role === "assistant"
                )
                .map(
                    mensagem => {

                        const autor =
                            mensagem.role === "user"
                                ? "Usuário"
                                : "Beauty IA";

                        return `${autor}: ${mensagem.content}`;

                    }
                )
                .join("\n");

        }


        /*
         * Monta a mensagem que será enviada
         * para a OpenAI.
         *
         * Mantemos o input como TEXTO,
         * da mesma forma que estava no código
         * original que funcionava.
         */

        let inputParaIA = mensagemUsuario;


        if (contextoHistorico) {

            inputParaIA = `
Histórico da conversa:

${contextoHistorico}

Nova mensagem do usuário:

${mensagemUsuario}

Responda à nova mensagem considerando
o contexto da conversa acima.
`;

        }


        /*
         * Chamada da OpenAI
         *
         * Esta parte mantém o formato
         * compatível com o código original.
         */

        const response =
            await openai.responses.create({

                model: deploymentName,

                input: inputParaIA,

                instructions: systemPrompt

            });


        /*
         * Obtém a resposta da IA.
         */

        const respostaChat =
            response.output_text;


        /*
         * Retorna a resposta no formato
         * solicitado pelo projeto.
         */

        res.json({

            response: respostaChat

        });

    } catch (erro) {

        console.error(
            "ERRO COMPLETO DA API:"
        );

        console.error(erro);


        res.status(500).json({

            error:
                "Não foi possível obter uma resposta da IA.",

            detalhe:
                erro.message

        });

    }

});


/*
 * INICIA O SERVIDOR
 */

app.listen(
    3000,
    () => {

        console.log(
            "Beauty IA rodando na porta 3000"
        );

    }
);
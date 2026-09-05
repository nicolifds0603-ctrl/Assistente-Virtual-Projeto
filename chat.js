/* import OpenAI from "openai";
import readline from "readline/promises"
import dotenv from "dotenv"

dotenv.config()

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const endpoint = "https://turmagpt.services.ai.azure.com/openai/v1";
const deploymentName = "gpt-5.6-luna";
const apiKey = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
    baseURL: endpoint,
    apiKey: apiKey
});

async function main() {

    let historico = [
        {
            "role": "system",
            "content": "Você é um chatbot de IA, responde sempre em português. Responda apenas sobre futebol"
        }
    ]

    console.log("\n\n ============== CHAT INICIADO =============")

    while (true) {

        let mensagem = await rl.question("\nVocê: ")

        if (mensagem.toLowerCase() == "sair") {
            console.log("Encerrando o chat...")
            break;
        }

        historico.push(
            {
                "role": "user",
                "content": mensagem
            }
        )

        const response = await openai.responses.create({
            model: deploymentName,
            input: mensagem,
        });

        historico.push(
            {
                "role": "assistant",
                "content": response.output_text
            }
        )


        console.log 

        console.log("\nChat:", response.output_text);

          //console.log("-------- historico--------")
          //console.log(historico)
    }
    rl.close()
}

main() */



//---------------------------------------


/*import OpenAI from "openai";
import readline from "readline/promises"
import dotenv from "dotenv"

dotenv.config()

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const endpoint = "https://turmagpt.services.ai.azure.com/openai/v1";
const deploymentName = "gpt-5.6-luna";
const apiKey = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
    baseURL: endpoint,
    apiKey: apiKey
});

async function main() {

    let historico = [
        {
            "role": "system",
            "content": "Você é um chatbot de IA, responda sempre em português. Responda apenas questões sobre futebol"
        }
    ]

    console.log("\n\n ============== CHAT INICIADO =============")

    while (true) {

        let mensagem = await rl.question("\nVocê: ")

        if (mensagem.toLowerCase() == "sair") {
            console.log("Encerrando o chat...")
            break;
        }

        historico.push(
            {
                "role": "user",
                "content": mensagem
            }
        )

        const response = await openai.responses.create({
            model: deploymentName,
            input: historico,
        });

        let respostaChat = response.output_text

        historico.push(
            {
                "role": "assistant",
                "content": respostaChat
            }
        )

        console.log("\nChat:", respostaChat);

        // console.log("\n------ historico----------")
        // console.log(historico)
    }
    rl.close()
}

main()*/






//---------------------------------------------------------------



import OpenAI from "openai";
import readline from "readline/promises";
import dotenv from "dotenv";

dotenv.config();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const endpoint = "https://turmagpt.services.ai.azure.com/openai/v1";

const deploymentName ="gpt-5.6-luna";

const apiKey = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
    baseURL: endpoint,
    apiKey: apiKey
});

// System Prompt separado do histórico
const systemPrompt = {
    role: "system",
    content: "Você é um chatbot de IA, responda sempre em português."
};

// Histórico guarda somente as perguntas e respostas
let historico = [];

async function main() {

    console.log("\n\n ============== CHAT INICIADO =============");

    while (true) {

        let mensagem = await rl.question("\nVocê: ");

        if (mensagem.toLowerCase() == "sair") {
            console.log("Encerrando o chat...");
            break;
        }

        // Adiciona a pergunta do usuário
        historico.push({
            role: "user",
            content: mensagem
        });

        const response = await openai.responses.create({
            model: deploymentName,
            input: [
                systemPrompt,
                ...historico
            ]
        });

        let respostaChat = response.output_text;

        // Adiciona a resposta da IA
        historico.push({
            role: "assistant",
            content: respostaChat
        });

        // Mantém somente as últimas 10 perguntas e respostas
        if (historico.length > 20) {
            historico = historico.slice(-20);
        }

        console.log("\nChat:", respostaChat);
    }

    rl.close();
}

main();
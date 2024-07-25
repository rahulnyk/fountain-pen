
// import { signatureGenerator } from "./utils";
import axios from "axios";
import { getHeaders, readEnvProperty } from "./utils";
import { ChatCompletion } from "openai/resources/index.mjs";


export async function wmChatCompletions(body: any): Promise<ChatCompletion> {

    console.log("\n\n\n\n I Am In \n\n\n\n\n");

    const requestBody = {
        "model": readEnvProperty("WALMART_GATEWAY_MODEL", true),
        "task": "chat/completions",
        "api-version": readEnvProperty("WALMART_GATEWAY_API_VERSION", true),
        "model-version": readEnvProperty("WALMART_GATEWAY_MODEL_VERSION", true),
        "model-params": {
            "messages": body.messages
        }
    }
    const headers = getHeaders();
    let choices: ChatCompletion
    const res = await axios.post(readEnvProperty("WALMART_GATEWAY_BASEURL", true), requestBody, { headers: headers });
    choices = res.data;
    return choices;
}
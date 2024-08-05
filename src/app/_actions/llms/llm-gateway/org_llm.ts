// import { signatureGenerator } from "./utils";
import axios from "axios";
import { getHeaders } from "./utils";
import { readEnvProperty } from "../../helpers/read_env_properties";
import { ChatCompletion } from "openai/resources/index.mjs";

export async function orgChatCompletions(body: any): Promise<ChatCompletion> {
    const requestBody = {
        model: readEnvProperty("MODEL", true),
        task: "chat/completions",
        "api-version": readEnvProperty("ORG_GATEWAY_API_VERSION", true),
        "model-version": readEnvProperty("ORG_GATEWAY_MODEL_VERSION", true),
        "model-params": {
            messages: body.messages,
        },
    };
    const headers = getHeaders();
    let choices: ChatCompletion;
    const res = await axios.post(
        readEnvProperty("ORG_GATEWAY_BASEURL", true),
        requestBody,
        { headers: headers }
    );
    choices = res.data;
    return choices;
}

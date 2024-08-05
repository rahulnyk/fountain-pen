import crypto from "crypto";
import { readEnvProperty } from "../../helpers/read_env_properties";

export interface ServiceRegistrySignature {
    signature: string;
    timestamp: string;
}

export function getHeaders() {
    const headers = { "x-api-key": readEnvProperty("ORG_API_KEY", true) };

    if (!headers["x-api-key"]) {
        throw new Error(
            "Missing required environment variables ORG_API_KEY. This is required for request header."
        );
    }
    return headers;
}

import crypto from 'crypto';
export interface ServiceRegistrySignature {
  signature: string,
  timestamp: string
}

export const signatureGenerator = (wnConsumerId: string, privateKey: string, keyVersion: string): ServiceRegistrySignature => {
  const epoch_time_ms = Date.now();
  const timestampStr: string = `${epoch_time_ms}`
  const data = `${wnConsumerId}\n${epoch_time_ms}\n${keyVersion}\n`;
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(data);
  const signature = signer.sign(privateKey, 'base64');

  return {
    signature: signature,
    timestamp: timestampStr
  };
};

export function getHeaders() {
  const headers = { 'x-api-key': readEnvProperty("WALMART_API_KEY", true) }
  // const gatewayBaseUrl = readEnvProperty("WALMART_GATEWAY_BASEURL", true);

  if (!headers['x-api-key']) {
    throw new Error('Missing required environment variables WALMART_API_KEY. This is required for request header.')
    // console.error('Missing required environment variables WALMART_API_KEY. This is required for request header.');
    // return [];
  }
  return headers;
}

export function readEnvProperty(propertyKey: string, required: boolean): string {
  if (process.env[propertyKey] == undefined && required) {
    throw new Error("Please add " + propertyKey + " in your .env.local file");
  }
  return process.env[propertyKey] ? process.env[propertyKey] as string : "";
}
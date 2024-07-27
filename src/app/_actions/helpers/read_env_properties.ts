

export function readEnvProperty(propertyKey: string, required: boolean): string {
    if (process.env[propertyKey] == undefined && required) {
      throw new Error("Please add " + propertyKey + " in your .env.local file");
    }
    return process.env[propertyKey] ? process.env[propertyKey] as string : "";
  }
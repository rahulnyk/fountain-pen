
import { Document } from "langchain/document";
import { ChatCompletion } from "openai/resources/index.mjs";


export interface ReturnParams {
    data: any,
    error?: string | null | undefined
    message?: string | undefined
}

export interface SearchResults extends Omit<ReturnParams, 'data'> {
    documents: Document<Record<string, any>>[],
}



export type Outline = {
    level: string;
    text: string;
    description?: string;
};

export interface OutlineResponse extends ReturnParams {
    data: Outline[];
}

export interface ContentSuggestionResponse extends ReturnParams {
    data: string;
}
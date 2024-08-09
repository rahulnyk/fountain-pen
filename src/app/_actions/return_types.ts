
import { Document } from "langchain/document";
import { ChatCompletion } from "openai/resources/index.mjs";


export interface ReturnParams {
    data: any,
    error?: string | null | undefined
    message?: string | undefined
}

export type WritingPointResponse = ReturnParams & {
    data: string;
}

export interface SearchResults extends Omit<ReturnParams, 'data'> {
    documents: Document<Record<string, any>>[],
}

export type Section = {
    level: string;
    text: string;
    description?: string;
};

export type OutlineResponse =  ReturnParams & ({
    data: Section[] ;
    dataType?: 'json';
} | {
    data: string;
    dataType?: 'string';
})

export interface ContentSuggestionResponse extends ReturnParams {
    data: string;
}

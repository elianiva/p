import { IHighlighter } from "@/business/PasteDomain/interfaces/IHighlighter";

/**
 * Doesn't actually highlight stuff. It just adds a prefix to the text.
 */
export class DumbHighlighter implements IHighlighter {
    public highlight(text: string, language: string): string {
        return `*pretend that I've been highlighted as ${language}*\n\n${text}`;
    }
}

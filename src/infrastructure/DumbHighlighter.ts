import { IHighlighter } from "@/business/PasteDomain/interfaces/IHighlighter";

/**
 * Doesn't actually highlight stuff. It just escape the text and adds a prefix to the text.
 */
export class DumbHighlighter implements IHighlighter {
    // escape html characters for the injected data just to be safe
    private _escape(str: string): string {
        return str
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    public highlight(text: string, language: string): string {
        return `*pretend that I've been highlighted as ${language}*\n\n${this._escape(
            text
        )}`;
    }
}

import { PasteError } from "@/business/PasteDomain/PasteError";
import type { IHighlighter } from "@/business/PasteDomain/interfaces/IHighlighter";

export class Paste {
    private readonly _id: string;
    private readonly _text: string;
    private readonly _language: string | undefined;
    private readonly _highlighter: IHighlighter;

    constructor(
        id: string,
        text: string,
        language: string | undefined,
        highlighter: IHighlighter
    ) {
        if (id.length === 0) {
            throw new PasteError("id must not be empty");
        }

        if (text.length === 0) {
            throw new PasteError("text must not be empty");
        }

        this._id = id;
        this._text = text;
        this._language = language;
        this._highlighter = highlighter;
    }

    public get asPlainText(): string {
        return this._text;
    }

    public get asHighlightedText(): string {
        if (this._language === undefined) {
            throw new PasteError("language must be defined for highlighting");
        }
        
        return this._highlighter.highlight(this._text, this._language);
    }
}

import { PasteError } from "@/business/PasteDomain/PasteError";

export class Paste {
    private readonly _id: string;
    private readonly _text: string;
    private readonly _language: string;

    constructor(id: string, text: string, language: string) {
        if (id.length === 0) {
            throw new PasteError("id must not be empty");
        }

        if (text.length === 0) {
            throw new PasteError("text must not be empty");
        }

        this._id = id;
        this._text = text;
        this._language = language;
    }

    public get asPlainText(): string {
        return this._text;
    }

    // TODO: implementation
    public get asHighlightedText(): string {
        return this._text;
    }
}

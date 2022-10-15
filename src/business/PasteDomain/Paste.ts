import { PasteError } from "@/business/PasteDomain/PasteError";
import type { IHighlighter } from "@/business/PasteDomain/interfaces/IHighlighter";

type PasteConstructor = {
    id: string;
    text: string;
    language?: string;
    extension?: string;
    highlighter: IHighlighter;
};

export class Paste {
    private readonly _id: string;
    private readonly _text: string;
    private readonly _language: string | undefined;
    private readonly _extension: string | undefined;
    private readonly _highlighter: IHighlighter;

    constructor(opts: PasteConstructor) {
        if (opts.id.length === 0) {
            throw new PasteError("id must not be empty");
        }

        if (opts.text.length === 0) {
            throw new PasteError("text must not be empty");
        }

        this._id = opts.id;
        this._text = opts.text;
        this._language = opts.language;
        this._extension = opts.extension;
        this._highlighter = opts.highlighter;
    }

    public get language(): string | undefined {
        return this._language;
    }

    public get extension(): string | undefined {
        return this._extension;
    }

    public get asPlainText(): string {
        return this._text;
    }

    public get asHighlightedText(): string {
        if (this._language === undefined) {
            throw new PasteError("language must be defined for highlighting");
        }

        try {
            return this._highlighter.highlight(this._text, this._language);
        } catch {
            // fallback to plain text when it fails but give a warning
            return `WARNING! <b>${this._language}</b> file extension is not supported, try another file extension to get syntax highlighting.\n\n${this._text}`;
        }
    }
}

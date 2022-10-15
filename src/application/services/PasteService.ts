import { Paste } from "@/business/PasteDomain/Paste";
import { PasteError } from "@/business/PasteDomain/PasteError";
import type { IHighlighter } from "@/business/PasteDomain/interfaces/IHighlighter";
import type { ILanguageDetector } from "@/business/PasteDomain/interfaces/ILanguageDetector";
import type { IStorage } from "@/application/interfaces/IStorage";
import { customAlphabet } from "nanoid";

export class PasteService {
    private readonly _storage: IStorage;
    private readonly _highlighter: IHighlighter;
    private readonly _languageDetector: ILanguageDetector;
    private readonly _generateId = customAlphabet(
        // I don't like seeing - or _ so we use a custom alphabet to remove them
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
        21
    );

    constructor(storage: IStorage, highlighter: IHighlighter, languageDetector: ILanguageDetector) {
        this._storage = storage;
        this._highlighter = highlighter;
        this._languageDetector = languageDetector;
    }

    public async createNewPaste(text: string): Promise<string | undefined> {
        try {
            const id = this._generateId();
            await this._storage.set(id, text);
            return id;
        } catch (error) {
            if (error instanceof Error) {
                throw new PasteError(error.message);
            }
        }
    }

    public async getPaste(
        id: string,
        languageExtension: string | undefined
    ): Promise<Paste | undefined> {
        try {
            const pasteAsString = await this._storage.get(id);
            if (pasteAsString === undefined) return undefined;

            let extension: string | undefined;
            let language: string | undefined;

            if (languageExtension !== undefined && languageExtension !== "") {
                extension = languageExtension;
                language = this._languageDetector.getLanguageFromExtension(extension);
            } else {
                language = this._languageDetector.detectLanguage(pasteAsString);
                extension = this._languageDetector.getExtensionFromlanguage(language);
            }

            return new Paste({
                id,
                text: pasteAsString,
                highlighter: this._highlighter,
                extension,
                language,
            });
        } catch (error) {
            if (error instanceof Error) {
                throw new PasteError(error.message);
            }
            throw new PasteError("unknown error");
        }
    }
}

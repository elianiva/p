import { Paste } from "@/business/PasteDomain/Paste";
import { PasteError } from "@/business/PasteDomain/PasteError";
import type { IHighlighter } from "@/business/PasteDomain/interfaces/IHighlighter";
import type { IStorage } from "@/application/interfaces/IStorage";
import { customAlphabet } from "nanoid";

export class PasteService {
    private readonly _storage: IStorage;
    private readonly _ttl: number;
    private readonly _highlighter: IHighlighter;
    private readonly _generateId = customAlphabet(
        // I don't like seeing - or _ so we use a custom alphabet to remove them
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
        21
    );

    constructor(storage: IStorage, ttl: number, highlighter: IHighlighter) {
        this._storage = storage;
        this._ttl = ttl;
        this._highlighter = highlighter;
    }

    public async createNewPaste(text: string): Promise<string | undefined> {
        try {
            const id = this._generateId();
            await this._storage.set(id, text, this._ttl);
            return id;
        } catch (error) {
            if (error instanceof Error) {
                throw new PasteError(error.message);
            }
        }
    }

    public async getPaste(
        id: string,
        language: string | undefined
    ): Promise<Paste | undefined> {
        try {
            const pasteAsString = await this._storage.get(id);
            if (pasteAsString === undefined) return undefined;

            return new Paste(id, pasteAsString, language, this._highlighter);
        } catch (error) {
            if (error instanceof Error) {
                throw new PasteError(error.message);
            }
        }
    }
}

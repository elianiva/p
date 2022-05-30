import { Paste } from "@/business/PasteDomain/Paste";
import { PasteError } from "@/business/PasteDomain/PasteError";
import type { IStorage } from "@/application/interfaces/IStorage";

export class PasteService {
    private readonly _storage: IStorage;
    private readonly _ttl: number;

    constructor(storage: IStorage, ttl: number) {
        this._storage = storage;
        this._ttl = ttl;
    }

    public async createNewPaste(id: string, text: string): Promise<void> {
        try {
            await this._storage.set(id, text, this._ttl);
        } catch (error) {
            if (error instanceof Error) {
                throw new PasteError(error.message);
            }
        }
    }

    public async getPaste(
        id: string,
        language = "text"
    ): Promise<Paste | undefined> {
        try {
            const pasteAsString = await this._storage.get(id);
            if (pasteAsString === undefined) return undefined;

            const paste = new Paste(id, pasteAsString, language);
            return paste;
        } catch (error) {
            if (error instanceof Error) {
                throw new PasteError(error.message);
            }
        }
    }
}

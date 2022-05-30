import type { IStorage } from "@/application/interfaces/IStorage";

/**
 * A dead simple in-memory storage with no TTL support.
 */
export class MemoryStorage implements IStorage {
    private readonly _storage: Map<string, string>;

    constructor() {
        this._storage = new Map();
    }

    public async get(key: string): Promise<string | undefined> {
        return this._storage.get(key);
    }

    public async set(key: string, value: string, _ttl: number): Promise<void> {
        this._storage.set(key, value);
    }
}

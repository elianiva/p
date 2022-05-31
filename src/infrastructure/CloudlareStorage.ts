import { IStorage } from "@/application/interfaces/IStorage";

/**
 * Cloudflare KV Storage
 */
export class CloudflareStorage implements IStorage {
    private readonly _kv: KVNamespace;

    constructor(kv: KVNamespace) {
        this._kv = kv;
    }

    public async get(key: string): Promise<string | undefined> {
        const item = await this._kv.get(key);
        if (item === null) return undefined;
        return item;
    }

    public async set(key: string, value: string, ttl: number): Promise<void> {
        await this._kv.put(key, value, { expirationTtl: ttl });
    }
}

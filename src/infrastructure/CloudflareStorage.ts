import { IStorage } from "@/application/interfaces/IStorage";

/**
 * Cloudflare KV Storage
 */
export class CloudflareStorage implements IStorage {
    private readonly _kv: KVNamespace;
    private readonly _ttl: number;

    constructor(kv: KVNamespace, ttl: number) {
        this._kv = kv;
        this._ttl = ttl;
    }

    public async get(key: string): Promise<string | undefined> {
        const item = await this._kv.get(key);
        if (item === null) return undefined;
        return item;
    }

    public set(key: string, value: string): Promise<void> {
        return new Promise((resolve) => resolve());
        // return this._kv.put(key, value, { expirationTtl: this._ttl });
    }
}

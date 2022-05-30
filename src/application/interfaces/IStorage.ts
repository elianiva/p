export interface IStorage {
    get(key: string): Promise<string | undefined>;
    set(key: string, value: string, ttl: number): Promise<void>;
}

import { MemoryStorage } from "@/infrastructure/MemoryStorage";
import { describe, expect } from "vitest";

describe("MemoryStorage", (it) => {
    it("should be able to store and retrieve an object", async () => {
        const storage = new MemoryStorage();
        const key = "foo";
        const value = "bar";
        await storage.set(key, value);
        expect(await storage.get(key)).toBe(value);
    });

    it("should throw when trying to store a duplicate", async () => {
        const storage = new MemoryStorage();
        const key = "foo";
        const value = "bar";
        await storage.set(key, value);
        expect(storage.set(key, value)).rejects.toThrowError(
            "Key foo already exists"
        );
    });
});

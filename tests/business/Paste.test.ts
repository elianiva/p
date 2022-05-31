import { beforeAll, describe, expect } from "vitest";
import { Paste } from "@/business/PasteDomain/Paste";
import { DumbHighlighter } from "@/infrastructure/DumbHighlighter";

const highlighter = new DumbHighlighter();

describe("Paste", (it) => {
    it("Should be able to create a new paste", () => {
        const paste = new Paste(
            "abcdef",
            "console.log('foo');",
            "javascript",
            highlighter
        );
        expect(paste.asPlainText).toBe("console.log('foo');");
        expect(paste.asHighlightedText).toBe(
            "*pretend that I've been highlighted as javascript*\n\n" +
                "console.log(&#039;foo&#039;);"
        );
    });

    it("Should throw when trying to get highlighted text without a language", () => {
        const paste = new Paste(
            "abcdef",
            "console.log('foo');",
            undefined,
            highlighter
        );
        expect(() => paste.asHighlightedText).toThrowError(
            "language must be defined for highlighting"
        );
    });

    it("Should throw when trying to instantiate with an empty id", () => {
        expect(
            () => new Paste("", "foo", "javascript", highlighter)
        ).toThrowError("id must not be empty");
    });

    it("Should throw when trying to instantiate with an empty text", () => {
        expect(
            () => new Paste("id", "", "javascript", highlighter)
        ).toThrowError("text must not be empty");
    });
});

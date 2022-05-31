import { Html } from "@/business/HtmlDomain/Html";
import { describe, expect } from "vitest";

describe("HTML", (it) => {
    it("should be able to create a new HTML", () => {
        const html = new Html("<p>Hello</p>");
        expect(html.content).toBe("<p>Hello</p>");
    });

    it("should be able to minify an html", () => {
        const html = new Html(`
        <p>Hello</p>
                            <p>Hello</p>
    <p>Hello</p>
        `);
        expect(html.minify().content).toBe(
            " <p>Hello</p><p>Hello</p><p>Hello</p> "
        );
    });

    it("should be able to interpolate variables", () => {
        const html = new Html(`<p>Hello @Name</p>`);
        expect(html.interpolate({ Name: "John" }).content).toBe(
            "<p>Hello John</p>"
        );
    });

    it("should throw when the given template is empty", () => {
        expect(() => new Html("")).toThrowError("Template must not be empty");
    });
});

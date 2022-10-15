import flourite from "flourite";
import type { ILanguageDetector } from "@/business/PasteDomain/interfaces/ILanguageDetector";

/**
 * A language detector implementation using [flourite](https://github.com/teknologi-umum/flourite)
 */
export class FlouriteDetector implements ILanguageDetector {
    private readonly EXT_TO_LANG_MAPPING: Record<string, string> = {
        js: "javascript",
        ts: "typescript",
        html: "html",
        xml: "xml",
        md: "markdown",
        json: "json",
        php: "php",
        go: "go",
        rs: "rust",
        java: "java",
        cs: "c#",
        cpp: "c++",
        dart: "dart",
        py: "python",
        dockerfile: "dockerfile",
        sql: "sql",
    };

    private readonly LANG_TO_EXT_MAPPING: Record<string, string> = {
        javascript: "js",
        typescript: "ts",
        html: "html",
        xml: "xml",
        md: "markdown",
        json: "json",
        php: "php",
        go: "go",
        rust: "rs",
        java: "java",
        "c#": "cs#",
        "c++": "cpp",
        dart: "dart",
        python: "py",
        dockerfile: "dockerfile",
        sql: "sql",
    };

    public detectLanguage(code: string): string {
        return flourite(code).language.toLowerCase();
    }
    public getExtensionFromlanguage(language: string): string | undefined {
        return this.LANG_TO_EXT_MAPPING[language.toLowerCase()];
    }
    public getLanguageFromExtension(extension: string): string | undefined {
        return this.EXT_TO_LANG_MAPPING[extension.toLowerCase()];
    }
}

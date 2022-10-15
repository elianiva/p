export interface ILanguageDetector {
    detectLanguage(code: string): string;
    getExtensionFromlanguage(language: string): string | undefined;
    getLanguageFromExtension(extension: string): string | undefined;
}

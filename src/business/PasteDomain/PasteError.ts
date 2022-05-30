export class PasteError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "PasteError";
    }
}

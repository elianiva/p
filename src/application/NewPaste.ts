import type { IRoute } from "@/application/interfaces/IRoute";
import type { IEnvironment } from "@/application/interfaces/IEnvironment";
import { PasteService } from "@/application/services/PasteService";
import type { NewPasteRequest } from "@/application/dto/NewPasteRequest";
import type { NewPasteResponse } from "@/application/dto/NewPasteResponse";
import { BadRequest, InternalServerError, Ok } from "@/application/Response";

export class NewPaste implements IRoute {
    public readonly path = "/new-paste";
    public readonly method = "POST";

    private readonly MAX_PASTE_SIZE = 1024 * 1024; // 1MB

    private readonly _pasteService: PasteService;

    constructor(pasteService: PasteService) {
        this._pasteService = pasteService;
    }

    public handler = async (
        request: Request,
        env: IEnvironment,
        ctx: ExecutionContext
    ): Promise<Response> => {
        let data: NewPasteRequest;
        try {
            data = await request.json();
        } catch (err) {
            return new BadRequest<NewPasteResponse>({
                id: null,
                err: "Invalid Content-Type header. Please use application/json for the Content-Type header.",
            });
        }

        const pasteText = data.text;
        if (pasteText === null) {
            return new BadRequest<NewPasteResponse>({ id: null, err: "Missing paste text" });
        }

        if (typeof pasteText !== "string") {
            return new BadRequest<NewPasteResponse>({
                id: null,
                err: "Paste text was not a string.",
            });
        }

        const textSize = new Blob([pasteText]).size;
        if (textSize > this.MAX_PASTE_SIZE) {
            return new BadRequest<NewPasteResponse>({ id: null, err: "Paste text was too large" });
        }

        try {
            const pasteId = await this._pasteService.createNewPaste(pasteText);
            if (pasteId === undefined) {
                return new InternalServerError<NewPasteResponse>({
                    id: null,
                    err: "Paste was not created",
                });
            }

            return new Ok<NewPasteResponse>({ id: pasteId, err: null });
        } catch (err) {
            if (err instanceof Error) {
                return new BadRequest<NewPasteResponse>({ id: null, err: err.message });
            }

            return new InternalServerError<NewPasteResponse>({ id: null, err: "Unknown Error" });
        }
    };
}

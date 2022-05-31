import type { IRoute } from "@/application/interfaces/IRoute";
import type { IEnvironment } from "@/application/interfaces/IEnvironment";
import { PasteService } from "@/application/services/PasteService";
import { NewPasteDTO } from "@/application/dto/NewPasteDTO";

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
        let data: NewPasteDTO;
        try {
            data = await request.json();
        } catch (err) {
            return new Response(
                "Invalid Content-Type header. Please use application/json for the Content-Type header.",
                { status: 400 }
            );
        }

        const pasteText = data.text;
        if (pasteText === null) {
            return new Response("Missing paste text.", {
                status: 400,
            });
        }

        if (typeof pasteText !== "string") {
            return new Response("Paste text was not a string.", {
                status: 400,
            });
        }

        const textSize = new Blob([pasteText]).size;
        if (textSize > this.MAX_PASTE_SIZE) {
            return new Response("Paste text was too large", {
                status: 400,
            });
        }

        try {
            const pasteId = await this._pasteService.createNewPaste(pasteText);
            if (pasteId === undefined) {
                return new Response("Paste was not created.", {
                    status: 500,
                });
            }

            return new Response(pasteId, {
                status: 200,
            });
        } catch (err) {
            if (err instanceof Error) {
                return new Response(err.message, {
                    status: 400,
                });
            }

            return new Response("Unknown Error", {
                status: 500,
            });
        }
    };
}

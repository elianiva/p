import type { IRoute } from "@/application/interfaces/IRoute";
import type { IEnvironment } from "@/application/interfaces/IEnvironment";
import { PasteService } from "@/application/services/PasteService";

export class NewPaste implements IRoute {
    public readonly path = "/new-paste";
    public readonly method = "POST";

    private readonly _pasteService: PasteService;

    constructor(pasteService: PasteService) {
        this._pasteService = pasteService;
    }

    public handler = async (
        request: Request,
        env: IEnvironment,
        ctx: ExecutionContext
    ): Promise<Response> => {
        let data: FormData;
        try {
            data = await request.formData();
        } catch (err) {
            return new Response(
                "Invalid Content-Type header. Please use multipart/form-data or application/x-www-form-urlencoded.",
                {
                    status: 400,
                }
            );
        }

        const pasteId = data.get("id");
        const pasteText = data.get("text");

        if (pasteId === null || pasteText === null) {
            return new Response("Missing paste id or text", {
                status: 400,
            });
        }

        if (typeof pasteId !== "string" || typeof pasteText !== "string") {
            return new Response("Paste id or text is not a string", {
                status: 400,
            });
        }

        try {
            await this._pasteService.createNewPaste(pasteId, pasteText);
            return new Response("OK", {
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

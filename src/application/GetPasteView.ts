import { PasteService } from "@/application/services/PasteService";
import type { IRoute } from "@/application/interfaces/IRoute";
import type { IEnvironment } from "@/application/interfaces/IEnvironment";
import getPasteViewTemplate from "../views/GetPaste.html";

export class GetPasteView implements IRoute {
    public readonly path = /\/([A-Za-z0-9_-]{21}$)/;
    public readonly method = "GET";

    public readonly _pasteService: PasteService;

    constructor(pasteService: PasteService) {
        this._pasteService = pasteService;
    }

    public handler = async (
        request: Request,
        env: IEnvironment,
        ctx: ExecutionContext
    ): Promise<Response> => {
        const url = new URL(request.url);
        const id = url.pathname.split("/")[1];

        const paste = await this._pasteService.getPaste(id);
        if (paste === undefined) {
            return new Response("Paste was not found", {
                status: 404,
            });
        }

        const pasteContent = paste.asPlainText;
        const view = getPasteViewTemplate.replace(
            "@PasteContent",
            pasteContent
        );
        const textStream = new TextEncoder().encode(view);
        return new Response(textStream, {
            status: 200,
        });
    };
}

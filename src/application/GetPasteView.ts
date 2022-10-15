import { Html } from "@/business/HtmlDomain/Html";
import { PasteService } from "@/application/services/PasteService";
import type { IRoute } from "@/application/interfaces/IRoute";
import type { IEnvironment } from "@/application/interfaces/IEnvironment";
import { View } from "@/application/Response";
import getPasteViewTemplate from "../views/GetPaste.html";
import notFoundViewTemplate from "../views/NotFound.html";

export class GetPasteView implements IRoute {
    public readonly path = /\/([A-Za-z0-9]{21})(.\w+)?$/;
    public readonly method = "GET";

    private readonly CACHE_DURATION = 60 * 60 * 24; // 1 day

    private readonly _pasteService: PasteService;

    constructor(pasteService: PasteService) {
        this._pasteService = pasteService;
    }

    public async handler(
        request: Request,
        env: IEnvironment,
        ctx: ExecutionContext
    ): Promise<Response> {
        const url = new URL(request.url);
        const name = url.pathname.split("/")[1];
        let [id, languageExtension] = name.split(".");

        const paste = await this._pasteService.getPaste(id, languageExtension);
        if (paste === undefined) {
            const notFoundView = new Html(notFoundViewTemplate)
                .interpolate({
                    Message: "Paste with an ID of " + id + " can't be found.",
                })
                .minify().content;
            return new View(notFoundView, 404);
        }

        const view = new Html(getPasteViewTemplate).minify().interpolate({
            PasteContent: paste.asHighlightedText,
            Language: paste.language ?? "Unknown",
            Extension: paste.extension ?? "Unknown",
        }).content;

        return new View(view, 200, {
            "Cache-Control": `max-age=${this.CACHE_DURATION}`,
        });
    }
}

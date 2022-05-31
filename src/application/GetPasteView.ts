import { Html } from "@/business/HtmlDomain/Html";
import { PasteService } from "@/application/services/PasteService";
import type { IRoute } from "@/application/interfaces/IRoute";
import type { IEnvironment } from "@/application/interfaces/IEnvironment";
import getPasteViewTemplate from "../views/GetPaste.html";

export class GetPasteView implements IRoute {
    public readonly path = /\/([A-Za-z0-9_-]{21})(.\w+)?$/;
    public readonly method = "GET";

    public readonly _pasteService: PasteService;

    constructor(pasteService: PasteService) {
        this._pasteService = pasteService;
    }

    // escape html characters for the injected data just to be safe
    private _escape(str: string): string {
        return str
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    public async handler(
        request: Request,
        env: IEnvironment,
        ctx: ExecutionContext
    ): Promise<Response> {
        const url = new URL(request.url);
        const name = url.pathname.split("/")[1];
        let [id, language] = name.split(".");

        const paste = await this._pasteService.getPaste(id, language);
        if (paste === undefined) {
            return new Response("Paste was not found", {
                status: 404,
            });
        }

        // don't bother trying to highlight if the language isn't provided
        // this should speed things up a bit since we don't have to do
        // the expensive highlighting
        const pasteContent =
            language === undefined
                ? // we need to escape the text manually since there's not highlighter to handle it
                  this._escape(paste.asPlainText)
                : paste.asHighlightedText;

        const view = new Html(getPasteViewTemplate)
            .minify()
            .interpolate({ PasteContent: pasteContent }).content;

        return new Response(view, {
            status: 200,
            headers: {
                "Content-Type": "text/html",
            },
        });
    }
}

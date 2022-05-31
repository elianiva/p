import { Html } from "@/business/HtmlDomain/Html";
import type { IRoute } from "@/application/interfaces/IRoute";
import type { IEnvironment } from "@/application/interfaces/IEnvironment";
import { View } from "@/application/Response";
// can't use the aliased import when using the text loader apparently
import newPasteViewTemplate from "../views/NewPaste.html";

export class NewPasteView implements IRoute {
    public readonly path = "/";
    public readonly method = "GET";

    private readonly CACHE_DURATION = 60 * 60 * 24; // 1 day

    public async handler(
        request: Request,
        env: IEnvironment,
        ctx: ExecutionContext
    ): Promise<Response> {
        const view = new Html(newPasteViewTemplate).minify().content;
        return new View(view, 200, {
            "Cache-Control": `max-age=${this.CACHE_DURATION}`,
        });
    }
}

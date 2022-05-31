import { Html } from "@/business/HtmlDomain/Html";
import type { IRoute } from "@/application/interfaces/IRoute";
import type { IEnvironment } from "@/application/interfaces/IEnvironment";
import { View } from "@/application/Response";
// can't use the aliased import when using the text loader apparently
import newPasteViewTemplate from "../views/NewPaste.html";

export class NewPasteView implements IRoute {
    public readonly path = "/";
    public readonly method = "GET";

    public async handler(
        request: Request,
        env: IEnvironment,
        ctx: ExecutionContext
    ): Promise<Response> {
        const view = new Html(newPasteViewTemplate).minify().content;
        return new View(view);
    }
}

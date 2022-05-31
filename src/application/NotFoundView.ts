import type { IRoute } from "@/application/interfaces/IRoute";
import type { IEnvironment } from "@/application/interfaces/IEnvironment";
import { NotFound, View } from "@/application/Response";
import notFoundViewTemplate from "../views/NotFound.html";
import { Html } from "@/business/HtmlDomain/Html";

export class NotFoundView implements IRoute {
    public readonly path = "*";
    public readonly method = "*";

    public async handler(
        request: Request,
        env: IEnvironment,
        ctx: ExecutionContext
    ): Promise<Response> {
        const view = new Html(notFoundViewTemplate)
            .interpolate({
                Message: "No page found for this URL.",
            })
            .minify().content;
        return new View(view, 404);
    }
}

import { nanoid } from "nanoid";
import { Html } from "@/business/HtmlDomain/Html";
import type { IRoute } from "@/application/interfaces/IRoute";
import type { IEnvironment } from "@/application/interfaces/IEnvironment";
// can't use the aliased import when using the text loader apparently
import newPasteViewTemplate from "../views/NewPaste.html";

export class NewPasteView implements IRoute {
    public readonly path = "/";
    public readonly method = "GET";

    public handler = async (
        request: Request,
        env: IEnvironment,
        ctx: ExecutionContext
    ): Promise<Response> => {
        const view = new Html(newPasteViewTemplate)
            .interpolate({
                "@UniqueID": nanoid(),
            })
            .minify().content;

        return new Response(view, {
            status: 200,
            headers: {
                "Content-Type": "text/html",
            },
        });
    };
}

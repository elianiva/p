import { nanoid } from "nanoid";
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
        const view = newPasteViewTemplate.replace("@UniqueID", nanoid());

        // this is a budget html minifier
        // this reduces half of the size of the html
        const minifiedView = view
            .replace(/^\s+/gm, " ") // remove leading indentation
            .replace(/\n/g, "") // remove newlines
            .replace(/>(\s+)</g, "><"); // remove whitespace between tags

        return new Response(minifiedView, {
            status: 200,
            headers: {
                "Content-Type": "text/html",
            },
        });
    };
}

import { nanoid } from "nanoid";
import type { IRoute } from "@/application/IRoute";
import type { Env } from "@/application/Environment";
// can't use the aliased import when using the text loader apparently
import newPasteViewTemplate from "../views/NewPaste.html";

export class NewPasteView implements IRoute {
    public readonly path = "/";
    public readonly method = "GET";

    public handler = async (
        request: Request,
        env: Env,
        ctx: ExecutionContext
    ): Promise<Response> => {
        const view = newPasteViewTemplate.replace("@unique_id", nanoid());
        const textStream = new TextEncoder().encode(view);
        return new Response(textStream, {
            status: 200,
        });
    };
}

import type { IRoute } from "@/application/IRoute";
import type { Env } from "@/application/Environment";

export class NotFound implements IRoute {
    public readonly path = "*";
    public readonly method = "*";

    public handler = async (
        request: Request,
        env: Env,
        ctx: ExecutionContext
    ): Promise<Response> => {
        return new Response("Not Found", {
            status: 404,
        });
    }
}

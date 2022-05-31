import type { IRoute } from "@/application/interfaces/IRoute";
import type { IEnvironment } from "@/application/interfaces/IEnvironment";

export class NotFound implements IRoute {
    public readonly path = "*";
    public readonly method = "*";

    public async handler(
        request: Request,
        env: IEnvironment,
        ctx: ExecutionContext
    ): Promise<Response> {
        return new Response("Not Found", {
            status: 404,
        });
    }
}

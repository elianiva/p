import type { IRoute } from "@/application/interfaces/IRoute";
import type { IEnvironment } from "@/application/interfaces/IEnvironment";
import { NotFound } from "@/application/Response";

export class NotFoundView implements IRoute {
    public readonly path = "*";
    public readonly method = "*";

    public async handler(
        request: Request,
        env: IEnvironment,
        ctx: ExecutionContext
    ): Promise<Response> {
        return new NotFound("Not Found");
    }
}

import type { IEnvironment } from "@/application/interfaces/IEnvironment";
import type { IRoute } from "@/application/interfaces/IRoute";

/**
 * The router class that will handle the routing of the requests.
 */
export class Router {
    private readonly _routes: IRoute[];
    private readonly _catchAllHandler: IRoute;

    constructor(opts: { routes: IRoute[]; catchAll: IRoute }) {
        if (opts.routes.length === 0) {
            throw new Error("At least one route is required");
        }

        this._routes = opts.routes;
        this._catchAllHandler = opts.catchAll;
    }

    async fetch(
        request: Request,
        env: IEnvironment,
        ctx: ExecutionContext
    ): Promise<Response> {
        const url = new URL(request.url);
        const route = this._routes.find((route) => {
            const isMethodMatched = route.method === request.method;
            let isUrlMatched = false;

            if (typeof route.path === "string") {
                isUrlMatched = route.path === url.pathname;
            } else {
                isUrlMatched = route.path.test(url.pathname);
            }

            return isMethodMatched && isUrlMatched;
        });
        if (route !== undefined) {
            return route.handler(request, env, ctx);
        }

        if (this._catchAllHandler !== undefined) {
            return this._catchAllHandler.handler(request, env, ctx);
        }

        return new Response("Not found", {
            status: 404,
        });
    }
}

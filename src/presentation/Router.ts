import { Env } from "@/application/Environment";
import type { IRoute } from "@/application/IRoute";

/**
 * The router class that will handle the routing of the requests.
 */
export class Router {
    private readonly _routes: IRoute[];

    constructor(routes: IRoute[]) {
        if (routes.length === 0) {
            throw new Error("At least one route is required");
        }
        this._routes = routes;
    }

    async fetch(
        request: Request,
        env: Env,
        ctx: ExecutionContext
    ): Promise<Response> {
        const url = new URL(request.url);
        const route = this._routes.find((route) => {
            if (route.path === "*" && route.method === "*") {
                return true;
            }

            return (
                route.path === url.pathname && route.method === request.method
            );
        });
        if (route === undefined) throw new Error("No route was found!");

        return route.handler(request, env, ctx);
    }
}

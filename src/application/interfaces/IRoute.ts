import { IEnvironment } from "@/application/interfaces/IEnvironment";

/**
 * List of route with its handler.
 */
export interface IRoute {
    /**
     * Path of the route.
     * @param path The path of the route.
     * @returns True if the route matches the request.
     */
    path: string | RegExp;

    /**
     * Method of the route (GET, POST, etc.)
     * Use "*" to match any method.
     * @param method The method.
     */
    method: "GET" | "POST" | "PUT" | "DELETE" | "*";

    /**
     * Handler to be called when the route matches.
     * @param request Request object.
     * @param env Environment object.
     * @param ctx Context object.
     * @returns Response object.
     */
    handler: (request: Request, env: IEnvironment, ctx: ExecutionContext) => Promise<Response>;
}

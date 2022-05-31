export class Ok<T> extends Response {
    constructor(body: T, headers?: Record<string, string>) {
        super(JSON.stringify(body), {
            status: 200,
            headers: Object.assign({ "Content-Type": "application/json" }, headers),
        });
    }
}

export class BadRequest<T> extends Response {
    constructor(body: T, headers?: Record<string, string>) {
        super(JSON.stringify(body), {
            status: 400,
            headers: Object.assign({ "Content-Type": "application/json" }, headers),
        });
    }
}

export class InternalServerError<T> extends Response {
    constructor(body: T, headers?: Record<string, string>) {
        super(JSON.stringify(body), {
            status: 500,
            headers: Object.assign({ "Content-Type": "application/json" }, headers),
        });
    }
}

export class NotFound<T> extends Response {
    constructor(body: T, headers?: Record<string, string>) {
        super(JSON.stringify(body), {
            status: 404,
            headers: Object.assign({ "Content-Type": "application/json" }, headers),
        });
    }
}

export class View extends Response {
    constructor(view: string, status = 200, headers?: Record<string, string>) {
        super(view, {
            status: status,
            headers: Object.assign({ "Content-Type": "text/html" }, headers),
        });
    }
}

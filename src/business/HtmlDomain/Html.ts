export class Html {
    private _template: string;

    constructor(template: string) {
        if (template.length === 0) {
            throw new Error("Template must not be empty");
        }
        this._template = template;
    }

    public get content(): string {
        return this._template;
    }

    /**
     * Minifies the html string
     */
    public minify(): Html {
        // this is a budget minifier, it works for this particular app but shouldn't be used for complex html
        this._template = this._template
            .replace(/^\s+/gm, " ") // remove leading indentation
            .replace(/\n/g, "") // remove newlines
            .replace(/>(\s+)</g, "><"); // remove whitespace between tags
        return this;
    }

    /**
     * Interpolate the template with the given values
     * @param data The data you want to insert
     */
    public interpolate(data: Record<string, string>): Html {
        for (const key in data) {
            let value = data[key];
            this._template = this._template.replace(`@${key}`, value);
        }

        return this;
    }
}

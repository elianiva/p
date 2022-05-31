import { IHighlighter } from "@/business/PasteDomain/interfaces/IHighlighter";
import hljs from "highlight.js/lib/core";

// only include the languages I use to reduce the bundle size since we're serving this from cloudflare workers
// this shouldn't be an issue if we're using an external highlighter like Graphene, but this should be good for now
//#region highlight.js languages
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import xml from "highlight.js/lib/languages/xml";
import css from "highlight.js/lib/languages/css";
import php from "highlight.js/lib/languages/php";
import go from "highlight.js/lib/languages/go";
import rust from "highlight.js/lib/languages/rust";
import csharp from "highlight.js/lib/languages/csharp";
import java from "highlight.js/lib/languages/java";
import cpp from "highlight.js/lib/languages/cpp";
import python from "highlight.js/lib/languages/python";
import dart from "highlight.js/lib/languages/dart";
import dockerfile from "highlight.js/lib/languages/dockerfile";
import json from "highlight.js/lib/languages/json";
import sql from "highlight.js/lib/languages/sql";
import md from "highlight.js/lib/languages/markdown";
//#endregion

export class HighlightJSHighlighter implements IHighlighter {
    constructor() {
        //#region highlight.js languages registration
        hljs.registerLanguage("javascript", javascript);
        hljs.registerLanguage("typescript", typescript);
        hljs.registerLanguage("xml", xml);
        hljs.registerLanguage("css", css);
        hljs.registerLanguage("php", php);
        hljs.registerLanguage("go", go);
        hljs.registerLanguage("rust", rust);
        hljs.registerLanguage("csharp", csharp);
        hljs.registerLanguage("java", java);
        hljs.registerLanguage("cpp", cpp);
        hljs.registerLanguage("python", python);
        hljs.registerLanguage("dart", dart);
        hljs.registerLanguage("dockerfile", dockerfile);
        hljs.registerLanguage("json", json);
        hljs.registerLanguage("sql", sql);
        hljs.registerLanguage("md", md);
    }

    // we want to inline the styling instead of using a stylesheet
    // this function injects a github-dark-dimmed theme
    // see: https://github.com/highlightjs/highlight.js/blob/main/src/styles/github-dark-dimmed.css
    private _injectStyling(text: string): string {
        /* prettier-ignore */
        return text
            .replace(
                /class="hljs-(doctag|keyword|template-tag|template-variable|type)"/g,
                `style="color: #f47067"`
            )
            .replace(/class="hljs-title\s(class_(\sinherited_)?|function_)"/g, `style="color: #dcbdfb"`)
            .replace(
                /class="hljs-(attr|attribute|literal|meta|number|operator|variable|selector-attr|selector-class|selector-id)/g,
                `style="color: #6cb6ff"`
            )
            .replace(/class="hljs-(regexp|string)"/g, `style="color: #96d0ff"`)
            .replace(/class="hljs-(built_in|meta)"/g, `style="color: #f69d50"`)
            .replace(/class="hljs-(comment|code|formula)"/g, `style="color: #768390"`)
            .replace(/class="hljs-(name|quote|selector-tag|selector-pseudo)"/g, `style="color: #8ddb8c"`)
            .replace(/class="hljs-subst"/g, `style="color: #adbac7"`)
            .replace(/class="hljs-section"/g, `style="color: #316dca; font-weight: bold;"`)
            .replace(/class="hljs-addition"/g, `style="color: #b4f1b4; background-color: #1b4721"`)
            .replace(/class="hljs-deletion"/g, `style="color: #ffd8d3; background-color: #78191b"`);
    }

    /**
     * Highlights the text using highlight.js
     * @param text Text you want to highlight
     * @param language A language name from highlight.js
     * @returns HTML string with highlighted text
     */
    public highlight(text: string, language: string): string {
        const highlighted = hljs.highlight(text, { language }).value;
        return this._injectStyling(highlighted);
    }
}

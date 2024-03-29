import { NewPasteView } from "@/application/NewPasteView";
import { NewPaste } from "@/application/NewPaste";
import { GetPasteView } from "@/application/GetPasteView";
import { NotFoundView } from "@/application/NotFoundView";
import { PasteService } from "@/application/services/PasteService";
import type { IEnvironment } from "@/application/interfaces/IEnvironment";
import type { IStorage } from "@/application/interfaces/IStorage";
import type { IHighlighter } from "@/business/PasteDomain/interfaces/IHighlighter";
import { HighlightJSHighlighter } from "@/infrastructure/HighlightJSHighlighter";
import { CloudflareStorage } from "@/infrastructure/CloudflareStorage";
import { Router } from "@/presentation/Router";
import { ILanguageDetector } from "./business/PasteDomain/interfaces/ILanguageDetector";
import { FlouriteDetector } from "./infrastructure/FlouriteDetector";

interface Dependencies {
    highlighter: IHighlighter | null;
    languageDetector: ILanguageDetector | null;
    storage: IStorage | null;
    newPasteView: NewPasteView | null;
    notFoundView: NotFoundView | null;
    pasteService: PasteService | null;
    newPaste: NewPaste | null;
    getPasteView: GetPasteView | null;
}

// HACK: instantiate dependenceis on the first visit. We can't instantiate all of them
//       directly because one of the dependencies requires the environment object
// it's basically a poorman's dependency injection container
const D: Dependencies = {
    highlighter: null,
    languageDetector: null,
    storage: null,
    newPasteView: null,
    notFoundView: null,
    pasteService: null,
    newPaste: null,
    getPasteView: null,
};

const TTL = 60 * 60 * 24 * 7; // 7 days

export default {
    fetch(request: Request, env: IEnvironment, ctx: ExecutionContext) {
        // instantiate dependencies if they haven't been already
        D.highlighter = D.highlighter ?? new HighlightJSHighlighter();
        D.languageDetector = D.languageDetector ?? new FlouriteDetector();
        D.storage = D.storage ?? new CloudflareStorage(env.PASTE_STORAGE, TTL);
        D.pasteService =
            D.pasteService ?? new PasteService(D.storage, D.highlighter, D.languageDetector);
        D.getPasteView = D.getPasteView ?? new GetPasteView(D.pasteService);
        D.newPasteView = D.newPasteView ?? new NewPasteView();
        D.newPaste = D.newPaste ?? new NewPaste(D.pasteService);
        D.notFoundView = D.notFoundView ?? new NotFoundView();

        const router = new Router({
            routes: [D.newPasteView, D.newPaste, D.getPasteView],
            catchAll: D.notFoundView,
        });

        // handle the request
        return router.fetch(request, env, ctx);
    },
};

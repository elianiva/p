import { NewPasteView } from "@/application/NewPasteView";
import { NewPaste } from "@/application/NewPaste";
import { GetPasteView } from "@/application/GetPasteView";
import { NotFound } from "@/application/NotFound";
import { PasteService } from "@/application/services/PasteService";
import { MemoryStorage } from "@/infrastructure/MemoryStorage";
import { HighlightJSHighlighter } from "@/infrastructure/HighlightJSHighlighter";
import { Router } from "@/presentation/Router";

const TTL = 60 * 60 * 24 * 7; // 7 days

const highlightjs = new HighlightJSHighlighter();
const memoryStorage = new MemoryStorage();
const pasteService = new PasteService(memoryStorage, TTL, highlightjs);

const newPasteView = new NewPasteView();
const getPasteView = new GetPasteView(pasteService);
const newPaste = new NewPaste(pasteService);
const notFound = new NotFound();

const router = new Router({
    routes: [newPasteView, newPaste, getPasteView],
    catchAll: notFound,
});

export default router;

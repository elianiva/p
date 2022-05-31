import { NewPasteView } from "@/application/NewPasteView";
import { NewPaste } from "@/application/NewPaste";
import { GetPasteView } from "@/application/GetPasteView";
import { NotFound } from "@/application/NotFound";
import { PasteService } from "@/application/services/PasteService";
import { MemoryStorage } from "@/infrastructure/MemoryStorage";
import { DumbHighlighter } from "@/infrastructure/DumbHighlighter";
import { Router } from "@/presentation/Router";

const TTL = 60 * 60 * 24 * 7; // 7 days

const dumbHighlighter = new DumbHighlighter();
const memoryStorage = new MemoryStorage();
const pasteService = new PasteService(memoryStorage, TTL, dumbHighlighter);

const newPasteView = new NewPasteView();
const getPasteView = new GetPasteView(pasteService);
const newPaste = new NewPaste(pasteService);
const notFound = new NotFound();

const router = new Router({
    routes: [newPasteView, newPaste, getPasteView],
    catchAll: notFound,
});

export default router;

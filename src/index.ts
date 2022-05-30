import { NewPasteView } from "@/application/NewPasteView";
import { NewPaste } from "@/application/NewPaste";
import { NotFound } from "@/application/NotFound";
import { PasteService } from "@/application/services/PasteService";
import { MemoryStorage } from "@/infrastructure/MemoryStorage";
import { Router } from "@/presentation/Router";

const TTL = 60 * 60 * 24 * 7; // 7 days

const memoryStorage = new MemoryStorage();
const pasteService = new PasteService(memoryStorage, TTL);

const newPasteView = new NewPasteView();
const newPaste = new NewPaste(pasteService);
const notFound = new NotFound();

const router = new Router({
    routes: [newPasteView, newPaste],
    catchAll: notFound,
});

export default router;

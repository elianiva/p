import { Router } from "@/presentation/Router";
import { NewPasteView } from "@/application/NewPasteView";
import { NotFound } from "@/application/NotFound";

const newPasteView = new NewPasteView();
const notFound = new NotFound();

const router = new Router([newPasteView, notFound]);

export default router;

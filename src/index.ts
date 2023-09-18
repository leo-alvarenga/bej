import Elysia from "elysia";

import html from "@elysiajs/html";
import staticPlugin from "@elysiajs/static";

import { en } from "./config";
import { RootController } from "./controllers";
import { Template, Translation } from "./repository";
import { TemplateService, TranslationService } from "./services";
import { Home } from "./templates";

const PORT = process.env.APP_PORT;
const LANG = process.env.DEFAULT_LANG ?? 'en';

if (!PORT) {
    throw new Error('bro forgot the damn port 💀');
}

const templates = new Map<string, Template>([
    ['home', new Template(Home)]
]);

const translations = new Map<string, Translation>([
    ['en', new Translation(en)],
    ['pt', new Translation(en)]
]);

// move this code as Server
const templateService = new TemplateService(templates);
const translationService = new TranslationService(translations, LANG);
const rootController = new RootController(templateService, translationService, LANG);

const app = new Elysia()
    .use(staticPlugin())
    .use(html())
    .onError(({ code, set, request }) => {
        if (code === 'NOT_FOUND') {
            set.status = 404;

            // redirects if it is not an api call
            if (!request.url.includes('/api/')) set.redirect = '/';

            return 'Not found';
        }

        return '💀';
    })
    .get('/', ({ html, query }) => rootController.get('home', query['lang'], html))
    .get('/links', ({ html, query }) => rootController.get('links', query['lang'], html))
    .get('/api/posts', () => 'aaa')
    .listen(PORT);

console.log(`server: Elysia server running on ${app.server?.hostname}:${app.server?.port}`);

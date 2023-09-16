import Elysia from "elysia";

import html from "@elysiajs/html";
import staticPlugin from "@elysiajs/static";

import { RootController } from "./controllers";
import { Template } from "./dto";
import { TemplateService } from "./services";
import { Home } from "./templates";

const PORT = process.env.APP_PORT;
const LANG = process.env.DEFAULT_LANG ?? 'en';

if (!PORT) {
    throw new Error('bro forgot the damn port 💀');
}

const templates = new Map<string, Template>([
    ['home', new Template(Home)]
]);

// impl i18n serv
// move this code as Server
const templateService = new TemplateService(templates);
const rootController = new RootController(templateService, LANG);

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

        set.status = 500;

        return '';
    })
    .get('/', ({ html, query }) => rootController.get('home', query['lang'], html))
    .get('/links', ({ html, query }) => rootController.get('links', query['lang'], html))
    .get('/api/posts', () => 'aaa')
    .listen(PORT);

console.log(`server: Elysia server running on ${app.server?.hostname}:${app.server?.port}`);

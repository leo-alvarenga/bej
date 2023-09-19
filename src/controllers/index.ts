import html from '@elysiajs/html';
import staticPlugin from '@elysiajs/static';
import Elysia from 'elysia';

import translations from '../config';
import RootController from './RootController';
import { TemplateService, TranslationService } from '../services';
import templates from '../templates';

export { default as RootController } from './RootController';

export default function app() {
    const PORT = process.env.APP_PORT;
    const LANG = process.env.DEFAULT_LANG ?? 'en';

    if (!PORT) {
        throw new Error('bro forgot the damn port 💀');
    }

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

    return app;
}

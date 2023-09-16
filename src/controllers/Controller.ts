export interface IController {
    get: (which: string, lang: unknown, html: (val: string) => Response) => Response;
}

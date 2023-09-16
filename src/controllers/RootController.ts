import { PageProps } from "../dto";
import { IController } from "./Controller";
import { TemplateService } from "../services";

export default class RootController implements IController {
    private fallbackLang!: string;
    private templateManager!: TemplateService;

    constructor(templateManager: TemplateService, fallbackLang: string) {
        this.fallbackLang = fallbackLang;
        this.templateManager = templateManager;
    }

    get(which: string, lang: unknown, html: (val: string) => Response) {
        const trueLang = lang ? String(lang) : this.fallbackLang;

        const props: PageProps = {
            lang: trueLang,
        };

        return html(this.templateManager.get(which, props));
    }
}

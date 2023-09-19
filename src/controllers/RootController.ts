import { PageProps } from "../repository";
import { IController } from "./Controller";
import { ITemplateService, ITranslationService } from "../services";

export default class RootController implements IController {
    private fallbackLang!: string;
    private templateService!: ITemplateService;
    private translationService!: ITranslationService;

    constructor(templateService: ITemplateService, translationService: ITranslationService, fallbackLang: string) {
        this.fallbackLang = fallbackLang;
        this.templateService = templateService;
        this.translationService = translationService;
    }

    get = (which: string, lang: unknown, html: (val: string) => Response) => {
        const trueLang = lang ? String(lang) : this.fallbackLang;

        this.translationService.setCurrentLang(trueLang);

        const props: PageProps = {
            lang: trueLang,
            t: this.translationService.translate,
        };

        return html(this.templateService.get(which, props));
    }
}

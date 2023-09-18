import { TranslationFactory } from "./Translation";

export interface PageProps {
    lang: string;
    t: TranslationFactory;
}

export type TemplateFactory = (props: PageProps) => string;

export interface ITemplate {
    getPage: (props: PageProps) => string;
}

/**
 * Manages a single HTML template, handling its markup,
 * regenerating the final HTML whenever necessary
 */
export class Template implements ITemplate {
    private isStatic!: boolean;
    private factory!: TemplateFactory;
    private page!: Map<string, string>;

    constructor(factory: TemplateFactory, isStatic = true) {
        this.page = new Map();

        this.isStatic = isStatic;
        this.factory = factory;
    }

    private generatePage(props: PageProps) {
        const { lang } = props;
        
        let page = this.page.get(lang);
        if (this.isStatic && page) return;

        this.page.set(lang, this.factory(props));
    }

    getPage(props: PageProps) {
        this.generatePage(props);
        return this.page.get(props.lang) ?? '';
    }
}

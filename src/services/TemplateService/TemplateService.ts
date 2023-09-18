import { ITemplate, PageProps } from "../../dto";

export interface ITemplateService {
    get: (which: string, props: PageProps) => string;
}

/**
 * Manages multiple Template objects by making sure none of them
 * are duplicated
 */
export class TemplateService implements ITemplateService {
    private templates!: Map<string, ITemplate>;

    constructor(templates: Map<string, ITemplate>) {
        this.templates = templates;
    }

    get(which: string, props: PageProps) {
        const template = this.templates.get(which);
        if (!template) return '';

        return template.getPage(props);
    }
}

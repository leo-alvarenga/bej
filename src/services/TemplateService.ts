import { PageProps, Template } from "../dto";

/**
 * Manages multiple Template objects by making sure none of them
 * are duplicated
 */
export default class TemplateService {
    private templates!: Map<string, Template>;

    constructor(templates: Map<string, Template>) {
        this.templates = templates;
    }

    get(which: string, props: PageProps) {
        const template = this.templates.get(which);
        if (!template) return '';

        return template.getPage(props);
    }
}

import { describe, expect, it } from "bun:test";
import { PageProps, Template, TemplateFactory } from ".";

describe('Template', () => {
    const validFactory: TemplateFactory = ({ t }) => `<h1>${t('test')}</h1>`;

    const validProps: PageProps = {
        lang: 'en',
        t: (key: string) => key,
    };

    it('should work properly if everything is okay', () => {
        const template = new Template(validFactory);

        const page = template.getPage(validProps);
        expect(page).toContain('<h1>');
        expect(page).toContain('test');
    });
});

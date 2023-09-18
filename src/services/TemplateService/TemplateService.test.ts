import { describe, expect, it } from "bun:test";
import { ITemplate, PageProps, Template, TemplateFactory } from "../../repository";
import { TemplateService } from ".";

describe('TemplateService', () => {
    const factory: TemplateFactory = ({ lang }) => lang;
    const template = new Template(factory);
    const map = new Map<string, ITemplate>([
        ['test', template]
    ]);

    const props: PageProps = {
        lang: 'en',
        t: () => ''
    };

    it('should work correctly if everything is ok', () => {
        const service = new TemplateService(map);

        expect(service.get('test', props)).toBe('en');
    });

    it('should return an empty string if the template does not exist', () => {
        const service = new TemplateService(map);

        expect(service.get('home', props)).toBeEmpty();
    });
});

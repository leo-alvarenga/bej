import { describe, expect, it } from "bun:test";
import { TranslationService } from ".";
import { Translation } from "../../repository";

describe('Translation service', () => {
    const testText = 'This is a test';
    
    const validTranslation = new Translation(new Map<string, string>([
        ['test', testText]
    ]));

    const validMap = new Map<string, Translation>([
        ['en', validTranslation]
    ]);
    
    it('should be able to correctly retrieve the translated text if everything is ok', () => {
        const service = new TranslationService(validMap, 'en');
        
        expect(service.translate('test')).toBe(testText);
    });

    it('should not allow an unset language to be set as current', () => {
        const service = new TranslationService(validMap, 'en');
        
        expect(service.translate('test')).toBe(testText);

        service.setCurrentLang('pt');

        expect(service.translate('test')).toBe(testText);
    });

    it('should return the requested key if there are no translation maps available', () => {
        const key = 'test';
        const service = new TranslationService(new Map(), 'test');

        expect(service.translate(key)).toBe(key);
    });

    it('should return the requested key if the key could not be found', () => {
        const key = 'hello';
        const service = new TranslationService(validMap, 'en');

        expect(service.translate(key)).toBe(key);
    });

    it('should return the requested key if the current language does not have a matching key', () => {
        const key = 'test';
        const service = new TranslationService(validMap, 'test');

        expect(service.translate('test')).toBe(key);
    });
});

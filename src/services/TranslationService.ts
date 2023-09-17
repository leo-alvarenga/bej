import { Translation } from "../dto";

export interface ITranslationService {
    translate: (key: string) => string;
    setCurrentLang: (lang: string) => void;    
}

export class TranslationService implements ITranslationService {
    private currentLang!: string;
    private availableLangs!: string[];
    private translations!: Map<string, Translation>;

    constructor(translations: Map<string, Translation>, currentLang: string) {
        this.currentLang = currentLang;
        this.translations = translations;

        this.availableLangs = Array.from(translations.keys());
    }
    
    translate (key: string) {
        const t = this.translations.get(this.currentLang);

        if (!t) return key;

        return t.get(key);
    }

    setCurrentLang (lang: string) {
        if (!this.availableLangs.includes(lang)) return;

        this.currentLang = lang;
    }
}

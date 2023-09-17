export type TranslationFactory = (key: string) => string;

export interface ITranslation {
    value: Map<string, string>;
    get: TranslationFactory;
}

export class Translation implements ITranslation {
    value!: Map<string, string>;

    constructor(translations: Map<string, string>) {
        this.value = translations;
    }

    get(key: string) {
        return this.value.get(key) ?? key;
    }
}

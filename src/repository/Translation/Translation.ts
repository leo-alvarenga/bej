import { TranslationMap } from "../../dto";

export type TranslationFactory = (key: string) => string;

export interface ITranslation {
    value: TranslationMap;
    get: TranslationFactory;
}

export class Translation implements ITranslation {
    value!: TranslationMap;

    constructor(translations: TranslationMap) {
        this.value = translations;
    }

    get = (key: string) => {
        return this.value.get(key) ?? key;
    }
}

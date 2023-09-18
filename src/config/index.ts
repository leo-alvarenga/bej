import { Translation } from '../repository';
import { en, pt } from './translations';

export * from './translations';

const translations = new Map<string, Translation>([
    ['en', new Translation(en)],
    ['pt', new Translation(pt)]
]);

export default translations;

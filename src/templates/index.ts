import { Home } from './Home';
import { Template } from '../repository';

export * from './Base';
export * from './Home';

const templates = new Map<string, Template>([
    ['home', new Template(Home)],
    ['links', new Template(Home)]
]);

export default templates;

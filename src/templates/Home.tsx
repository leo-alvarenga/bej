import * as elements from 'typed-html';

import { TemplateFactory } from '../repository';
import { Base } from ".";

const Navbar: TemplateFactory = ({ t }) => (
    <nav class="navbar">
        <h3>{t('test')}</h3>
    </nav>
);

const TitleArea: TemplateFactory = ({ t }) => (
    <hgroup id="title-start" class="transition">
        <h1 class="transition">{t('page.title')}</h1>
        <h2>{t('page.subtitle')}</h2>
    </hgroup>
);

const ContentArea: TemplateFactory = (props) => (
    <div class="content-area">
        <link rel="stylesheet" href="/public/css/home.css" />
        <link rel="stylesheet" href="/public/css/navbar.css" />

        <Navbar {...props} />
        <TitleArea {...props} />
    </div>
);

export const Home: TemplateFactory = (props) => (
    <Base {...props}>
        <ContentArea {...props} />
    </Base>
);

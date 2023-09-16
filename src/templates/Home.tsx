import * as elements from 'typed-html';

import { PageProps } from '../dto';
import { Base } from ".";

const Navbar = ({ lang = 'en' }) => (
    <nav class="navbar">
        <h3>Lorem</h3>
    </nav>
);

const TitleArea = ({ lang = 'en' }) => (
    <hgroup id="title-start" class="transition">
        <h1 class="transition">Leonardo Alvarenga</h1>
        <h2>{lang === 'en' ? 'Fullstack Developer' : 'Dev'}</h2>
    </hgroup>
);

// const Expertise = () => (

// );

const ContentArea = ({ lang = 'en' }) => (
    <div class="content-area">
        <link rel="stylesheet" href="public/css/home.css" />
        <link rel="stylesheet" href="public/css/navbar.css" />

        <Navbar lang={lang} />
        <TitleArea lang={lang} />
    </div>
);

export const Home = (props: PageProps) => (
    <Base lang={props.lang}>
        <ContentArea lang={props.lang} />
    </Base>
);

import * as elements from 'typed-html';

export interface BaseProps extends elements.Children {
    lang: string;
}

const ENV = process.env.ENV ?? 'prd';

export const Base = ({ children, lang }: BaseProps) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="view-transition" content="same-origin" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="icon" href="public/assets/favicon.ico" />

    <meta property="og:title" content="Leonardo Alvarenga's portfolio" />
    <meta property="og:author" content="Leonardo Alvarenga" />
    <meta property="og:description" content="Hi 👋🏻! I am Leo, a FullStack Develop. Click here to visit my portfolio" />

    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://leoalvarenga.dev" />

    <meta property="og:image" content="public/assets/OpenGraphImage.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="627" />
    <meta property="og:image:alt" content="leoalvarenga.dev" />

    <meta property="og:image" content="public/assets/OpenGraphImageSquare.png" />
    <meta property="og:image:width" content="400" />
    <meta property="og:image:height" content="400" />
    <meta property="og:image:alt" content="leoalvarenga.dev" />

    <title>${lang === 'en' ? 'Leo' : 'Fu'}</title>

    <link rel="stylesheet" href="public/css/boilerplate.css">
    <script src="https://unpkg.com/htmx.org@1.9.5" integrity="sha384-xcuj3WpfgjlKF+FXhSQFQ0ZNr39ln+hwjN3npfM9VBnUskLolQAcN80McRIVOPuO" crossorigin="anonymous"></script>
    <script src="public/js/lang.js" type="text/javascript"></script>

    <style>
        @keyframes fade-in {
            from { opacity: 0; }
        }
        
        @keyframes fade-out {
            to { opacity: 0; }
        }
        
        @keyframes slide-from-right {
            from { transform: translateX(90px); }
        }
        
        @keyframes slide-to-left {
            to { transform: translateX(-90px); }
        }
        
        .slide-it {
            view-transition-name: slide-it;
        }
        
        ::view-transition-old(slide-it) {
            animation: 180ms cubic-bezier(0.4, 0, 1, 1) both fade-out,
            600ms cubic-bezier(0.4, 0, 0.2, 1) both slide-to-left;
        }
        
        ::view-transition-new(slide-it) {
            animation: 420ms cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in,
            600ms cubic-bezier(0.4, 0, 0.2, 1) both slide-from-right;
        }
    </style>
</head>

${children}
</html>
`;

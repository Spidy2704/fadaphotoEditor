import { Html, Head, Main, NextScript } from "next/document";
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="icon"
          href="/fab.png"
        />


<link href="https://fonts.googleapis.com/css2?family=Creepster&family=Lato:wght@100&display=swap" rel="stylesheet"></link>


        <link rel="stylesheet" href="/fontawesome/css/all.min.css" />
        <script src="/fontawesome/js/all.min.js" defer></script>

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />

        <meta name="title" content="Fada GM" />
        <meta
          name="description"
          content="Welcome to Fada GM."
        />
        <meta name="keywords" content="fada, project fada, fada gm" />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

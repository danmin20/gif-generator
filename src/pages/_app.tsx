import type { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "styles/global-style";
import { theme } from "styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Gif Generator</title>
      </Head>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
        <div id="modal-root" />
      </ThemeProvider>
    </>
  );
}

export default MyApp;

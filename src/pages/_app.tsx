import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import type { AppProps, } from "next/app";


import { trpc } from "../common/utils/trpc";

import "../common/styles/globals.css";
/**
   * 
   * This is the root app
   * 
   * @returns an App
   *
   */
const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
          crossOrigin="anonymous"
        />
        <title>Revs American Grill Order Food</title>
        <meta charSet="UTF-8" />
        <meta lang="en-US" />
        <meta name="keywords" content="revs, american, grill, tamu, order, food" />
        <meta name="author" content="Syamlal CM" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />
    </SessionProvider>
  )
};
export default trpc.withTRPC(MyApp);

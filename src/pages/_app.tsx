import { type AppType } from "next/app";

import { trpc } from "../common/utils/trpc";

import 'bootstrap/dist/css/bootstrap.min.css';
import "../common/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default trpc.withTRPC(MyApp);

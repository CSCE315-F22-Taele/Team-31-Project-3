import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { trpc } from "../common/utils/trpc";

import styles from "./index.module.css";

import RevsHeader from "../common/components/RevsHeader"

const Menu: NextPage = () => {
    return (
      <>
        <Head>
          <RevsHeader />
        </Head>
        <h1>
          le menu
        </h1>
      </>
    )
  }
  
  export default Menu;
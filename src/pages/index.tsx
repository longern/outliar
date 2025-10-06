import Head from "next/head";
import Navbar from "@/components/Navbar";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Outliar</title>
        <meta
          name="description"
          content="An easy-to-play social deduction tabletop game, playable with poker."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className={`${styles.page}`}>
        <main className={styles.main}></main>
        <footer className={styles.footer}></footer>
      </div>
    </>
  );
}

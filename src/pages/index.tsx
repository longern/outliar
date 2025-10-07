import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import styles from "@/styles/Home.module.css";
import RuleContent from "./rule.mdx";

export default function Home() {
  const [activeSection, setActiveSection] = useState("intro");
  const router = useRouter();

  useEffect(() => {
    const updateSection = () => {
      const hash = window.location.hash.slice(1) || "intro";
      setActiveSection(hash);
    };

    // Handle initial hash
    updateSection();

    // Listen for route changes (including hash changes)
    router.events?.on("hashChangeComplete", updateSection);
    // Also listen for native hashchange event as backup
    window.addEventListener("hashchange", updateSection);

    return () => {
      router.events?.off("hashChangeComplete", updateSection);
      window.removeEventListener("hashchange", updateSection);
    };
  }, [router]);

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
        <main className={styles.main}>
          {activeSection === "intro" && (
            <section id="intro" className={styles.introSection}>
              <h1 className={styles.sectionTitle}>游戏简介</h1>
              <div className={styles.gameInfo}>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>游戏名称：</span>
                  <span className={styles.infoValue}>异类</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>游戏类型：</span>
                  <span className={styles.infoValue}>社交推理</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>游戏人数：</span>
                  <span className={styles.infoValue}>4~7人</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>游戏时长：</span>
                  <span className={styles.infoValue}>7~10分钟</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>上手难度：</span>
                  <span className={styles.infoValue}>较简单</span>
                </div>
              </div>
            </section>
          )}
          {activeSection === "rule" && (
            <section id="rule" className={styles.ruleSection}>
              <RuleContent />
            </section>
          )}
        </main>
        <footer className={styles.footer}></footer>
      </div>
    </>
  );
}

import Link from "next/link";
import { useState } from "react";
import styles from "@/styles/Navbar.module.css";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <div className={styles.navTitle}>
          <Link href="/">异类</Link>
        </div>
        <button
          type="button"
          className={styles.menuButton}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className={styles.hamburger}></span>
          <span className={styles.hamburger}></span>
          <span className={styles.hamburger}></span>
        </button>
        <ul className={`${styles.navItems} ${isMenuOpen ? styles.open : ""}`}>
          <li>
            <Link href="#intro">游戏简介</Link>
          </li>
          <li>
            <Link href="/rule">游戏规则</Link>
          </li>
          <li>
            <Link href="#tools">游戏工具</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

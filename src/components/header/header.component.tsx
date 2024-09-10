import React from "react";
import styles from "./header.module.scss";

export function Header() {
  return (
    <header className={styles.header}>
      <h1 className={`${styles.header__logo}`}>Any Logo</h1>
    </header>
  );
}

import React from "react";

import styles from "./styles/ModalError.module.css";

export default function ({ children, msgError }) {
  return (
    <main className={styles.mainModal}>
      <div className={styles.modalContain}>
        <p className={styles.msgError}>{msgError}</p>
        {children}
      </div>
    </main>
  );
}

"use client";

import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import StoreProvider from "../store/StoreProvider";
import NavBar from "../components/NavBarComponent";

export default function RootLayout({ session, children }) {
  return (
    <html>
      <SessionProvider session={session}>
        <body>
          <NavBar />
          <StoreProvider>{children}</StoreProvider>
        </body>
      </SessionProvider>
    </html>
  );
}

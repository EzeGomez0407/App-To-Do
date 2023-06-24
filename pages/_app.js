import React from "react";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import "../globals.css";
import StoreProvider from "@/store/StoreProvider";

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
    </UserProvider>
  );
}

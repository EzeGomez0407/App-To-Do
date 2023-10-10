"use client";

import { useSession } from "next-auth/react";
import { FcTodoList } from "react-icons/fc";

import HomeLogin from "../components/HomeLogin";
import HomeWithoutLogin from "../components/HomeWithoutLogin";
import Loading from "../components/Loading";

export default function Home() {
  const { data: session, status } = useSession();
  return (
    <>
      {status === "loading" ? (
        <main className="mainLoading">
          <span className="simbolToDoLoading">
            <FcTodoList className="iconTodoLoading" />
            ToDo
          </span>
          <Loading />
        </main>
      ) : !session?.user ? (
        <HomeWithoutLogin />
      ) : (
        <HomeLogin />
      )}
    </>
  );
}

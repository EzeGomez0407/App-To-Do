import { useUser } from "@auth0/nextjs-auth0/client";
import { FcTodoList } from "react-icons/fc";

import Layout from "../components/Layout";
import HomeLogin from "@/components/HomeLogin";
import HomeWithoutLogin from "@/components/HomeWithoutLogin";
import Loading from "@/components/Loading";

export default function Home() {
  const { isLoading, user } = useUser();

  return (
    <Layout>
      {isLoading ? (
        <main className="mainLoading">
          <span className="simbolToDoLoading">
            <FcTodoList className="iconTodoLoading" />
            ToDo
          </span>
          <Loading />
        </main>
      ) : user ? (
        <HomeWithoutLogin />
      ) : (
        <HomeLogin />
      )}
    </Layout>
  );
}

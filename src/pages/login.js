import Head from "next/head";

import { Login } from "@/components/pages/Login";

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Login | Sistema de Gestão de Processos</title>
      </Head>

      <Login />
    </>
  );
}

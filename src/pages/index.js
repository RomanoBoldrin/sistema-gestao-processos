import Head from "next/head";

import { Dashboard } from "@/components/pages/Dashboard";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Dashboard | Sistema de Gestão de Processos</title>
      </Head>

      <Dashboard />
    </>
  );
}

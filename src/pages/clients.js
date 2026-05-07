import Head from "next/head";

import { Clients } from "@/components/pages/Clients";

export default function ClientsPage() {
  return (
    <>
      <Head>
        <title>Clientes | Sistema de Gestão de Processos</title>
      </Head>

      <Clients />
    </>
  );
}

import Head from "next/head";

import { Billing } from "@/components/pages/Billing";

export default function BillingPage() {
  return (
    <>
      <Head>
        <title>Faturamento | Sistema de Gestão de Processos</title>
      </Head>

      <Billing />
    </>
  );
}

import Head from "next/head";

import { CaseSearch } from "@/components/pages/CaseSearch";

export default function CasesPage() {
  return (
    <>
      <Head>
        <title>Buscar Casos | Sistema de Gestão de Processos</title>
      </Head>

      <CaseSearch />
    </>
  );
}

import Head from "next/head";

import { Documents } from "@/components/pages/Documents";

export default function DocumentsPage() {
  return (
    <>
      <Head>
        <title>Documentos | Sistema de Gestão de Processos</title>
      </Head>

      <Documents />
    </>
  );
}

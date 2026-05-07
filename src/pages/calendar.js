import Head from "next/head";

import { Calendar } from "@/components/pages/Calendar";

export default function CalendarPage() {
  return (
    <>
      <Head>
        <title>Calendário | Sistema de Gestão de Processos</title>
      </Head>

      <Calendar />
    </>
  );
}

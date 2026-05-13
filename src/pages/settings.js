import Head from "next/head";
import { useContext } from "react";

import { SettingsPage } from "@/components/pages/Settings";
import { ThemeContext } from "@/components/layout/RootLayout";

export default function SettingsRoute() {
  return (
    <>
      <Head>
        <title>Configurações | Sistema de Gestão de Processos</title>
      </Head>

      <SettingsPageWrapper />
    </>
  );
}

function SettingsPageWrapper() {
  const { theme, setTheme } = useContext(ThemeContext);
  return <SettingsPage theme={theme} setTheme={setTheme} />;
}

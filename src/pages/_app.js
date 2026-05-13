import "@/styles/globals.css";
import { useRouter } from "next/router";

import { RootLayout } from "@/components/layout/RootLayout";

const NO_LAYOUT_PAGES = ["/login"];

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const showLayout = !NO_LAYOUT_PAGES.includes(router.pathname);

  if (!showLayout) {
    return <Component {...pageProps} />;
  }

  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
}

import Head from "next/head";
import styles from "./ConstructionPage.module.css";

export default function ConstructionPage({
  title = "Em construção",
  appName = "ESTRADA",
  description = "Sistema de Administração de Processos",
  headline = "Estamos construindo nosso Projeto Integrador UNIVESP.",
  subtitle = "O sistema está em desenvolvimento para oferecer uma plataforma profissional e segura para escritórios de advocacia.",
  statusTitle = "Status atual",
  statusText = "Em construção. Atualizações serão publicadas em breve.",
  githubUrl,
}) {
  const pageTitle = `${appName} | ${title}`;
  const pageDescription = `${appName} — ${description}.`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Head>

      <main className={styles.page}>
        <div className={styles.card}>
          <header className={styles.brand}>
            <div className={styles.logo}>e</div>

            <div>
              <p className={styles.brandName}>{appName}</p>
              <p className={styles.brandSubtitle}>{description}</p>
            </div>
          </header>

          <div className={styles.divider} />

          <h1 className={styles.title}>{headline}</h1>

          <p className={styles.subtitle}>{subtitle}</p>

          <section className={styles.info}>
            <p className={styles.infoTitle}>{statusTitle}</p>
            <p className={styles.infoText}>{statusText}</p>
          </section>

          <div className={styles.actions}>
            {githubUrl && (
              <a
                className={`${styles.btn} ${styles.primary}`}
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
              >
                Ver repositório no GitHub
              </a>
            )}
          </div>

          <footer className={styles.footer}>
            <p>
              © {new Date().getFullYear()} {appName}. Todos os direitos
              reservados.
            </p>
          </footer>
        </div>
      </main>
    </>
  );
}

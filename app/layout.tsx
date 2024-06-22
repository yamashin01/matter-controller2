// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";
import "./globals.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import Header from "./components/header";
import { Footer } from "./components/footer";
import { Providers } from "./../components/providers";

export const metadata = {
  title: "案件管理システム",
  description: "未来技術推進協会の案件を管理します。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <Providers>
          <Header />
          <MantineProvider>{children}</MantineProvider>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

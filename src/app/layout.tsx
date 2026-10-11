import type { Metadata } from "next";
import "@fontsource-variable/figtree";
import "@fontsource-variable/bricolage-grotesque";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import { UserProvider } from "../../contexts/user-context";

export const metadata: Metadata = {
  title: "PRO Lidera Skills",
  description:
    "Tenha a avaliação de suas habilidades de liderança através de um teste especializado.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="antialiased">
        <UserProvider>
          <Header />
          {children}
          <Toaster />
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}

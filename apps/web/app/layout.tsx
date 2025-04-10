import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Poppins, Playfair } from "next/font/google";
import ShadcnThemeProvider from "@/providers/ThemeProvider";
import QueryProvider from "@/providers/QueryProvider";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

const montserrat = Playfair({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: { default: "Home", template: "%s | FlowLink" },
  description:
    "Workflow automation software for everyone. Automate your work with available app integrations—no developers, no IT tickets, no delays.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${montserrat.variable} antialiased`}
      >
        <ShadcnThemeProvider>
          <QueryProvider>
            <Header />
            <main className="p-4 pt-20">{children}</main>
            <Footer />
          </QueryProvider>
        </ShadcnThemeProvider>
      </body>
    </html>
  );
}

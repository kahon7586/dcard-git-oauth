import type { Metadata } from "next";
import "./globals.css";
import { cookies } from "next/headers";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Github Oauth App",
  description: "Github Oauth App for Dcard intern HW.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = cookies().get("theme")?.value;

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={theme === "dark" ? "dark" : ""}
    >
      <body className="flex min-h-screen flex-col justify-between bg-secondary dark:bg-secondary-d dark:text-primary-d">
        <Header />
        {children}
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Cinzel_Decorative, Raleway } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const cinzelDecorative = Cinzel_Decorative({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Skystone Legacy",
  description: "Explorez un monde de mystère et d'aventure dans les îles flottantes de Skystone Legacy",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${cinzelDecorative.variable} ${raleway.variable}`}>
      <body className="bg-slate-900 text-white font-raleway">
        <Navigation />
        {children}
      </body>
    </html>
  );
}

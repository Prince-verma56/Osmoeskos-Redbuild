import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";
import { Navigation } from "@/components/layout/navigation";
import { PreloaderWrapper } from "@/components/layout/preloader-wrapper";
import { Footer } from "@/components/layout/footer";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "OsmeKos | Premium Skincare",
  description: "A premium body lotion featuring a triple ceramide complex with Shea Butter, Coconut Oil, Niacinamide and Vitamin E.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("h-full", "antialiased", cormorantGaramond.variable, dmSans.variable, "font-sans")}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-background">
        <SmoothScrollProvider>
          <PreloaderWrapper>
            <Navigation />
            {children}
            <Footer />
          </PreloaderWrapper>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

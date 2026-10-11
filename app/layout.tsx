import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";
import { HashScrollHandler } from "@/components/providers/hash-scroll";
import { Navigation } from "@/components/layout/navigation";
import { PreloaderWrapper } from "@/components/layout/preloader-wrapper";
import { Footer } from "@/components/layout/footer";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
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
      className={cn("h-full", "antialiased", manrope.variable, "font-sans")}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-background">
        <SmoothScrollProvider>
          <HashScrollHandler />
          <PreloaderWrapper>
            {/* Opaque content layer sits ABOVE the footer and slides up over
                it on scroll; the footer is revealed from behind at the end. */}
            <div className="relative z-10 flex min-h-screen flex-col bg-background">
              <Navigation />
              {children}
            </div>
            <Footer />
          </PreloaderWrapper>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

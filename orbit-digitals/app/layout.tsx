import type { Metadata } from "next";
// 1. Import ALL the fonts we need
import { Space_Grotesk, Inter, Dela_Gothic_One } from "next/font/google"; 
import "./globals.css";
import ParticleBackground from "../components/ParticleBackground";
import Navbar from "../components/Navbar"; 
import Footer from "../components/Footer";
import ChatWidget from "../components/ChatWidget";

// 2. Configure Main Headings (Space Grotesk)
const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-heading", // Standard headings
});

// 3. Configure Hero Font (Dela Gothic One)
const delaGothic = Dela_Gothic_One({ 
  subsets: ["latin"], 
  weight: "400",
  variable: "--font-hero", // SPECIAL VARIABLE just for the hero
});

// 4. Configure Body Text (Inter)
const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Orbit Digitals",
  description: "Social creative that moves customers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* 5. Add ALL variables to the body class list */}
      <body className={`${spaceGrotesk.variable} ${inter.variable} ${delaGothic.variable} antialiased font-sans`}>
        <ParticleBackground />
        <Navbar />
        
        <div className="relative z-10 pt-20">
            {children}
            <Footer />
        </div>
        
        <ChatWidget />
      </body>
    </html>
  );
}
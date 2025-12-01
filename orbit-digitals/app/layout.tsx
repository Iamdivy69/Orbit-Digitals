import type { Metadata } from "next";
// 1. Import Orbitron for the Hero
import { Space_Grotesk, Inter, Orbitron } from "next/font/google"; 
import "./globals.css";
import { BackgroundGradientAnimation } from "../components/BackgroundGradientAnimation"; 
import ParticleBackground from "../components/ParticleBackground";
import Navbar from "../components/Navbar"; 
import Footer from "../components/Footer";
import ChatWidget from "../components/ChatWidget";

// 2. Configure Main Headings (Space Grotesk)
const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-heading", 
});

// 3. Configure Hero Font (Orbitron - The Space Font)
const orbitron = Orbitron({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700", "800", "900"], // All weights
  variable: "--font-hero", 
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
      <body className={`${spaceGrotesk.variable} ${inter.variable} ${orbitron.variable} antialiased font-sans`}>
        
        {/* BACKGROUND LAYERS */}
        <div className="fixed inset-0 -z-20">
            <BackgroundGradientAnimation interactive={false} />
        </div>
        <div className="fixed inset-0 -z-10">
            <ParticleBackground />
        </div>

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
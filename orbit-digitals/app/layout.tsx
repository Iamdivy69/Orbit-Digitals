import type { Metadata } from "next";
import { Space_Grotesk, Inter, Orbitron } from "next/font/google"; 
import "./globals.css";
import { BackgroundGradientAnimation } from "../components/BackgroundGradientAnimation"; 
import ParticleBackground from "../components/ParticleBackground";
import Navbar from "../components/Navbar"; 
import Footer from "../components/Footer";
import ChatLoader from "../components/ChatLoader"; // <--- THE FIX

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-heading", 
});

const orbitron = Orbitron({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700", "800", "900"], // All weights
  variable: "--font-hero", 
});

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
        <div className="fixed inset-0 -z-20 bg-[#02060C]">
            {/* If the site is still slow, comment out the line below */}
            <BackgroundGradientAnimation interactive={false} />
        </div>
        <div className="fixed inset-0 -z-10">
            <ParticleBackground />
        </div>

        <Navbar />
        
        <div className="relative pt-20">
            {children}
            <Footer />
        </div>
        
        {/* THIS NOW LOADS THE CHAT ONLY ON THE CLIENT SIDE */}
        <ChatLoader />
      </body>
    </html>
  );
}
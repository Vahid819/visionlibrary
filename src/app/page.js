import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Ticker from "@/components/landing/Ticker";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/Howitworks";
import Stats from "@/components/landing/Stats";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

export const metadata = {
  title: "Vision Library — Study Room Management System",
  description:
    "The study room management system you've been waiting for. Real-time seats, payments, WhatsApp messaging — all in one sleek dashboard.",
};

export default function LandingPage() {
  return (
    <main className="bg-[#020917] text-white min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <Ticker />
      <Features />
      <HowItWorks />
      <Stats />
      <CTA />
      <Footer />
    </main>
  );
}
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Ticker from "@/components/landing/Ticker";
import Features from "@/components/landing/Features";
import Payment from "@/components/landing/Payment";
import HowItWorks from "@/components/landing/HowItWorks";
import Stats from "@/components/landing/Stats";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

export const metadata = {
  title: "Vision Library — Study Room Management System",
  description:
    "Seat booking, payment tracking, and WhatsApp messaging — all in one sleek admin dashboard for study room owners.",
};

export default function LandingPage() {
  return (
    <main className="bg-[#020917] text-white min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <Ticker />
      <Features />
      <Payment />
      <HowItWorks />
      <Stats />
      <CTA />
      <Footer />
    </main>
  );
}

import { Toaster } from "@/components/ui/sonner";
import { useEffect, useState } from "react";
import AstrologersSection from "./components/AstrologersSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import KundaliCallout from "./components/KundaliCallout";
import KundaliModal from "./components/KundaliModal";
import Navbar from "./components/Navbar";
import NumerologySection from "./components/NumerologySection";
import RashiSection from "./components/RashiSection";
import StarField from "./components/StarField";
import VastuSection from "./components/VastuSection";

export default function App() {
  const [kundaliOpen, setKundaliOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );
    const elements = document.querySelectorAll(".section-reveal");
    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{ backgroundColor: "oklch(0.09 0.04 285)" }}
    >
      <StarField />
      <Navbar onOpenKundali={() => setKundaliOpen(true)} />
      <main>
        <HeroSection onOpenKundali={() => setKundaliOpen(true)} />
        <RashiSection />
        <KundaliCallout onOpenKundali={() => setKundaliOpen(true)} />
        <NumerologySection />
        <VastuSection />
        <AstrologersSection />
      </main>
      <Footer />
      <KundaliModal open={kundaliOpen} onClose={() => setKundaliOpen(false)} />
      <Toaster />
    </div>
  );
}

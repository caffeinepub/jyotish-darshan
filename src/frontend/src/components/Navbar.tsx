import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Star, X } from "lucide-react";
import { useEffect, useState } from "react";

interface NavbarProps {
  onOpenKundali: () => void;
}

const navLinks = [
  { label: "Rashifal", href: "#rashifal" },
  { label: "Kundali", href: "#kundali" },
  { label: "Numerology", href: "#numerology" },
  { label: "Vastu", href: "#vastu" },
  { label: "Astrologers", href: "#astrologers" },
];

export default function Navbar({ onOpenKundali }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: scrolled
          ? "oklch(0.09 0.04 285 / 0.95)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid oklch(0.78 0.2 72 / 0.2)" : "none",
        boxShadow: scrolled ? "0 4px 20px oklch(0.05 0.03 285 / 0.6)" : "none",
      }}
    >
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <button
          type="button"
          className="flex items-center gap-2 group"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <div className="relative">
            <span className="text-2xl select-none">🔯</span>
            <div
              className="absolute inset-0 rounded-full blur-lg opacity-0 group-hover:opacity-60 transition-opacity"
              style={{ backgroundColor: "oklch(0.78 0.2 72)" }}
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span
              className="font-display font-bold text-lg tracking-wide"
              style={{ color: "oklch(0.88 0.22 80)" }}
            >
              Jyotish Darshan
            </span>
            <span
              className="text-xs font-body tracking-widest"
              style={{ color: "oklch(0.70 0.15 65)" }}
            >
              ज्योतिष दर्शन
            </span>
          </div>
        </button>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.label}>
              <button
                type="button"
                onClick={() => handleNavClick(link.href)}
                className="font-sans text-sm font-medium transition-all duration-200 hover:scale-105 relative group"
                style={{ color: "oklch(0.82 0.06 75)" }}
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                  style={{ backgroundColor: "oklch(0.78 0.2 72)" }}
                />
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            onClick={onOpenKundali}
            className="btn-glow relative font-sans font-semibold text-sm px-5 py-2 rounded-full"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.72 0.18 55), oklch(0.82 0.22 72))",
              color: "oklch(0.10 0.04 285)",
              border: "none",
              boxShadow: "0 0 20px oklch(0.78 0.2 72 / 0.4)",
            }}
          >
            <Star className="w-3.5 h-3.5 mr-1.5" />
            Free Kundali
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              className="md:hidden p-2 rounded-lg transition-colors"
              style={{ color: "oklch(0.82 0.15 75)" }}
            >
              {mobileOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[280px] border-l"
            style={{
              backgroundColor: "oklch(0.09 0.04 285)",
              borderColor: "oklch(0.78 0.2 72 / 0.3)",
            }}
          >
            <div className="flex flex-col gap-6 mt-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">🔯</span>
                <span
                  className="font-display font-bold text-base"
                  style={{ color: "oklch(0.88 0.22 80)" }}
                >
                  Jyotish Darshan
                </span>
              </div>
              {navLinks.map((link) => (
                <button
                  type="button"
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left font-sans text-base font-medium py-2 border-b transition-colors hover:text-primary"
                  style={{
                    color: "oklch(0.82 0.06 75)",
                    borderColor: "oklch(0.78 0.2 72 / 0.15)",
                  }}
                >
                  {link.label}
                </button>
              ))}
              <Button
                onClick={() => {
                  setMobileOpen(false);
                  onOpenKundali();
                }}
                className="w-full mt-4 rounded-full font-semibold"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.72 0.18 55), oklch(0.82 0.22 72))",
                  color: "oklch(0.10 0.04 285)",
                }}
              >
                <Star className="w-4 h-4 mr-2" />
                Get Free Kundali
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}

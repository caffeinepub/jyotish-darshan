import { Heart, Mail, MapPin, Phone, Star } from "lucide-react";
import { motion } from "motion/react";

const currentYear = new Date().getFullYear();

const FOOTER_LINKS = {
  Services: [
    { label: "Rashifal", href: "#rashifal" },
    { label: "Free Kundali", href: "#kundali" },
    { label: "Numerology", href: "#numerology" },
    { label: "Vastu Shastra", href: "#vastu" },
    { label: "Astrologers", href: "#astrologers" },
  ],
  Resources: [
    { label: "Panchang", href: "#" },
    { label: "Muhurta", href: "#" },
    { label: "Gemstones", href: "#" },
    { label: "Festivals", href: "#" },
    { label: "Mantras", href: "#" },
  ],
};

export default function Footer() {
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer
      className="relative pt-20 pb-8 z-10 overflow-hidden"
      style={{
        borderTop: "1px solid oklch(0.78 0.2 72 / 0.15)",
        background:
          "linear-gradient(to bottom, oklch(0.09 0.04 285), oklch(0.07 0.035 285))",
      }}
    >
      {/* Decorative background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 80%, oklch(0.18 0.08 295 / 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 20%, oklch(0.15 0.06 285 / 0.3) 0%, transparent 50%)",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span
                className="text-3xl select-none"
                style={{
                  filter: "drop-shadow(0 0 10px oklch(0.78 0.2 72 / 0.6))",
                }}
              >
                🔯
              </span>
              <div>
                <div
                  className="font-display font-bold text-xl"
                  style={{ color: "oklch(0.88 0.22 80)" }}
                >
                  Jyotish Darshan
                </div>
                <div
                  className="font-body text-xs tracking-widest"
                  style={{ color: "oklch(0.60 0.10 72)" }}
                >
                  ज्योतिष दर्शन
                </div>
              </div>
            </div>
            <p
              className="font-body text-sm leading-relaxed mb-5"
              style={{ color: "oklch(0.60 0.04 285)" }}
            >
              India's most trusted Vedic astrology platform. Connecting souls
              with ancient cosmic wisdom since 1999.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {["📘", "📸", "🐦", "▶️"].map((icon) => (
                <motion.button
                  type="button"
                  key={icon}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm transition-all"
                  style={{
                    backgroundColor: "oklch(0.15 0.06 285)",
                    border: "1px solid oklch(0.78 0.2 72 / 0.2)",
                  }}
                  whileHover={{
                    scale: 1.15,
                    borderColor: "oklch(0.78 0.2 72 / 0.6)",
                  }}
                >
                  {icon}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h4
                className="font-display font-bold text-sm uppercase tracking-wider mb-5"
                style={{ color: "oklch(0.88 0.22 80)" }}
              >
                {heading}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        if (link.href.startsWith("#")) {
                          e.preventDefault();
                          document
                            .querySelector(link.href)
                            ?.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className="font-body text-sm transition-colors hover:text-primary group flex items-center gap-1.5"
                      style={{ color: "oklch(0.60 0.04 285)" }}
                    >
                      <span
                        className="w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ backgroundColor: "oklch(0.78 0.2 72)" }}
                      />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4
              className="font-display font-bold text-sm uppercase tracking-wider mb-5"
              style={{ color: "oklch(0.88 0.22 80)" }}
            >
              Contact
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone
                  className="w-4 h-4 flex-shrink-0"
                  style={{ color: "oklch(0.78 0.2 72)" }}
                />
                <span
                  className="font-body text-sm"
                  style={{ color: "oklch(0.60 0.04 285)" }}
                >
                  +91 98765 43210
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail
                  className="w-4 h-4 flex-shrink-0"
                  style={{ color: "oklch(0.78 0.2 72)" }}
                />
                <span
                  className="font-body text-sm"
                  style={{ color: "oklch(0.60 0.04 285)" }}
                >
                  info@jyotishdarshan.in
                </span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin
                  className="w-4 h-4 flex-shrink-0 mt-0.5"
                  style={{ color: "oklch(0.78 0.2 72)" }}
                />
                <span
                  className="font-body text-sm"
                  style={{ color: "oklch(0.60 0.04 285)" }}
                >
                  Varanasi, Uttar Pradesh, India
                </span>
              </div>
            </div>

            {/* Quick CTA */}
            <div
              className="mt-6 p-4 rounded-xl"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.13 0.065 295), oklch(0.11 0.05 285))",
                border: "1px solid oklch(0.78 0.2 72 / 0.2)",
              }}
            >
              <p
                className="font-display font-semibold text-sm mb-1"
                style={{ color: "oklch(0.88 0.22 80)" }}
              >
                Free Daily Rashifal
              </p>
              <p
                className="font-body text-xs mb-3"
                style={{ color: "oklch(0.60 0.04 285)" }}
              >
                Get your daily horoscope in Hindi & English
              </p>
              <button
                type="button"
                className="w-full py-2 rounded-lg font-sans text-xs font-semibold"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.68 0.2 48), oklch(0.78 0.22 65))",
                  color: "oklch(0.10 0.04 285)",
                }}
              >
                Subscribe Free
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className="border-t mb-6"
          style={{ borderColor: "oklch(0.78 0.2 72 / 0.1)" }}
        />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p
              className="font-sans text-xs mb-1"
              style={{ color: "oklch(0.50 0.04 285)" }}
            >
              ⚠️ For entertainment and guidance purposes only. Not a substitute
              for professional advice.
            </p>
            <p
              className="font-sans text-xs"
              style={{ color: "oklch(0.50 0.04 285)" }}
            >
              © {currentYear} Jyotish Darshan. All rights reserved. · Privacy
              Policy · Terms of Service
            </p>
          </div>

          <a
            href={caffeineLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-sans text-xs transition-opacity hover:opacity-80 flex-shrink-0"
            style={{ color: "oklch(0.55 0.04 285)" }}
          >
            Built with{" "}
            <Heart
              className="w-3 h-3 fill-current"
              style={{ color: "oklch(0.78 0.2 72)" }}
            />{" "}
            using{" "}
            <span style={{ color: "oklch(0.78 0.2 72)" }}>caffeine.ai</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

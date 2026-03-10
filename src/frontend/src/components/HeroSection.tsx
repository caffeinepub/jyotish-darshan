import { Button } from "@/components/ui/button";
import { Sparkles, Star } from "lucide-react";
import { motion } from "motion/react";

interface HeroSectionProps {
  onOpenKundali: () => void;
}

export default function HeroSection({ onOpenKundali }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-astrology.dim_1200x500.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(to bottom, oklch(0.09 0.04 285 / 0.55) 0%, oklch(0.09 0.04 285 / 0.7) 50%, oklch(0.09 0.04 285) 100%)",
        }}
      />

      {/* Floating zodiac wheel */}
      <motion.div
        className="absolute right-4 md:right-16 top-1/2 -translate-y-1/2 z-10 opacity-30 md:opacity-60 pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{
          duration: 40,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        <img
          src="/assets/generated/zodiac-wheel-transparent.dim_600x600.png"
          alt="Zodiac Wheel"
          className="w-48 h-48 md:w-80 md:h-80 lg:w-96 lg:h-96 drop-shadow-2xl"
          style={{ filter: "drop-shadow(0 0 40px oklch(0.78 0.2 72 / 0.5))" }}
        />
      </motion.div>

      {/* Ornamental gems floating */}
      {(["♈", "♏", "♐", "♓", "♊", "♑"] as const).map((symbol, idx) => (
        <motion.div
          key={symbol}
          className="absolute text-xl md:text-2xl pointer-events-none select-none z-10"
          style={{
            left: `${5 + (idx % 3) * 15}%`,
            top: `${20 + Math.floor(idx / 3) * 55}%`,
            color: "oklch(0.78 0.2 72 / 0.5)",
          }}
          animate={{
            y: [0, -15, 0],
            rotate: [0, 10, -10, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4 + idx * 0.8,
            repeat: Number.POSITIVE_INFINITY,
            delay: idx * 0.5,
            ease: "easeInOut",
          }}
        >
          {symbol}
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative z-20 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Om symbol */}
          <motion.div
            className="text-5xl md:text-7xl mb-4 select-none"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            style={{ filter: "drop-shadow(0 0 20px oklch(0.78 0.2 72 / 0.8))" }}
          >
            ॐ
          </motion.div>

          <motion.p
            className="font-body text-sm md:text-base uppercase tracking-[0.3em] mb-3"
            style={{ color: "oklch(0.78 0.2 72)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            वैदिक ज्योतिष · Vedic Astrology
          </motion.p>

          <motion.h1
            className="font-display font-black text-4xl md:text-6xl lg:text-8xl mb-4 leading-none"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.9 }}
          >
            <span className="gold-gradient-text">जानिए</span>
            <br />
            <span style={{ color: "oklch(0.96 0.015 75)" }}>अपना</span>{" "}
            <span className="gold-gradient-text">भविष्य</span>
          </motion.h1>

          <motion.h2
            className="font-display text-xl md:text-2xl lg:text-3xl mb-6 font-light"
            style={{ color: "oklch(0.82 0.05 285)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Know Your Destiny Through Ancient Vedic Wisdom
          </motion.h2>

          <motion.p
            className="font-body text-base md:text-lg mb-10 max-w-2xl mx-auto"
            style={{ color: "oklch(0.75 0.04 285)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            Discover your Rashi, Kundali, Numerology, and Vastu guidance from
            India's most trusted Vedic astrology platform. Your stars have a
            story — let us decode it.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <Button
              onClick={onOpenKundali}
              size="lg"
              className="btn-glow animate-glow group relative px-8 py-6 text-lg font-bold rounded-full font-sans"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.68 0.2 48), oklch(0.78 0.22 65), oklch(0.88 0.2 80))",
                color: "oklch(0.10 0.04 285)",
                border: "2px solid oklch(0.88 0.22 80 / 0.6)",
                boxShadow:
                  "0 0 30px oklch(0.78 0.2 72 / 0.5), 0 0 60px oklch(0.78 0.2 72 / 0.25)",
              }}
            >
              <Sparkles className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
              Get Free Kundali ✨
            </Button>

            <button
              type="button"
              onClick={() =>
                document
                  .querySelector("#rashifal")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="flex items-center gap-2 px-6 py-3 rounded-full font-sans font-medium text-sm transition-all hover:scale-105"
              style={{
                color: "oklch(0.88 0.22 80)",
                border: "1px solid oklch(0.78 0.2 72 / 0.4)",
                backgroundColor: "oklch(0.12 0.04 285 / 0.5)",
              }}
            >
              <Star className="w-4 h-4" />
              Check Rashifal
            </button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-8 mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            {[
              { number: "50L+", label: "Kundalis Generated" },
              { number: "500+", label: "Expert Astrologers" },
              { number: "4.9★", label: "User Rating" },
              { number: "25+", label: "Years of Experience" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div
                  className="font-display font-bold text-2xl md:text-3xl"
                  style={{ color: "oklch(0.88 0.22 80)" }}
                >
                  {stat.number}
                </div>
                <div
                  className="font-sans text-xs uppercase tracking-wider mt-1"
                  style={{ color: "oklch(0.65 0.05 285)" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, oklch(0.09 0.04 285))",
        }}
      />

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1"
        animate={{ y: [0, 8, 0] }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <span
          className="text-xs font-sans tracking-wider"
          style={{ color: "oklch(0.65 0.05 285)" }}
        >
          Scroll
        </span>
        <div
          className="w-px h-8 rounded-full"
          style={{
            background:
              "linear-gradient(to bottom, oklch(0.78 0.2 72 / 0.8), transparent)",
          }}
        />
      </motion.div>
    </section>
  );
}

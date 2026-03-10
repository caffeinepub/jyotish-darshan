import { Button } from "@/components/ui/button";
import { Moon, Sparkles, Star } from "lucide-react";
import { motion } from "motion/react";

interface KundaliCalloutProps {
  onOpenKundali: () => void;
}

export default function KundaliCallout({ onOpenKundali }: KundaliCalloutProps) {
  return (
    <section id="kundali" className="relative py-20 z-10 overflow-hidden">
      {/* Background decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.14 0.08 295 / 0.8) 0%, oklch(0.11 0.06 285 / 0.6) 50%, oklch(0.14 0.06 265 / 0.8) 100%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, oklch(0.78 0.2 72 / 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 50%, oklch(0.55 0.2 285 / 0.3) 0%, transparent 50%)",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div
          className="rounded-3xl overflow-hidden relative"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.13 0.065 295), oklch(0.10 0.055 285))",
            border: "1px solid oklch(0.78 0.2 72 / 0.35)",
            boxShadow:
              "0 0 60px oklch(0.78 0.2 72 / 0.15), 0 0 120px oklch(0.55 0.2 285 / 0.1)",
          }}
        >
          {/* Decorative corner elements */}
          <div
            className="absolute top-0 left-0 w-32 h-32 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at top left, oklch(0.78 0.2 72 / 0.2), transparent 70%)",
            }}
          />
          <div
            className="absolute bottom-0 right-0 w-32 h-32 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at bottom right, oklch(0.55 0.2 285 / 0.2), transparent 70%)",
            }}
          />

          <div className="flex flex-col lg:flex-row items-center gap-10 p-8 md:p-12">
            {/* Left content */}
            <div className="flex-1 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <div
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 font-sans text-xs uppercase tracking-widest"
                  style={{
                    backgroundColor: "oklch(0.78 0.2 72 / 0.15)",
                    border: "1px solid oklch(0.78 0.2 72 / 0.3)",
                    color: "oklch(0.88 0.22 80)",
                  }}
                >
                  <Star className="w-3.5 h-3.5" />
                  100% Free · कोई शुल्क नहीं
                </div>

                <h2
                  className="font-display font-bold text-3xl md:text-5xl mb-4 leading-tight"
                  style={{ color: "oklch(0.96 0.015 75)" }}
                >
                  Get Your{" "}
                  <span className="gold-gradient-text">Free Kundali</span>
                  <br />
                  जन्म कुंडली
                </h2>

                <p
                  className="font-body text-base md:text-lg mb-8 leading-relaxed max-w-xl"
                  style={{ color: "oklch(0.75 0.04 285)" }}
                >
                  Your birth chart reveals the cosmic blueprint of your life.
                  Understand your strengths, challenges, relationships, career,
                  and spiritual path through ancient Vedic Kundali analysis —
                  absolutely free.
                </p>

                <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
                  {[
                    "Birth Chart Analysis",
                    "Planet Positions",
                    "Dasha Periods",
                    "Lucky Gems",
                  ].map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2 font-sans text-sm"
                      style={{ color: "oklch(0.82 0.06 75)" }}
                    >
                      <span style={{ color: "oklch(0.78 0.2 72)" }}>✓</span>
                      {feature}
                    </div>
                  ))}
                </div>

                <Button
                  onClick={onOpenKundali}
                  size="lg"
                  className="btn-glow animate-glow group font-sans font-bold text-base px-8 py-6 rounded-full"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.68 0.2 48), oklch(0.82 0.22 72))",
                    color: "oklch(0.10 0.04 285)",
                    border: "none",
                    boxShadow: "0 0 25px oklch(0.78 0.2 72 / 0.5)",
                  }}
                >
                  <Sparkles className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                  Generate My Kundali — Free!
                </Button>
              </motion.div>
            </div>

            {/* Right — visual */}
            <motion.div
              className="flex-shrink-0 relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative w-56 h-56 md:w-72 md:h-72">
                {/* Outer ring */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    border: "2px solid oklch(0.78 0.2 72 / 0.4)",
                    boxShadow: "0 0 30px oklch(0.78 0.2 72 / 0.3) inset",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 30,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                />
                {/* Middle ring */}
                <motion.div
                  className="absolute inset-8 rounded-full"
                  style={{
                    border: "1px solid oklch(0.55 0.2 285 / 0.4)",
                  }}
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 20,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                />

                {/* Center */}
                <div
                  className="absolute inset-0 flex items-center justify-center flex-col"
                  style={{ color: "oklch(0.88 0.22 80)" }}
                >
                  <span
                    className="text-5xl md:text-7xl select-none"
                    style={{
                      filter: "drop-shadow(0 0 20px oklch(0.78 0.2 72))",
                    }}
                  >
                    ☸
                  </span>
                  <span
                    className="font-display text-xs mt-2"
                    style={{ color: "oklch(0.75 0.1 72)" }}
                  >
                    जन्म कुंडली
                  </span>
                </div>

                {/* Planet dots */}
                {["☀", "☽", "♂", "♃", "♄", "♀", "☿", "♅"].map((planet, idx) => {
                  const angle = (idx * 45 * Math.PI) / 180;
                  const r = 48;
                  return (
                    <motion.div
                      key={planet}
                      className="absolute w-7 h-7 flex items-center justify-center text-sm rounded-full"
                      style={{
                        left: `calc(50% + ${Math.cos(angle) * r}% - 14px)`,
                        top: `calc(50% + ${Math.sin(angle) * r}% - 14px)`,
                        backgroundColor: "oklch(0.12 0.06 285)",
                        border: "1px solid oklch(0.78 0.2 72 / 0.5)",
                        color: "oklch(0.88 0.22 80)",
                      }}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: idx * 0.25,
                      }}
                    >
                      {planet}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

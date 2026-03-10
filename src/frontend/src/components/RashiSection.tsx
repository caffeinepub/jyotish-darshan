import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useGetAllRashis, useGetHoroscope } from "../hooks/useQueries";

const FALLBACK_RASHIS = [
  {
    englishName: "Aries",
    hindiName: "मेष",
    dateRange: "Mar 21 - Apr 19",
    element: "Fire",
    rulingPlanet: "Mars",
    symbol: "♈",
    description:
      "Bold, ambitious, and energetic. Natural leader with great courage and determination.",
  },
  {
    englishName: "Taurus",
    hindiName: "वृषभ",
    dateRange: "Apr 20 - May 20",
    element: "Earth",
    rulingPlanet: "Venus",
    symbol: "♉",
    description:
      "Patient, reliable, and devoted. Loves beauty, comfort, and the finer things in life.",
  },
  {
    englishName: "Gemini",
    hindiName: "मिथुन",
    dateRange: "May 21 - Jun 20",
    element: "Air",
    rulingPlanet: "Mercury",
    symbol: "♊",
    description:
      "Adaptable, curious, and intelligent. Excellent communicator with a dual nature.",
  },
  {
    englishName: "Cancer",
    hindiName: "कर्क",
    dateRange: "Jun 21 - Jul 22",
    element: "Water",
    rulingPlanet: "Moon",
    symbol: "♋",
    description:
      "Intuitive, emotional, and caring. Deeply nurturing with strong family bonds.",
  },
  {
    englishName: "Leo",
    hindiName: "सिंह",
    dateRange: "Jul 23 - Aug 22",
    element: "Fire",
    rulingPlanet: "Sun",
    symbol: "♌",
    description:
      "Confident, dramatic, and proud. Natural performer with great leadership and warmth.",
  },
  {
    englishName: "Virgo",
    hindiName: "कन्या",
    dateRange: "Aug 23 - Sep 22",
    element: "Earth",
    rulingPlanet: "Mercury",
    symbol: "♍",
    description:
      "Analytical, practical, and diligent. Sharp eye for detail and dedication to service.",
  },
  {
    englishName: "Libra",
    hindiName: "तुला",
    dateRange: "Sep 23 - Oct 22",
    element: "Air",
    rulingPlanet: "Venus",
    symbol: "♎",
    description:
      "Balanced, harmonious, and diplomatic. Lover of beauty, art, and justice.",
  },
  {
    englishName: "Scorpio",
    hindiName: "वृश्चिक",
    dateRange: "Oct 23 - Nov 21",
    element: "Water",
    rulingPlanet: "Mars",
    symbol: "♏",
    description:
      "Intense, passionate, and transformative. Deep emotional intelligence and resilience.",
  },
  {
    englishName: "Sagittarius",
    hindiName: "धनु",
    dateRange: "Nov 22 - Dec 21",
    element: "Fire",
    rulingPlanet: "Jupiter",
    symbol: "♐",
    description:
      "Adventurous, philosophical, and optimistic. Seeker of truth and higher knowledge.",
  },
  {
    englishName: "Capricorn",
    hindiName: "मकर",
    dateRange: "Dec 22 - Jan 19",
    element: "Earth",
    rulingPlanet: "Saturn",
    symbol: "♑",
    description:
      "Disciplined, ambitious, and responsible. Patient climber toward the summit of success.",
  },
  {
    englishName: "Aquarius",
    hindiName: "कुम्भ",
    dateRange: "Jan 20 - Feb 18",
    element: "Air",
    rulingPlanet: "Saturn",
    symbol: "♒",
    description:
      "Innovative, humanitarian, and independent. Visionary thinker ahead of their time.",
  },
  {
    englishName: "Pisces",
    hindiName: "मीन",
    dateRange: "Feb 19 - Mar 20",
    element: "Water",
    rulingPlanet: "Jupiter",
    symbol: "♓",
    description:
      "Empathetic, imaginative, and spiritual. Deeply connected to the mystical realm.",
  },
];

const ELEMENT_COLORS: Record<string, string> = {
  Fire: "oklch(0.70 0.22 48)",
  Earth: "oklch(0.65 0.15 135)",
  Air: "oklch(0.72 0.18 220)",
  Water: "oklch(0.62 0.2 255)",
};

const SYMBOLS = [
  "♈",
  "♉",
  "♊",
  "♋",
  "♌",
  "♍",
  "♎",
  "♏",
  "♐",
  "♑",
  "♒",
  "♓",
];

interface RashiCardData {
  englishName: string;
  hindiName: string;
  dateRange: string;
  element: string;
  rulingPlanet: string;
  symbol?: string;
  description: string;
}

function RashiCard({
  rashi,
  symbol,
  index,
  onClick,
}: {
  rashi: RashiCardData;
  symbol: string;
  index: number;
  onClick: () => void;
}) {
  const elementColor = ELEMENT_COLORS[rashi.element] || "oklch(0.78 0.2 72)";

  return (
    <motion.button
      onClick={onClick}
      className="card-mystic rounded-2xl p-5 text-center w-full cursor-pointer group"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Symbol */}
      <motion.div
        className="text-4xl md:text-5xl mb-3 block"
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          delay: index * 0.3,
        }}
        style={{
          textShadow: `0 0 20px ${elementColor}`,
          filter: `drop-shadow(0 0 8px ${elementColor})`,
        }}
      >
        {symbol}
      </motion.div>

      {/* Hindi Name */}
      <div
        className="font-display font-bold text-lg mb-0.5"
        style={{ color: "oklch(0.88 0.22 80)" }}
      >
        {rashi.hindiName}
      </div>

      {/* English Name */}
      <div
        className="font-sans text-sm font-medium mb-2"
        style={{ color: "oklch(0.82 0.06 75)" }}
      >
        {rashi.englishName}
      </div>

      {/* Date range */}
      <div
        className="font-body text-xs mb-3"
        style={{ color: "oklch(0.65 0.05 285)" }}
      >
        {rashi.dateRange}
      </div>

      {/* Element badge */}
      <span
        className="inline-block px-2.5 py-0.5 rounded-full text-xs font-sans font-medium"
        style={{
          backgroundColor: `${elementColor}25`,
          color: elementColor,
          border: `1px solid ${elementColor}50`,
        }}
      >
        {rashi.element}
      </span>

      {/* Hover indicator */}
      <div
        className="mt-3 text-xs font-sans opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ color: "oklch(0.78 0.2 72)" }}
      >
        Tap for Horoscope →
      </div>
    </motion.button>
  );
}

function HoroscopeModal({
  rashi,
  onClose,
}: { rashi: RashiCardData & { symbol: string }; onClose: () => void }) {
  const { data: horoscope, isLoading } = useGetHoroscope(rashi.englishName);
  const elementColor = ELEMENT_COLORS[rashi.element] || "oklch(0.78 0.2 72)";

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent
        className="max-w-md rounded-2xl border p-0 overflow-hidden"
        style={{
          backgroundColor: "oklch(0.10 0.05 285)",
          borderColor: "oklch(0.78 0.2 72 / 0.4)",
          boxShadow: "0 0 60px oklch(0.78 0.2 72 / 0.3)",
        }}
      >
        {/* Header gradient */}
        <div
          className="p-6 text-center relative"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.12 0.06 285), oklch(0.15 0.08 295))",
            borderBottom: "1px solid oklch(0.78 0.2 72 / 0.2)",
          }}
        >
          <div
            className="text-6xl mb-3"
            style={{ filter: `drop-shadow(0 0 15px ${elementColor})` }}
          >
            {rashi.symbol}
          </div>
          <DialogTitle
            className="font-display font-bold text-2xl mb-1"
            style={{ color: "oklch(0.88 0.22 80)" }}
          >
            {rashi.hindiName} · {rashi.englishName}
          </DialogTitle>
          <p
            className="font-body text-sm"
            style={{ color: "oklch(0.65 0.05 285)" }}
          >
            {rashi.dateRange} · {rashi.rulingPlanet}
          </p>
          <Badge
            className="mt-2 text-xs"
            style={{
              backgroundColor: `${elementColor}25`,
              color: elementColor,
              border: `1px solid ${elementColor}40`,
            }}
          >
            {rashi.element} Sign
          </Badge>
        </div>

        <div className="p-6">
          <div className="mb-5">
            <p
              className="font-body text-sm leading-relaxed"
              style={{ color: "oklch(0.82 0.04 285)" }}
            >
              {rashi.description}
            </p>
          </div>

          <div
            className="rounded-xl p-4"
            style={{
              backgroundColor: "oklch(0.13 0.06 285)",
              border: "1px solid oklch(0.78 0.2 72 / 0.15)",
            }}
          >
            <div
              className="font-display font-semibold text-sm mb-3 flex items-center gap-2"
              style={{ color: "oklch(0.88 0.22 80)" }}
            >
              <span>⭐</span> Today's Horoscope
            </div>
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton
                  className="h-3 w-full rounded"
                  style={{ backgroundColor: "oklch(0.2 0.05 285)" }}
                />
                <Skeleton
                  className="h-3 w-4/5 rounded"
                  style={{ backgroundColor: "oklch(0.2 0.05 285)" }}
                />
                <Skeleton
                  className="h-3 w-3/5 rounded"
                  style={{ backgroundColor: "oklch(0.2 0.05 285)" }}
                />
              </div>
            ) : (
              <p
                className="font-body text-sm leading-relaxed"
                style={{ color: "oklch(0.78 0.04 285)" }}
              >
                {horoscope?.message ||
                  `The stars align beautifully for ${rashi.englishName} today. Jupiter's favorable position brings wisdom and abundance. Trust your intuition and embrace new opportunities that come your way. Your ${rashi.element} energy is especially strong — use it to manifest your deepest desires.`}
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function RashiSection() {
  const { data: backendRashis, isLoading } = useGetAllRashis();
  const [selectedRashi, setSelectedRashi] = useState<
    (RashiCardData & { symbol: string }) | null
  >(null);

  const rashis: RashiCardData[] =
    backendRashis && backendRashis.length > 0 ? backendRashis : FALLBACK_RASHIS;

  return (
    <section id="rashifal" className="relative py-24 z-10">
      {/* Section background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, oklch(0.15 0.07 295 / 0.4) 0%, transparent 70%)",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-16 section-reveal"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p
            className="font-sans text-xs uppercase tracking-[0.4em] mb-3"
            style={{ color: "oklch(0.78 0.2 72)" }}
          >
            वैदिक राशिफल
          </p>
          <h2
            className="font-display font-bold text-3xl md:text-5xl mb-4"
            style={{ color: "oklch(0.96 0.015 75)" }}
          >
            12 Rashis <span className="gold-gradient-text">आपकी राशि</span>
          </h2>
          <div className="om-divider">
            <span style={{ color: "oklch(0.78 0.2 72 / 0.6)" }}>✦</span>
            <span
              className="font-body text-sm"
              style={{ color: "oklch(0.65 0.05 285)" }}
            >
              Select your rashi to read today's horoscope
            </span>
            <span style={{ color: "oklch(0.78 0.2 72 / 0.6)" }}>✦</span>
          </div>
        </motion.div>

        {/* Rashis grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <Skeleton
                // biome-ignore lint/suspicious/noArrayIndexKey: static list
                key={i}
                className="h-44 rounded-2xl"
                style={{ backgroundColor: "oklch(0.14 0.05 285)" }}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {rashis.map((rashi, index) => (
              <RashiCard
                key={rashi.englishName}
                rashi={rashi}
                symbol={SYMBOLS[index] || "⭐"}
                index={index}
                onClick={() =>
                  setSelectedRashi({ ...rashi, symbol: SYMBOLS[index] || "⭐" })
                }
              />
            ))}
          </div>
        )}
      </div>

      {/* Horoscope modal */}
      <AnimatePresence>
        {selectedRashi && (
          <HoroscopeModal
            rashi={selectedRashi}
            onClose={() => setSelectedRashi(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

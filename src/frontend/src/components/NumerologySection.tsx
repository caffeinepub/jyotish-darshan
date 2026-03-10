import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Calculator } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useGetAllNumerology, useGetNumerology } from "../hooks/useQueries";

const NUMEROLOGY_FALLBACK = [
  {
    number: 1n,
    title: "The Leader",
    description:
      "Independent, original, and driven. You are a natural pioneer with exceptional leadership qualities.",
    strengths: "Leadership, Independence, Innovation",
    challenges: "Stubbornness, Loneliness, Self-centeredness",
  },
  {
    number: 2n,
    title: "The Diplomat",
    description:
      "Sensitive, cooperative, and peace-loving. You thrive in partnerships and bring balance to any situation.",
    strengths: "Diplomacy, Sensitivity, Cooperation",
    challenges: "Indecisiveness, Over-sensitivity, Dependency",
  },
  {
    number: 3n,
    title: "The Creator",
    description:
      "Expressive, joyful, and creative. Your artistic talents and communication skills are your greatest gifts.",
    strengths: "Creativity, Expression, Joy",
    challenges: "Scattered energy, Superficiality, Moodiness",
  },
  {
    number: 4n,
    title: "The Builder",
    description:
      "Practical, disciplined, and hardworking. You build strong foundations and achieve lasting success.",
    strengths: "Discipline, Reliability, Hard work",
    challenges: "Rigidity, Stubbornness, Limitation",
  },
  {
    number: 5n,
    title: "The Explorer",
    description:
      "Freedom-loving, adventurous, and versatile. Change and variety are the spices of your life.",
    strengths: "Freedom, Adaptability, Adventure",
    challenges: "Restlessness, Irresponsibility, Impulsiveness",
  },
  {
    number: 6n,
    title: "The Nurturer",
    description:
      "Responsible, caring, and family-oriented. You have a deep sense of duty and love for your community.",
    strengths: "Compassion, Nurturing, Responsibility",
    challenges: "Perfectionism, Self-sacrifice, Worry",
  },
  {
    number: 7n,
    title: "The Seeker",
    description:
      "Analytical, spiritual, and introspective. You seek truth, wisdom, and the deeper meaning of existence.",
    strengths: "Wisdom, Intuition, Spirituality",
    challenges: "Isolation, Cynicism, Secrecy",
  },
  {
    number: 8n,
    title: "The Achiever",
    description:
      "Ambitious, organized, and powerful. You have extraordinary potential for material and professional success.",
    strengths: "Ambition, Authority, Achievement",
    challenges: "Materialism, Domination, Workaholic",
  },
  {
    number: 9n,
    title: "The Humanitarian",
    description:
      "Compassionate, universal, and idealistic. Your life mission is service to humanity.",
    strengths: "Compassion, Generosity, Universal love",
    challenges: "Self-righteousness, Martyrdom, Bitterness",
  },
];

function calculateLifePathNumber(dateString: string): number | null {
  const digits = dateString.replace(/\D/g, "");
  if (!digits || digits.length < 8) return null;

  let sum = 0;
  for (const d of digits) sum += Number.parseInt(d);

  // Reduce to single digit (keep 11, 22, 33 as master numbers)
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    const s = sum.toString();
    sum = 0;
    for (const d of s) sum += Number.parseInt(d);
  }

  return sum;
}

export default function NumerologySection() {
  const { data: numerologyData, isLoading } = useGetAllNumerology();
  const [birthDate, setBirthDate] = useState("");
  const [lifePathNumber, setLifePathNumber] = useState<number | null>(null);
  const [calculated, setCalculated] = useState(false);

  const queryNumber =
    lifePathNumber !== null
      ? BigInt(lifePathNumber > 9 ? 1 : lifePathNumber)
      : null;
  const { data: detailedNumerology } = useGetNumerology(queryNumber);

  const numbers =
    numerologyData && numerologyData.length > 0
      ? numerologyData
      : NUMEROLOGY_FALLBACK;

  const selectedNumber = numbers.find(
    (n) => n.number === BigInt(lifePathNumber || 0),
  );

  const handleCalculate = () => {
    const num = calculateLifePathNumber(birthDate);
    setLifePathNumber(num);
    setCalculated(true);
  };

  return (
    <section id="numerology" className="relative py-24 z-10 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, oklch(0.20 0.10 300 / 0.25) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, oklch(0.15 0.08 260 / 0.2) 0%, transparent 60%)",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p
            className="font-sans text-xs uppercase tracking-[0.4em] mb-3"
            style={{ color: "oklch(0.78 0.2 72)" }}
          >
            अंकशास्त्र
          </p>
          <h2
            className="font-display font-bold text-3xl md:text-5xl mb-4"
            style={{ color: "oklch(0.96 0.015 75)" }}
          >
            Numerology <span className="gold-gradient-text">अंक ज्योतिष</span>
          </h2>
          <p
            className="font-body text-base md:text-lg max-w-2xl mx-auto"
            style={{ color: "oklch(0.65 0.05 285)" }}
          >
            Discover the hidden meaning of numbers in your life. Your Life Path
            Number reveals your soul's purpose.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          {/* Calculator */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div
              className="rounded-2xl p-8"
              style={{
                backgroundColor: "oklch(0.12 0.055 285 / 0.9)",
                border: "1px solid oklch(0.78 0.2 72 / 0.25)",
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "oklch(0.78 0.2 72 / 0.15)" }}
                >
                  <Calculator
                    className="w-5 h-5"
                    style={{ color: "oklch(0.88 0.22 80)" }}
                  />
                </div>
                <div>
                  <h3
                    className="font-display font-bold text-xl"
                    style={{ color: "oklch(0.96 0.015 75)" }}
                  >
                    Life Path Calculator
                  </h3>
                  <p
                    className="font-sans text-xs"
                    style={{ color: "oklch(0.65 0.05 285)" }}
                  >
                    जीवन पथ संख्या कैलकुलेटर
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label
                    htmlFor="birthdate-num"
                    className="font-sans text-sm font-medium mb-2 block"
                    style={{ color: "oklch(0.82 0.06 75)" }}
                  >
                    Date of Birth (जन्म तिथि)
                  </Label>
                  <input
                    id="birthdate-num"
                    type="date"
                    value={birthDate}
                    onChange={(e) => {
                      setBirthDate(e.target.value);
                      setCalculated(false);
                    }}
                    className="w-full rounded-xl px-4 py-3 font-sans text-sm outline-none focus:ring-2 transition-all"
                    style={{
                      backgroundColor: "oklch(0.16 0.06 285)",
                      border: "1px solid oklch(0.78 0.2 72 / 0.2)",
                      color: "oklch(0.92 0.01 75)",
                      colorScheme: "dark",
                    }}
                  />
                </div>

                <Button
                  onClick={handleCalculate}
                  disabled={!birthDate}
                  className="w-full font-sans font-bold py-3 rounded-xl"
                  style={{
                    background: birthDate
                      ? "linear-gradient(135deg, oklch(0.68 0.2 48), oklch(0.82 0.22 72))"
                      : "oklch(0.2 0.04 285)",
                    color: birthDate
                      ? "oklch(0.10 0.04 285)"
                      : "oklch(0.5 0.03 285)",
                  }}
                >
                  Calculate My Life Path Number
                </Button>
              </div>

              <AnimatePresence>
                {calculated && lifePathNumber !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="mt-6 text-center"
                  >
                    <div
                      className="rounded-2xl p-6"
                      style={{
                        background:
                          "linear-gradient(135deg, oklch(0.14 0.07 295), oklch(0.11 0.05 285))",
                        border: "1px solid oklch(0.78 0.2 72 / 0.3)",
                      }}
                    >
                      <p
                        className="font-sans text-xs uppercase tracking-widest mb-2"
                        style={{ color: "oklch(0.65 0.05 285)" }}
                      >
                        Your Life Path Number
                      </p>
                      <motion.div
                        className="text-7xl font-display font-black mb-2"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1, repeat: 2 }}
                        style={{ color: "oklch(0.88 0.22 80)" }}
                      >
                        {lifePathNumber}
                      </motion.div>
                      {selectedNumber && (
                        <>
                          <div
                            className="font-display font-bold text-xl mb-3"
                            style={{ color: "oklch(0.96 0.015 75)" }}
                          >
                            {detailedNumerology?.title || selectedNumber.title}
                          </div>
                          <p
                            className="font-body text-sm leading-relaxed mb-4"
                            style={{ color: "oklch(0.75 0.04 285)" }}
                          >
                            {detailedNumerology?.description ||
                              selectedNumber.description}
                          </p>
                          <div className="grid grid-cols-2 gap-3 text-left">
                            <div
                              className="rounded-xl p-3"
                              style={{
                                backgroundColor: "oklch(0.12 0.06 285)",
                              }}
                            >
                              <p
                                className="font-sans text-xs font-bold mb-1"
                                style={{ color: "oklch(0.65 0.15 135)" }}
                              >
                                ✓ Strengths
                              </p>
                              <p
                                className="font-body text-xs"
                                style={{ color: "oklch(0.78 0.04 285)" }}
                              >
                                {
                                  (
                                    detailedNumerology?.strengths ||
                                    selectedNumber.strengths
                                  ).split(",")[0]
                                }
                              </p>
                            </div>
                            <div
                              className="rounded-xl p-3"
                              style={{
                                backgroundColor: "oklch(0.12 0.06 285)",
                              }}
                            >
                              <p
                                className="font-sans text-xs font-bold mb-1"
                                style={{ color: "oklch(0.70 0.22 48)" }}
                              >
                                ⚡ Challenges
                              </p>
                              <p
                                className="font-body text-xs"
                                style={{ color: "oklch(0.78 0.04 285)" }}
                              >
                                {
                                  (
                                    detailedNumerology?.challenges ||
                                    selectedNumber.challenges
                                  ).split(",")[0]
                                }
                              </p>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
                {calculated && lifePathNumber === null && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 text-center font-sans text-sm"
                    style={{ color: "oklch(0.70 0.22 48)" }}
                  >
                    Please enter a valid birth date
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Numbers grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h3
              className="font-display font-bold text-xl mb-6 text-center"
              style={{ color: "oklch(0.88 0.22 80)" }}
            >
              Number Meanings
            </h3>
            {isLoading ? (
              <div className="grid grid-cols-3 gap-3">
                {Array.from({ length: 9 }).map((_, i) => (
                  <Skeleton
                    // biome-ignore lint/suspicious/noArrayIndexKey: static list
                    key={i}
                    className="h-24 rounded-xl"
                    style={{ backgroundColor: "oklch(0.14 0.05 285)" }}
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-3">
                {numbers.slice(0, 9).map((num, i) => (
                  <motion.div
                    key={num.number.toString()}
                    className="rounded-xl p-3 text-center cursor-pointer transition-all"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    whileHover={{ scale: 1.05 }}
                    style={{
                      backgroundColor:
                        lifePathNumber === Number(num.number)
                          ? "oklch(0.18 0.09 285)"
                          : "oklch(0.13 0.055 285 / 0.8)",
                      border:
                        lifePathNumber === Number(num.number)
                          ? "1px solid oklch(0.78 0.2 72 / 0.8)"
                          : "1px solid oklch(0.78 0.2 72 / 0.15)",
                      boxShadow:
                        lifePathNumber === Number(num.number)
                          ? "0 0 20px oklch(0.78 0.2 72 / 0.3)"
                          : "none",
                    }}
                  >
                    <div
                      className="font-display font-black text-3xl mb-1"
                      style={{ color: "oklch(0.88 0.22 80)" }}
                    >
                      {num.number.toString()}
                    </div>
                    <div
                      className="font-sans text-xs font-semibold leading-tight"
                      style={{ color: "oklch(0.78 0.06 75)" }}
                    >
                      {num.title}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Master numbers */}
            <div className="mt-4 flex gap-3">
              {[11, 22, 33].map((master) => (
                <div
                  key={master}
                  className="flex-1 rounded-xl p-3 text-center"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.18 0.1 295 / 0.6), oklch(0.14 0.07 285 / 0.6))",
                    border: "1px solid oklch(0.55 0.2 285 / 0.4)",
                  }}
                >
                  <div
                    className="font-display font-black text-2xl"
                    style={{ color: "oklch(0.75 0.18 285)" }}
                  >
                    {master}
                  </div>
                  <div
                    className="font-sans text-xs"
                    style={{ color: "oklch(0.65 0.05 285)" }}
                  >
                    Master #
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Languages, Star } from "lucide-react";
import { motion } from "motion/react";
import { useGetAllAstrologers } from "../hooks/useQueries";

const ASTROLOGERS_FALLBACK = [
  {
    name: "Pt. Rajesh Sharma",
    specialization: "Vedic Astrology & Kundali",
    experience: 25n,
    languages: "Hindi, English, Sanskrit",
    rating: 4.9,
  },
  {
    name: "Dr. Meera Joshi",
    specialization: "Numerology & Palmistry",
    experience: 18n,
    languages: "Hindi, Gujarati, English",
    rating: 4.8,
  },
  {
    name: "Acharya Suresh Pandey",
    specialization: "Vastu Shastra",
    experience: 32n,
    languages: "Hindi, Sanskrit, Marathi",
    rating: 5.0,
  },
  {
    name: "Jyotishi Anita Devi",
    specialization: "Tarot & Spiritual Healing",
    experience: 15n,
    languages: "Hindi, Bengali, English",
    rating: 4.7,
  },
  {
    name: "Pt. Vinod Tiwari",
    specialization: "Panchang & Muhurta",
    experience: 28n,
    languages: "Hindi, English",
    rating: 4.9,
  },
  {
    name: "Swami Pradeep Ji",
    specialization: "Lal Kitab & Remedies",
    experience: 22n,
    languages: "Hindi, Punjabi, English",
    rating: 4.8,
  },
];

const AVATAR_COLORS = [
  "oklch(0.55 0.2 285)",
  "oklch(0.60 0.18 305)",
  "oklch(0.58 0.18 135)",
  "oklch(0.65 0.2 330)",
  "oklch(0.60 0.18 200)",
  "oklch(0.62 0.16 48)",
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          // biome-ignore lint/suspicious/noArrayIndexKey: static list
          key={i}
          className="w-3.5 h-3.5"
          style={{
            fill:
              i < Math.floor(rating) ? "oklch(0.88 0.22 80)" : "transparent",
            color: "oklch(0.88 0.22 80)",
          }}
        />
      ))}
      <span
        className="ml-1.5 font-sans text-xs font-bold"
        style={{ color: "oklch(0.88 0.22 80)" }}
      >
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

export default function AstrologersSection() {
  const { data: astrologers, isLoading } = useGetAllAstrologers();
  const list =
    astrologers && astrologers.length > 0 ? astrologers : ASTROLOGERS_FALLBACK;

  return (
    <section id="astrologers" className="relative py-24 z-10 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 80%, oklch(0.18 0.08 295 / 0.2) 0%, transparent 60%)",
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
            हमारे विशेषज्ञ
          </p>
          <h2
            className="font-display font-bold text-3xl md:text-5xl mb-4"
            style={{ color: "oklch(0.96 0.015 75)" }}
          >
            Our <span className="gold-gradient-text">Expert Astrologers</span>
          </h2>
          <p
            className="font-body text-base max-w-2xl mx-auto"
            style={{ color: "oklch(0.65 0.05 285)" }}
          >
            Connect with India's most trusted Vedic astrologers, each with
            decades of experience in guiding thousands of souls on their cosmic
            journey.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton
                // biome-ignore lint/suspicious/noArrayIndexKey: static list
                key={i}
                className="h-52 rounded-2xl"
                style={{ backgroundColor: "oklch(0.14 0.05 285)" }}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((astrologer, i) => (
              <motion.div
                key={astrologer.name}
                className="card-mystic rounded-2xl p-6 flex flex-col group"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
              >
                {/* Avatar + info row */}
                <div className="flex items-center gap-4 mb-4">
                  {/* Avatar */}
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-display font-bold flex-shrink-0 relative"
                    style={{
                      background: `radial-gradient(circle at 30% 30%, ${AVATAR_COLORS[i % AVATAR_COLORS.length]}, oklch(0.10 0.04 285))`,
                      boxShadow: `0 0 15px ${AVATAR_COLORS[i % AVATAR_COLORS.length]}50`,
                    }}
                  >
                    {astrologer.name.charAt(0)}
                    {/* Glow ring on hover */}
                    <div
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{
                        border: `2px solid ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`,
                        boxShadow: `0 0 10px ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`,
                      }}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3
                      className="font-display font-bold text-base leading-tight mb-0.5"
                      style={{ color: "oklch(0.96 0.015 75)" }}
                    >
                      {astrologer.name}
                    </h3>
                    <StarRating rating={astrologer.rating} />
                  </div>
                </div>

                {/* Specialization */}
                <div
                  className="rounded-lg px-3 py-2 mb-4"
                  style={{
                    backgroundColor: "oklch(0.15 0.065 285)",
                    border: "1px solid oklch(0.78 0.2 72 / 0.1)",
                  }}
                >
                  <p
                    className="font-sans text-xs font-semibold uppercase tracking-wider mb-0.5"
                    style={{ color: "oklch(0.65 0.05 285)" }}
                  >
                    Specialization
                  </p>
                  <p
                    className="font-body text-sm"
                    style={{ color: "oklch(0.88 0.22 80)" }}
                  >
                    {astrologer.specialization}
                  </p>
                </div>

                {/* Details */}
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base">⭐</span>
                    <span
                      className="font-sans text-xs font-medium"
                      style={{ color: "oklch(0.75 0.04 285)" }}
                    >
                      {astrologer.experience.toString()}+ yrs exp.
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Languages
                      className="w-3.5 h-3.5"
                      style={{ color: "oklch(0.65 0.05 285)" }}
                    />
                    <span
                      className="font-sans text-xs"
                      style={{ color: "oklch(0.65 0.05 285)" }}
                    >
                      {astrologer.languages.split(",")[0].trim()}
                    </span>
                  </div>
                </div>

                {/* Consult button */}
                <button
                  type="button"
                  className="mt-4 w-full py-2.5 rounded-xl font-sans text-sm font-semibold transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.68 0.2 48 / 0.8), oklch(0.78 0.22 65 / 0.8))",
                    color: "oklch(0.10 0.04 285)",
                    border: "1px solid oklch(0.88 0.22 80 / 0.5)",
                    transition: "all 0.3s ease",
                  }}
                >
                  Consult Now →
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

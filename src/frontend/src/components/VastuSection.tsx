import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Compass } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useGetAllVastuTips } from "../hooks/useQueries";

const VASTU_FALLBACK = [
  {
    title: "Main Entrance — North or East",
    description:
      "Place the main entrance of your home in the North or East direction. This invites positive energy, wealth, and prosperity into the house.",
    category: "Entrance",
    benefit: "Attracts wealth and positivity",
  },
  {
    title: "Bedroom — South or Southwest",
    description:
      "The master bedroom should ideally be in the South or Southwest corner. Sleep with your head pointing South for peaceful sleep.",
    category: "Bedroom",
    benefit: "Restful sleep and stability",
  },
  {
    title: "Kitchen — Southeast Corner",
    description:
      "The kitchen represents fire and should be placed in the Southeast (Agni) corner. This ensures good health and nourishment for the family.",
    category: "Kitchen",
    benefit: "Good health and vitality",
  },
  {
    title: "Puja Room — Northeast",
    description:
      "The prayer room should be in the Northeast (Ishaan) corner, which is considered the most auspicious direction for spiritual activities.",
    category: "Puja Room",
    benefit: "Spiritual growth and divine blessings",
  },
  {
    title: "Study Room — East or North",
    description:
      "Place your study table facing East or North to enhance concentration, knowledge retention, and academic success.",
    category: "Study",
    benefit: "Better focus and knowledge",
  },
  {
    title: "Water Bodies — Northeast or North",
    description:
      "Aquariums, fountains, or water features should be in the Northeast or North. Avoid water in South or Southeast directions.",
    category: "Water",
    benefit: "Flow of wealth and luck",
  },
  {
    title: "Colors for Living Room",
    description:
      "Use light and soothing colors like cream, light yellow, or light green in the living room. Avoid dark or aggressive colors in common areas.",
    category: "Colors",
    benefit: "Harmony and positive relationships",
  },
  {
    title: "Avoid Clutter",
    description:
      "Clutter blocks the flow of positive energy. Keep your home clean and organized, especially the entrance and corners.",
    category: "General",
    benefit: "Energy flow and mental clarity",
  },
];

// Reserved for potential static filter usage
const _CATEGORIES = [
  "All",
  "Entrance",
  "Bedroom",
  "Kitchen",
  "Puja Room",
  "Study",
  "Water",
  "Colors",
  "General",
];
void _CATEGORIES;

const DIRECTION_ICONS: Record<string, string> = {
  Entrance: "🚪",
  Bedroom: "🛏",
  Kitchen: "🔥",
  "Puja Room": "🪔",
  Study: "📚",
  Water: "💧",
  Colors: "🎨",
  General: "🏠",
};

export default function VastuSection() {
  const { data: vastuData, isLoading } = useGetAllVastuTips();
  const [activeCategory, setActiveCategory] = useState("All");

  const tips = vastuData && vastuData.length > 0 ? vastuData : VASTU_FALLBACK;
  const filteredTips =
    activeCategory === "All"
      ? tips
      : tips.filter((t) => t.category === activeCategory);

  const uniqueCategories = [
    "All",
    ...Array.from(new Set(tips.map((t) => t.category))),
  ];

  return (
    <section id="vastu" className="relative py-24 z-10 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 70% 50%, oklch(0.18 0.08 55 / 0.1) 0%, transparent 60%)",
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
            गृह निर्माण विज्ञान
          </p>
          <h2
            className="font-display font-bold text-3xl md:text-5xl mb-4"
            style={{ color: "oklch(0.96 0.015 75)" }}
          >
            Vastu Shastra <span className="gold-gradient-text">वास्तु शास्त्र</span>
          </h2>
          <p
            className="font-body text-base max-w-2xl mx-auto"
            style={{ color: "oklch(0.65 0.05 285)" }}
          >
            Ancient Indian science of architecture and spatial arrangement to
            create harmony between humans and nature.
          </p>
        </motion.div>

        {/* Main layout */}
        <div className="grid lg:grid-cols-5 gap-10 items-start">
          {/* Left — Vastu diagram */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div
              className="rounded-2xl overflow-hidden sticky top-24"
              style={{
                border: "1px solid oklch(0.78 0.2 72 / 0.25)",
                boxShadow: "0 0 40px oklch(0.78 0.2 72 / 0.1)",
              }}
            >
              <img
                src="/assets/generated/vastu-diagram.dim_500x500.jpg"
                alt="Vastu Shastra Diagram"
                className="w-full h-auto"
              />
              <div
                className="p-5"
                style={{ backgroundColor: "oklch(0.12 0.055 285 / 0.95)" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Compass
                    className="w-4 h-4"
                    style={{ color: "oklch(0.88 0.22 80)" }}
                  />
                  <span
                    className="font-display font-semibold text-sm"
                    style={{ color: "oklch(0.88 0.22 80)" }}
                  >
                    The 8 Directions
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-y-1 gap-x-4">
                  {[
                    ["North (उत्तर)", "Wealth"],
                    ["NE (ईशान)", "Spiritual"],
                    ["East (पूर्व)", "New Start"],
                    ["SE (आग्नेय)", "Energy"],
                    ["South (दक्षिण)", "Fame"],
                    ["SW (नैऋत्य)", "Stability"],
                    ["West (पश्चिम)", "Gains"],
                    ["NW (वायव्य)", "Movement"],
                  ].map(([dir, meaning]) => (
                    <div
                      key={dir}
                      className="text-xs font-sans"
                      style={{ color: "oklch(0.65 0.04 285)" }}
                    >
                      <span style={{ color: "oklch(0.78 0.15 72)" }}>•</span>{" "}
                      {dir}
                      <span
                        className="ml-1"
                        style={{ color: "oklch(0.55 0.04 285)" }}
                      >
                        ({meaning})
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — Tips */}
          <div className="lg:col-span-3">
            {/* Category filter */}
            <motion.div
              className="flex flex-wrap gap-2 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {uniqueCategories.map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="px-4 py-1.5 rounded-full font-sans text-xs font-medium transition-all"
                  style={{
                    backgroundColor:
                      activeCategory === cat
                        ? "oklch(0.78 0.2 72)"
                        : "oklch(0.14 0.055 285)",
                    color:
                      activeCategory === cat
                        ? "oklch(0.10 0.04 285)"
                        : "oklch(0.75 0.04 285)",
                    border:
                      activeCategory === cat
                        ? "none"
                        : "1px solid oklch(0.78 0.2 72 / 0.2)",
                  }}
                >
                  {DIRECTION_ICONS[cat] || ""} {cat}
                </button>
              ))}
            </motion.div>

            {/* Tips grid */}
            {isLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton
                    // biome-ignore lint/suspicious/noArrayIndexKey: static list
                    key={i}
                    className="h-28 rounded-xl"
                    style={{ backgroundColor: "oklch(0.14 0.05 285)" }}
                  />
                ))}
              </div>
            ) : (
              <AnimatePresence mode="popLayout">
                <div className="space-y-4">
                  {filteredTips.map((tip, i) => (
                    <motion.div
                      key={`${tip.title}-${activeCategory}`}
                      className="rounded-xl p-5 group cursor-default"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4, delay: i * 0.06 }}
                      whileHover={{ x: 4 }}
                      style={{
                        backgroundColor: "oklch(0.13 0.055 285 / 0.8)",
                        border: "1px solid oklch(0.78 0.2 72 / 0.15)",
                        transition:
                          "border-color 0.3s ease, box-shadow 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor =
                          "oklch(0.78 0.2 72 / 0.5)";
                        e.currentTarget.style.boxShadow =
                          "0 0 20px oklch(0.78 0.2 72 / 0.1)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor =
                          "oklch(0.78 0.2 72 / 0.15)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className="text-2xl flex-shrink-0 mt-0.5"
                          style={{
                            filter:
                              "drop-shadow(0 0 8px oklch(0.78 0.2 72 / 0.5))",
                          }}
                        >
                          {DIRECTION_ICONS[tip.category] || "🏠"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <h4
                              className="font-display font-semibold text-base leading-tight"
                              style={{ color: "oklch(0.92 0.01 75)" }}
                            >
                              {tip.title}
                            </h4>
                            <Badge
                              className="flex-shrink-0 text-xs px-2 py-0.5"
                              style={{
                                backgroundColor: "oklch(0.18 0.09 285)",
                                color: "oklch(0.75 0.15 285)",
                                border: "1px solid oklch(0.55 0.15 285 / 0.4)",
                              }}
                            >
                              {tip.category}
                            </Badge>
                          </div>
                          <p
                            className="font-body text-sm leading-relaxed mb-3"
                            style={{ color: "oklch(0.72 0.04 285)" }}
                          >
                            {tip.description}
                          </p>
                          <div
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-sans"
                            style={{
                              backgroundColor: "oklch(0.65 0.15 135 / 0.15)",
                              color: "oklch(0.70 0.15 135)",
                              border: "1px solid oklch(0.65 0.15 135 / 0.3)",
                            }}
                          >
                            <span>✨</span>
                            {tip.benefit}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

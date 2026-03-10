import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, Loader2, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useSubmitKundali } from "../hooks/useQueries";

interface KundaliModalProps {
  open: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
  email: string;
}

const INITIAL_FORM: FormData = {
  name: "",
  dateOfBirth: "",
  timeOfBirth: "",
  placeOfBirth: "",
  email: "",
};

export default function KundaliModal({ open, onClose }: KundaliModalProps) {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [submittedId, setSubmittedId] = useState<bigint | null>(null);
  const { mutate, isPending } = useSubmitKundali();

  const handleChange =
    (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.dateOfBirth || !form.placeOfBirth) {
      toast.error("Please fill in all required fields");
      return;
    }

    mutate(form, {
      onSuccess: (id) => {
        setSubmittedId(id);
        toast.success("Kundali request submitted successfully!");
      },
      onError: () => {
        toast.error("Failed to submit. Please try again.");
      },
    });
  };

  const handleClose = () => {
    setForm(INITIAL_FORM);
    setSubmittedId(null);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="max-w-lg rounded-3xl border p-0 overflow-hidden"
        style={{
          backgroundColor: "oklch(0.09 0.045 285)",
          borderColor: "oklch(0.78 0.2 72 / 0.4)",
          boxShadow:
            "0 0 80px oklch(0.78 0.2 72 / 0.25), 0 0 40px oklch(0.55 0.2 285 / 0.2)",
        }}
      >
        {/* Header */}
        <div
          className="relative p-6 text-center overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.13 0.07 295), oklch(0.11 0.055 285))",
            borderBottom: "1px solid oklch(0.78 0.2 72 / 0.2)",
          }}
        >
          {/* Decorative glow */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-20 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse, oklch(0.78 0.2 72 / 0.2), transparent)",
            }}
          />

          <motion.div
            className="text-4xl mb-2 relative z-10"
            animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
          >
            ☸
          </motion.div>

          <DialogTitle
            className="font-display font-bold text-2xl mb-1 relative z-10"
            style={{ color: "oklch(0.92 0.01 75)" }}
          >
            Free Kundali
          </DialogTitle>
          <DialogDescription
            className="font-body text-sm relative z-10"
            style={{ color: "oklch(0.65 0.05 285)" }}
          >
            जन्म कुंडली — Fill in your birth details for a personalized reading
          </DialogDescription>
        </div>

        <AnimatePresence mode="wait">
          {submittedId !== null ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="p-8 text-center"
            >
              <motion.div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{
                  backgroundColor: "oklch(0.65 0.15 135 / 0.15)",
                  border: "2px solid oklch(0.65 0.15 135 / 0.4)",
                }}
                animate={{ scale: [0.8, 1.1, 1] }}
                transition={{ duration: 0.6 }}
              >
                <CheckCircle
                  className="w-10 h-10"
                  style={{ color: "oklch(0.70 0.18 135)" }}
                />
              </motion.div>
              <h3
                className="font-display font-bold text-xl mb-2"
                style={{ color: "oklch(0.96 0.015 75)" }}
              >
                Request Submitted!
              </h3>
              <p
                className="font-body text-sm mb-4"
                style={{ color: "oklch(0.72 0.04 285)" }}
              >
                Your Kundali request has been received. Our expert astrologers
                will analyze your birth chart and send your free Kundali
                shortly.
              </p>
              <div
                className="rounded-xl p-4 mb-6"
                style={{
                  backgroundColor: "oklch(0.13 0.055 285)",
                  border: "1px solid oklch(0.78 0.2 72 / 0.2)",
                }}
              >
                <p
                  className="font-sans text-xs uppercase tracking-wider mb-1"
                  style={{ color: "oklch(0.65 0.05 285)" }}
                >
                  Reference ID
                </p>
                <p
                  className="font-display font-bold text-2xl"
                  style={{ color: "oklch(0.88 0.22 80)" }}
                >
                  #{submittedId.toString().padStart(6, "0")}
                </p>
              </div>
              <Button
                onClick={handleClose}
                className="w-full rounded-xl font-sans font-semibold"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.68 0.2 48), oklch(0.82 0.22 72))",
                  color: "oklch(0.10 0.04 285)",
                }}
              >
                Close
              </Button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="p-6 space-y-4"
            >
              {/* Full Name */}
              <div>
                <Label
                  htmlFor="kundali-name"
                  className="font-sans text-sm font-medium mb-1.5 block"
                  style={{ color: "oklch(0.82 0.06 75)" }}
                >
                  Full Name{" "}
                  <span style={{ color: "oklch(0.70 0.22 48)" }}>*</span>
                </Label>
                <Input
                  id="kundali-name"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={handleChange("name")}
                  required
                  className="rounded-xl border font-sans text-sm"
                  style={{
                    backgroundColor: "oklch(0.14 0.06 285)",
                    borderColor: "oklch(0.78 0.2 72 / 0.2)",
                    color: "oklch(0.92 0.01 75)",
                  }}
                />
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="kundali-dob"
                    className="font-sans text-sm font-medium mb-1.5 block"
                    style={{ color: "oklch(0.82 0.06 75)" }}
                  >
                    Date of Birth{" "}
                    <span style={{ color: "oklch(0.70 0.22 48)" }}>*</span>
                  </Label>
                  <input
                    id="kundali-dob"
                    type="date"
                    value={form.dateOfBirth}
                    onChange={handleChange("dateOfBirth")}
                    required
                    className="w-full rounded-xl px-3 py-2.5 font-sans text-sm outline-none focus:ring-1"
                    style={{
                      backgroundColor: "oklch(0.14 0.06 285)",
                      border: "1px solid oklch(0.78 0.2 72 / 0.2)",
                      color: "oklch(0.92 0.01 75)",
                      colorScheme: "dark",
                    }}
                  />
                </div>
                <div>
                  <Label
                    htmlFor="kundali-tob"
                    className="font-sans text-sm font-medium mb-1.5 block"
                    style={{ color: "oklch(0.82 0.06 75)" }}
                  >
                    Time of Birth
                  </Label>
                  <input
                    id="kundali-tob"
                    type="time"
                    value={form.timeOfBirth}
                    onChange={handleChange("timeOfBirth")}
                    className="w-full rounded-xl px-3 py-2.5 font-sans text-sm outline-none focus:ring-1"
                    style={{
                      backgroundColor: "oklch(0.14 0.06 285)",
                      border: "1px solid oklch(0.78 0.2 72 / 0.2)",
                      color: "oklch(0.92 0.01 75)",
                      colorScheme: "dark",
                    }}
                  />
                </div>
              </div>

              {/* Place of Birth */}
              <div>
                <Label
                  htmlFor="kundali-pob"
                  className="font-sans text-sm font-medium mb-1.5 block"
                  style={{ color: "oklch(0.82 0.06 75)" }}
                >
                  Place of Birth{" "}
                  <span style={{ color: "oklch(0.70 0.22 48)" }}>*</span>
                </Label>
                <Input
                  id="kundali-pob"
                  placeholder="e.g. Mumbai, Maharashtra"
                  value={form.placeOfBirth}
                  onChange={handleChange("placeOfBirth")}
                  required
                  className="rounded-xl border font-sans text-sm"
                  style={{
                    backgroundColor: "oklch(0.14 0.06 285)",
                    borderColor: "oklch(0.78 0.2 72 / 0.2)",
                    color: "oklch(0.92 0.01 75)",
                  }}
                />
              </div>

              {/* Email */}
              <div>
                <Label
                  htmlFor="kundali-email"
                  className="font-sans text-sm font-medium mb-1.5 block"
                  style={{ color: "oklch(0.82 0.06 75)" }}
                >
                  Email Address
                </Label>
                <Input
                  id="kundali-email"
                  type="email"
                  placeholder="Send Kundali to your email"
                  value={form.email}
                  onChange={handleChange("email")}
                  className="rounded-xl border font-sans text-sm"
                  style={{
                    backgroundColor: "oklch(0.14 0.06 285)",
                    borderColor: "oklch(0.78 0.2 72 / 0.2)",
                    color: "oklch(0.92 0.01 75)",
                  }}
                />
              </div>

              {/* Submit */}
              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full py-3 rounded-xl font-sans font-bold text-base"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.68 0.2 48), oklch(0.82 0.22 72))",
                    color: "oklch(0.10 0.04 285)",
                    opacity: isPending ? 0.7 : 1,
                  }}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating Your Kundali...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Get My Free Kundali ✨
                    </>
                  )}
                </Button>
                <p
                  className="text-center font-sans text-xs mt-3"
                  style={{ color: "oklch(0.55 0.04 285)" }}
                >
                  Your data is secure and used only for astrological analysis
                </p>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}

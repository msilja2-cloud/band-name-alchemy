import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import ToggleChips from "@/components/ToggleChips";
import BandNameCard from "@/components/BandNameCard";
import LoadingAnimation from "@/components/LoadingAnimation";
import ThumbsUpSection from "@/components/ThumbsUpSection";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const WORD_COUNTS = ["1 Word", "2 Words", "3 Words"];
const MOODS = ["Dark & Brooding", "Euphoric", "Mysterious", "Aggressive", "Melancholic", "Playful", "Ethereal", "Gritty"];
const STYLES = ["Humorous", "Classic", "Poetic", "Absurdist", "Edgy", "Nostalgic", "Cryptic", "Inspirational", "Ironic"];

const Index = () => {
  const [wordCount, setWordCount] = useState<string | null>(null);
  const [mood, setMood] = useState<string | null>(null);
  const [style, setStyle] = useState<string | null>(null);
  const [names, setNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ wordCount: false, mood: false, style: false });

  const generate = async () => {
    const newErrors = {
      wordCount: !wordCount,
      mood: !mood,
      style: !style,
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) return;

    setLoading(true);
    setNames([]);

    try {
      const { data, error } = await supabase.functions.invoke("generate-band-names", {
        body: { wordCount, mood, style },
      });

      if (error) throw error;
      setNames(data.names || []);
    } catch (e: any) {
      console.error(e);
      toast.error("Failed to generate names. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="noise-bg min-h-screen flex flex-col">
      <div className="flex-1 w-full max-w-3xl mx-auto px-4 py-12 md:py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-display text-6xl md:text-8xl tracking-wider text-primary">
            BandMonkey
          </h1>
          <p className="text-muted-foreground font-body mt-2 text-lg">
            AI-powered band name generator
          </p>
        </motion.div>

        {/* Controls */}
        <div className="space-y-6 mb-10">
          <ToggleChips label="Word Count" options={WORD_COUNTS} selected={wordCount} onSelect={setWordCount} error={errors.wordCount} />
          <ToggleChips label="Mood" options={MOODS} selected={mood} onSelect={setMood} error={errors.mood} />
          <ToggleChips label="Style" options={STYLES} selected={style} onSelect={setStyle} error={errors.style} />
        </div>

        {/* Generate Button */}
        <div className="flex justify-center mb-12">
          <Button
            variant="generate"
            size="lg"
            onClick={generate}
            disabled={loading}
            className="px-12 py-6 text-2xl"
          >
            {loading ? "Generating..." : names.length > 0 ? "Regenerate" : "Generate Names"}
          </Button>
        </div>

        {/* Results */}
        <AnimatePresence mode="wait">
          {loading && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <LoadingAnimation />
            </motion.div>
          )}

          {!loading && names.length > 0 && (
            <motion.div key="results" className="space-y-4">
              {names.map((name, i) => (
                <BandNameCard key={`${name}-${i}`} name={name} index={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;

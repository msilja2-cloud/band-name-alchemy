import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThumbsUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const ThumbsUpSection = () => {
  const [count, setCount] = useState<number>(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const fetchCount = async () => {
      const { count: total, error } = await supabase
        .from("thumbs_up")
        .select("*", { count: "exact", head: true });
      if (!error && total !== null) setCount(total);
    };
    fetchCount();
  }, []);

  const handleThumbsUp = async () => {
    setAnimating(true);
    const { error } = await supabase.from("thumbs_up").insert({});
    if (error) {
      toast.error("Something went wrong!");
    } else {
      setCount((c) => c + 1);
    }
    setTimeout(() => setAnimating(false), 600);
  };

  return (
    <div className="flex flex-col items-center gap-2 mb-10">
      <p className="text-muted-foreground font-body text-sm">
        Did you find what you were looking for? Give me a thumbs-up!
      </p>
      <div className="flex items-center gap-3">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleThumbsUp}
          className="p-2 rounded-full border border-border bg-muted hover:border-primary hover:text-primary transition-colors"
        >
          <motion.div
            animate={animating ? { y: [0, -8, 0], rotate: [0, -10, 10, 0] } : {}}
            transition={{ duration: 0.5 }}
          >
            <ThumbsUp className="w-5 h-5" />
          </motion.div>
        </motion.button>
        <AnimatePresence mode="popLayout">
          <motion.span
            key={count}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="text-primary font-display text-2xl min-w-[2ch] text-center"
          >
            {count}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ThumbsUpSection;

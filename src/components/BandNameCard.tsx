import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface BandNameCardProps {
  name: string;
  index: number;
}

const BandNameCard = ({ name, index }: BandNameCardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(name);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative bg-card border border-border rounded-lg p-6 flex items-center justify-between hover:border-primary/50 transition-colors"
    >
      <span className="font-display text-3xl md:text-4xl tracking-wider text-foreground uppercase">
        {name}
      </span>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleCopy}
        className="shrink-0 text-muted-foreground hover:text-primary"
      >
        {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
      </Button>
    </motion.div>
  );
};

export default BandNameCard;

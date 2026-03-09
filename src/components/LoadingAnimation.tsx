import { motion } from "framer-motion";

const LoadingAnimation = () => {
  return (
    <div className="flex flex-col items-center gap-4 py-12">
      <div className="flex gap-2">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-8 bg-primary rounded-sm"
            animate={{ scaleY: [1, 2, 1] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      <p className="text-muted-foreground font-body text-sm">Conjuring band names...</p>
    </div>
  );
};

export default LoadingAnimation;

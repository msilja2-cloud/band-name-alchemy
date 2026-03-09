import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ToggleChipsProps {
  label: string;
  options: string[];
  selected: string | null;
  onSelect: (value: string) => void;
  error?: boolean;
}

const ToggleChips = ({ label, options, selected, onSelect, error }: ToggleChipsProps) => {
  return (
    <div className="space-y-3">
      <h3 className="font-display text-2xl tracking-wide text-foreground uppercase">
        {label}
        {error && <span className="text-destructive text-sm font-body normal-case ml-2">← pick one</span>}
      </h3>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <Button
            key={option}
            variant="chip"
            size="sm"
            data-selected={selected === option}
            onClick={() => onSelect(option)}
            className="rounded-full px-4"
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ToggleChips;

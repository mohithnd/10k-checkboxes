import { Checkbox } from "../Checkbox";
import type { CheckboxGridProps } from "./CheckboxGrid.types";

export const CheckboxGrid = ({ checkboxes, onToggle }: CheckboxGridProps) => {
  return (
    <div className="grid">
      {checkboxes.map((checkbox) => (
        <Checkbox
          key={checkbox.id}
          checked={checkbox.checked}
          onToggle={() => onToggle(checkbox.id)}
        />
      ))}
    </div>
  );
};

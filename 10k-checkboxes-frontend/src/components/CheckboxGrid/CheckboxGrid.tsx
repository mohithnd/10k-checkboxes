import { memo } from "react";
import { Checkbox } from "../Checkbox";
import type { CheckboxGridProps } from "./CheckboxGrid.types";

export const CheckboxGrid = memo(
  ({ checkboxes, onToggle }: CheckboxGridProps) => {
    return (
      <div className="grid">
        {checkboxes.map((checkbox) => (
          <Checkbox
            key={checkbox.id}
            id={checkbox.id}
            checked={checkbox.checked}
            onToggle={onToggle}
          />
        ))}
      </div>
    );
  },
);

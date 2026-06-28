import { memo, useCallback, type ChangeEvent } from "react";
import type { CheckboxProps } from "./checkbox.types";

export const Checkbox = memo(({ id, checked, onToggle }: CheckboxProps) => {
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onToggle(id, event.target.checked);
    },
    [id, onToggle],
  );

  return <input type="checkbox" checked={checked} onChange={handleChange} />;
});

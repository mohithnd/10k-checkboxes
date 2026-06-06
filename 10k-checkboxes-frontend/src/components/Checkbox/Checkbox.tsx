import type { CheckboxProps } from "./checkbox.types";

export const Checkbox = ({ checked, onToggle }: CheckboxProps) => {
  return <input type="checkbox" checked={checked} onChange={onToggle} />;
};

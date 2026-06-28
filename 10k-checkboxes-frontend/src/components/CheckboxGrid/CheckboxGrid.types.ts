import type { CheckboxItem } from "../../types/checkbox.types";

export interface CheckboxGridProps {
  checkboxes: CheckboxItem[];
  onToggle: (id: number, checked: boolean) => void;
}

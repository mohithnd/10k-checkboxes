import type { CheckboxItem } from "../types/checkbox.types";

export const generateCheckboxes = (count: number): CheckboxItem[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    checked: false,
  }));
};

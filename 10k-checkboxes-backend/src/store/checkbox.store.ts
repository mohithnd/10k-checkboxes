import { Checkbox } from "../types.ts/checkbox.types.js";

const TOTAL_CHECKBOXES = 10000;

export const checkboxes: Checkbox[] = Array.from(
  { length: TOTAL_CHECKBOXES },
  (_, index) => ({
    id: index + 1,
    checked: false,
  }),
);

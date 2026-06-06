import { Checkbox } from "../types.ts/checkbox.types.js";
import { COUNT } from "../utils/constants.js";

export const checkboxes: Checkbox[] = Array.from(
  { length: COUNT },
  (_, index) => ({
    id: index + 1,
    checked: false,
  }),
);

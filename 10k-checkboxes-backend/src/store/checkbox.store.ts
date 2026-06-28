import { Checkbox, CheckboxUpdatePayload } from "../types.ts/checkbox.types.js";
import { COUNT } from "../utils/constants.js";

export const checkboxes: Checkbox[] = Array.from(
  { length: COUNT },
  (_, index) => ({
    id: index + 1,
    checked: false,
  }),
);

export const getCheckboxes = () => {
  return checkboxes;
};

export const updateCheckboxInMemory = (
  payload: CheckboxUpdatePayload,
): boolean => {
  const index = payload.id - 1;

  if (!checkboxes[index]) {
    return false;
  }

  checkboxes[index] = { ...checkboxes[index], checked: payload.checked };

  return true;
};

export const replaceCheckboxesInMemory = (nextCheckboxes: Checkbox[]) => {
  checkboxes.splice(0, checkboxes.length, ...nextCheckboxes);
};

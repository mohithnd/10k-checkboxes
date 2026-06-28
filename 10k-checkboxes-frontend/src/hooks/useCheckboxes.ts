import { useCallback, useEffect, useState } from "react";
import { generateCheckboxes } from "../utils/generateCheckboxes";
import { socket } from "../services/socket.service";
import type { CheckboxUpdatePayload } from "../services/socket.types";
import { ENV } from "../config/env";
import {
  CHECKBOX_STATE_RESTORE_PATH,
  CHECKBOX_UPDATE_RECEIVED,
  CHECKBOX_UPDATE_SENT,
} from "../utils/constants";
import type { CheckboxItem } from "../types/checkbox.types";

const applyCheckboxUpdate = (
  prev: CheckboxItem[],
  payload: CheckboxUpdatePayload,
) => {
  const index = payload.id - 1;

  const currentCheckbox = prev[index];

  if (!currentCheckbox) {
    return prev;
  }

  if (currentCheckbox.checked === payload.checked) {
    return prev;
  }

  const updated = [...prev];

  updated[index] = {
    ...currentCheckbox,
    checked: payload.checked,
  };

  return updated;
};

export const useCheckboxes = (count: number) => {
  const [checkboxes, setCheckboxes] = useState(() => generateCheckboxes(count));

  useEffect(() => {
    fetch(`${ENV.API_URL}/${CHECKBOX_STATE_RESTORE_PATH}`)
      .then((res) => res.json())
      .then((data) => {
        setCheckboxes(data);
      });

    const handleUpdate = (payload: CheckboxUpdatePayload) => {
      setCheckboxes((prev) => applyCheckboxUpdate(prev, payload));
    };

    socket.on(CHECKBOX_UPDATE_RECEIVED, handleUpdate);

    return () => {
      socket.off(CHECKBOX_UPDATE_RECEIVED, handleUpdate);
    };
  }, []);

  const toggleCheckbox = useCallback((id: number, checked: boolean) => {
    const payload: CheckboxUpdatePayload = {
      id,
      checked,
    };

    setCheckboxes((prev) => applyCheckboxUpdate(prev, payload));

    socket.emit(CHECKBOX_UPDATE_SENT, payload);
  }, []);

  return {
    checkboxes,
    toggleCheckbox,
  };
};

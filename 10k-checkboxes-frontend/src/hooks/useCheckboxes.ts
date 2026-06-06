import { useEffect, useState } from "react";
import { generateCheckboxes } from "../utils/generateCheckboxes";
import { socket } from "../services/socket.service";
import type { CheckboxUpdatePayload } from "../services/socket.types";
import { ENV } from "../config/env";
import {
  CHECKBOX_STATE_RESTORE_PATH,
  CHECKBOX_UPDATE_RECEIVED,
  CHECKBOX_UPDATE_SENT,
} from "../utils/constants";

export const useCheckboxes = (count: number) => {
  const [checkboxes, setCheckboxes] = useState(() => generateCheckboxes(count));

  useEffect(() => {
    fetch(`${ENV.API_URL}/${CHECKBOX_STATE_RESTORE_PATH}`)
      .then((res) => res.json())
      .then((data) => {
        setCheckboxes(data);
      });

    const handleUpdate = ({ id, checked }: CheckboxUpdatePayload) => {
      setCheckboxes((prev) => {
        const updated = [...prev];
        updated[id - 1] = {
          ...updated[id - 1],
          checked,
        };
        return updated;
      });
    };

    socket.on(CHECKBOX_UPDATE_RECEIVED, handleUpdate);

    return () => {
      socket.off(CHECKBOX_UPDATE_RECEIVED, handleUpdate);
    };
  }, []);

  const toggleCheckbox = (id: number) => {
    const checkbox = checkboxes[id - 1];

    if (!checkbox) {
      return;
    }

    // Optimistic Update
    setCheckboxes((prev) => {
      const updated = [...prev];
      updated[id - 1] = {
        ...updated[id - 1],
        checked: !updated[id - 1].checked,
      };
      return updated;
    });

    socket.emit(CHECKBOX_UPDATE_SENT, {
      id,
      checked: !checkbox.checked,
    });
  };

  return {
    checkboxes,
    toggleCheckbox,
  };
};

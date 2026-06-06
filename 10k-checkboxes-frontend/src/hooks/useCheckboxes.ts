import { useEffect, useState } from "react";
import { generateCheckboxes } from "../utils/generateCheckboxes";
import { socket } from "../services/socket.service";
import type { CheckboxUpdatePayload } from "../services/socket.types";

export const useCheckboxes = (count: number) => {
  const [checkboxes, setCheckboxes] = useState(() => generateCheckboxes(count));

  useEffect(() => {
    fetch("http://localhost:3000/checkboxes")
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

    socket.on("server:browser::checkbox:update", handleUpdate);

    return () => {
      socket.off("server:browser::checkbox:update", handleUpdate);
    };
  }, []);

  const toggleCheckbox = (id: number) => {
    const checkbox = checkboxes[id - 1];

    if (!checkbox) {
      return;
    }

    socket.emit("browser:server::checkbox:update", {
      id,
      checked: !checkbox.checked,
    });
  };

  return {
    checkboxes,
    toggleCheckbox,
  };
};

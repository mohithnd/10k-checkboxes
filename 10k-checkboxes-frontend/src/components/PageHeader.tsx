import { memo } from "react";

interface PageHeaderProps {
  total: number;
}

export const PageHeader = memo(({ total }: PageHeaderProps) => {
  return (
    <>
      <h1>Realtime Checkbox Playground</h1>
      <p>Total Checkboxes: {total}</p>
    </>
  );
});

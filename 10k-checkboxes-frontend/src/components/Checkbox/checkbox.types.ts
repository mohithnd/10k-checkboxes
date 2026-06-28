export interface CheckboxProps {
  id: number;
  checked: boolean;
  onToggle: (id: number, checked: boolean) => void;
}

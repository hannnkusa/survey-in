export interface RadioButtonGroupProps {
  name: string;
  defaultValue: string;
  onChange?: (value: any) => void;
  options: string[];
  value: string;
}

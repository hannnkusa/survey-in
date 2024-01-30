export interface RadioButtonGroupProps {
  name: string;
  defaultValue: (string | number)[];
  onChange: (value: any) => void;
  options: string[];
}

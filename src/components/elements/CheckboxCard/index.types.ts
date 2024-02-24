export interface CheckboxButtonGroupProps {
  name: string;
  value?: (string | number)[];
  defaultValue?: (string | number)[];
  onChange: (value: any) => void;
  onSelectedValue?: (value: any) => void;
  options: string[];
}

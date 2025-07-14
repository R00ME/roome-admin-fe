interface Field {
  id: string;
  label: string;
  type: string; 
  placeholder: string;
  icon?: string;
  error?: string;
  value?: string;
  onChange?: (e:React.ChangeEvent<HTMLInputElement>) => void;
}

interface FormProps {
  title: string;
  values: Record<string, string>;
  fields: Field[];
  errors?: Record<string, string>;
  onSubmit?: () => void;
  onChangeField?: (field:string, value: string) => void
  onClick?: () => void;
}
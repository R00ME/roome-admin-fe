interface Field {
  id: string;
  label: string;
  type: string; 
  placeholder: string;
  icon?: string;
}

interface FormProps {
  title: string;
  fields: Field[];
}
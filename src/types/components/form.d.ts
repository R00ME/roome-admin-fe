// RadioCard
interface RadioCardOption {
  value: string;
  label: string;
}

interface RadioCardGroupProps {
  options: RadioCardOption[];
  value: string;
  onChange: (value: string) => void;
}

// CheckList
interface CheckListItem {
  text: string;
  description?: string;
}

interface CheckListProps {
  items: CheckListItem[];
}

// DateTimeInput
interface DateTimeInputProps {
  label: string;
  date: string;
  time: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
  minDate?: string;
  className?: string;
}

// Label
interface LabelProps {
  children: React.ReactNode;
  className?: string;
}

// TextareaWithCount
interface TextareaWithCountProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  showCount?: boolean;
  maxLength?: number;
  value: string;
  className?: string;
}
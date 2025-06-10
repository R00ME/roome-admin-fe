interface EventItem {
  id: string;
  title: string;
  target: string;
  uploadTime: string;
  status: string;
  message: string;
  browser: string;
  createdAt: string;
  author: string;
}

type EventModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

import { LucideIcon } from "lucide-react";

interface ActionCardProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
}

const ActionCard = ({ icon: Icon, label, onClick }: ActionCardProps) => {
  return (
    <button
      onClick={onClick}
      className="action-card"
    >
      <Icon className="w-6 h-6 text-ecocash-blue" />
      <span className="text-sm font-medium text-foreground">{label}</span>
    </button>
  );
};

export default ActionCard;

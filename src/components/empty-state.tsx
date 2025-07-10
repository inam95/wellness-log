import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon: LucideIcon;
  action?: ReactNode;
}

export const EmptyState = ({ title, description, icon: Icon, action }: EmptyStateProps) => {
  return (
    <div className="py-12 text-center">
      <div className="bg-secondary mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl">
        <Icon className="text-muted-foreground h-8 w-8" />
      </div>
      <h3 className="text-foreground mb-2 text-lg font-semibold">{title}</h3>
      <p className="text-muted-foreground mx-auto mb-6 max-w-md">{description}</p>
      {action && action}
    </div>
  );
};

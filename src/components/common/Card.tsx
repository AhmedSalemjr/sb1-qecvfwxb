import { ReactNode } from 'react';

interface CardProps {
  title?: string;
  children: ReactNode;
  actions?: ReactNode;
  className?: string;
  padding?: string;
}

export default function Card({ title, children, actions, className = '', padding = 'p-6' }: CardProps) {
  return (
    <div className={`bg-white shadow rounded-lg overflow-hidden ${className}`}>
      {(title || actions) && (
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          {title && <h3 className="text-lg font-medium text-gray-900">{title}</h3>}
          {actions && <div>{actions}</div>}
        </div>
      )}
      <div className={padding}>{children}</div>
    </div>
  );
}
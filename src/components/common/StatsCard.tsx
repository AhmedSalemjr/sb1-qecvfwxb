import { ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  change?: {
    value: number;
    isPositive: boolean;
  };
  footer?: string;
  colorClass?: string;
}

export default function StatsCard({
  title,
  value,
  icon,
  change,
  footer,
  colorClass = 'bg-blue-500'
}: StatsCardProps) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className={`${colorClass} rounded-md p-3 text-white`}>{icon}</div>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd>
                <div className="text-lg font-medium text-gray-900">{value}</div>
              </dd>
              {change && (
                <dd className="flex items-center text-sm text-gray-500">
                  <span
                    className={`${
                      change.isPositive ? 'text-green-600' : 'text-red-600'
                    } font-medium`}
                  >
                    {change.isPositive ? '+' : ''}
                    {change.value}%
                  </span>
                  <span className="ml-1">vs last period</span>
                </dd>
              )}
            </dl>
          </div>
        </div>
      </div>
      {footer && (
        <div className="bg-gray-50 px-5 py-3">
          <div className="text-sm text-gray-500">{footer}</div>
        </div>
      )}
    </div>
  );
}
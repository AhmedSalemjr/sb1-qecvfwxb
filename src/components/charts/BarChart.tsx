import { Bar } from 'lucide-react';

interface BarChartProps {
  data: Array<{
    label: string;
    value: number;
  }>;
  height?: number;
  valueFormatter?: (value: number) => string;
  colorClass?: string;
}

export default function BarChart({
  data,
  height = 300,
  valueFormatter = (value) => value.toString(),
  colorClass = 'bg-blue-500'
}: BarChartProps) {
  // Find the maximum value to calculate percentages
  const maxValue = Math.max(...data.map(item => item.value));
  
  return (
    <div style={{ height: `${height}px` }} className="w-full">
      <div className="flex h-full space-x-2">
        {data.map((item, index) => {
          const percentage = (item.value / maxValue) * 100;
          
          return (
            <div key={index} className="flex flex-col items-center justify-end flex-1">
              <div className="w-full flex flex-col items-center">
                <div className="text-xs font-medium text-gray-700 mb-1">
                  {valueFormatter(item.value)}
                </div>
                <div 
                  className={`w-full ${colorClass} rounded-t hover:opacity-80 transition-all duration-200`}
                  style={{ height: `${percentage}%` }}
                />
              </div>
              <div className="text-xs text-gray-500 mt-2 truncate max-w-full">{item.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
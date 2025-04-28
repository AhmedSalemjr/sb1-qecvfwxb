import { useState } from 'react';

interface PieChartProps {
  data: Array<{
    label: string;
    value: number;
    color: string;
  }>;
  size?: number;
  valueFormatter?: (value: number) => string;
}

export default function PieChart({
  data,
  size = 250,
  valueFormatter = (value) => value.toString()
}: PieChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  // Calculate total for percentages
  const total = data.reduce((acc, item) => acc + item.value, 0);
  
  // Calculate the radius and center coordinates
  const radius = size / 2;
  const center = radius;
  
  // Calculate the slices of the pie
  let cumulativeAngle = 0;
  const slices = data.map((item, index) => {
    const percentage = (item.value / total) * 100;
    const angle = (percentage / 100) * 360;
    
    // Calculate SVG arc path
    const startAngle = cumulativeAngle;
    const endAngle = cumulativeAngle + angle;
    cumulativeAngle = endAngle;
    
    // Convert angles to radians
    const startRad = (startAngle - 90) * (Math.PI / 180);
    const endRad = (endAngle - 90) * (Math.PI / 180);
    
    // Calculate points on the circle for the arc
    const x1 = center + radius * Math.cos(startRad);
    const y1 = center + radius * Math.sin(startRad);
    const x2 = center + radius * Math.cos(endRad);
    const y2 = center + radius * Math.sin(endRad);
    
    // Determine if arc should be drawn as a large arc (more than 180 degrees)
    const largeArcFlag = angle > 180 ? 1 : 0;
    
    // Create the SVG path
    const path = `
      M ${center} ${center}
      L ${x1} ${y1}
      A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}
      Z
    `;
    
    return {
      ...item,
      percentage,
      path,
      startAngle,
      endAngle
    };
  });
  
  // Calculate the position for the label
  const getLabelPosition = (startAngle: number, endAngle: number, radius: number) => {
    const midAngle = (startAngle + endAngle) / 2;
    const midAngleRad = (midAngle - 90) * (Math.PI / 180);
    const x = center + (radius * 0.7) * Math.cos(midAngleRad);
    const y = center + (radius * 0.7) * Math.sin(midAngleRad);
    
    return { x, y };
  };
  
  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {slices.map((slice, index) => {
          const isActive = activeIndex === index;
          const labelPos = getLabelPosition(slice.startAngle, slice.endAngle, radius);
          
          return (
            <g key={index} onMouseEnter={() => setActiveIndex(index)} onMouseLeave={() => setActiveIndex(null)}>
              <path
                d={slice.path}
                fill={slice.color}
                stroke="#fff"
                strokeWidth={2}
                className={`transition-opacity duration-200 ${isActive ? 'opacity-85' : 'opacity-75'}`}
                transform={isActive ? `scale(1.05) translate(-${center * 0.05}, -${center * 0.05})` : ''}
              />
              {slice.percentage >= 5 && (
                <text
                  x={labelPos.x}
                  y={labelPos.y}
                  textAnchor="middle"
                  fill="#fff"
                  fontSize="12"
                  fontWeight="bold"
                  pointerEvents="none"
                >
                  {slice.percentage >= 10 ? Math.round(slice.percentage) + '%' : ''}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      
      <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2">
        {slices.map((slice, index) => (
          <div
            key={index}
            className={`flex items-center transition-opacity duration-200 ${activeIndex === index ? 'opacity-100' : 'opacity-85'}`}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <div
              className="w-3 h-3 rounded-sm mr-2"
              style={{ backgroundColor: slice.color }}
            />
            <span className="text-sm text-gray-600 mr-2 max-w-[100px] truncate">{slice.label}</span>
            <span className="text-sm font-medium">
              {Math.round(slice.percentage)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
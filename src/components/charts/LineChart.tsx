import { useState } from 'react';

interface LineChartProps {
  data: Array<{
    label: string;
    value: number;
  }>;
  height?: number;
  valueFormatter?: (value: number) => string;
  color?: string;
  showArea?: boolean;
}

export default function LineChart({
  data,
  height = 300,
  valueFormatter = (value) => value.toString(),
  color = '#3B82F6',
  showArea = true
}: LineChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Chart dimensions and padding
  const padding = { top: 20, right: 20, bottom: 30, left: 40 };
  const width = 100; // percentage width, will be stretched to container
  
  // Find min and max values to scale the chart
  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const valueRange = maxValue - minValue;
  
  // Add some padding to the top and bottom of the chart
  const adjustedMinValue = Math.max(0, minValue - (valueRange * 0.1));
  const adjustedMaxValue = maxValue + (valueRange * 0.1);
  
  // Calculate chart area dimensions
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  
  // Generate points
  const points = data.map((item, index) => {
    const x = padding.left + (index / (data.length - 1)) * chartWidth;
    const y = height - padding.bottom - (((item.value - adjustedMinValue) / (adjustedMaxValue - adjustedMinValue)) * chartHeight);
    return { x, y, ...item };
  });
  
  // Create SVG path for the line
  const linePath = `M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`;
  
  // Create SVG path for the area under the line (if needed)
  const areaPath = `
    M ${points[0].x},${height - padding.bottom}
    L ${points.map(p => `${p.x},${p.y}`).join(' L ')}
    L ${points[points.length - 1].x},${height - padding.bottom}
    Z
  `;
  
  return (
    <div style={{ height: `${height}px` }} className="w-full relative">
      <svg
        width="100%"
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className="overflow-visible"
      >
        {/* Y-axis grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((tick, i) => {
          const y = padding.top + chartHeight - (tick * chartHeight);
          return (
            <g key={i}>
              <line
                x1={padding.left}
                y1={y}
                x2={width - padding.right}
                y2={y}
                stroke="#E5E7EB"
                strokeWidth="1"
              />
              <text
                x={padding.left - 5}
                y={y}
                textAnchor="end"
                dominantBaseline="middle"
                fontSize="10"
                fill="#6B7280"
              >
                {valueFormatter(adjustedMinValue + tick * (adjustedMaxValue - adjustedMinValue))}
              </text>
            </g>
          );
        })}
        
        {/* Area under the line */}
        {showArea && (
          <path
            d={areaPath}
            fill={color}
            fillOpacity="0.1"
          />
        )}
        
        {/* Line */}
        <path
          d={linePath}
          fill="none"
          stroke={color}
          strokeWidth="2"
        />
        
        {/* Data points */}
        {points.map((point, index) => (
          <g
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="cursor-pointer"
          >
            <circle
              cx={point.x}
              cy={point.y}
              r={hoveredIndex === index ? 5 : 3}
              fill={hoveredIndex === index ? color : "#fff"}
              stroke={color}
              strokeWidth="2"
              className="transition-all duration-200"
            />
            
            {hoveredIndex === index && (
              <g>
                <rect
                  x={point.x - 50}
                  y={point.y - 35}
                  width="100"
                  height="25"
                  rx="3"
                  ry="3"
                  fill="rgba(0, 0, 0, 0.8)"
                />
                <text
                  x={point.x}
                  y={point.y - 20}
                  textAnchor="middle"
                  fill="#fff"
                  fontSize="12"
                >
                  {`${point.label}: ${valueFormatter(point.value)}`}
                </text>
              </g>
            )}
          </g>
        ))}
        
        {/* X-axis labels */}
        {points.map((point, index) => {
          // Only show a subset of labels on the x-axis to avoid overcrowding
          if (data.length <= 12 || index % Math.ceil(data.length / 12) === 0) {
            return (
              <text
                key={index}
                x={point.x}
                y={height - 10}
                textAnchor="middle"
                fontSize="10"
                fill="#6B7280"
              >
                {point.label}
              </text>
            );
          }
          return null;
        })}
      </svg>
    </div>
  );
}
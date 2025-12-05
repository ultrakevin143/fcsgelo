import { ScheduleResult } from '@/lib/fcfs-scheduler';

interface GanttChartProps {
  ganttChart: ScheduleResult['ganttChart'];
}

// Simple color map for processes (for visual distinction)
const processColors: { [key: string]: string } = {
  P1: '#ff6b6b', // Red
  P2: '#4ecdc4', // Cyan
  P3: '#f9f871', // Yellow
  P4: '#007bff', // Blue
  P5: '#8e44ad', // Purple
  // Add more colors if needed
};

export default function GanttChart({ ganttChart }: GanttChartProps) {
  if (ganttChart.length === 0) return null;

  // Find the total time span
  const maxTime = ganttChart.reduce((max, item) => Math.max(max, item.end), 0);
  
  // Find any idle time at the beginning
  const firstStartTime = ganttChart[0].start;
  const idleStart = firstStartTime > 0 ? [{ processId: 'IDLE', start: 0, end: firstStartTime }] : [];

  const fullChart = [...idleStart, ...ganttChart];

  return (
    <div className="p-4 rounded-xl bg-white/10 shadow-lg border border-white/30">
      <h3 className="text-xl font-semibold text-white mb-4">Gantt Chart Display</h3>
      
      <div className="relative w-full h-12 sm:h-16 bg-gray-800 rounded-lg overflow-hidden">
        {fullChart.map((item, index) => {
          const duration = item.end - item.start;
          const leftPercent = (item.start / maxTime) * 100;
          const widthPercent = (duration / maxTime) * 100;
          const color = item.processId === 'IDLE' ? '#34495e' : processColors[item.processId] || '#3498db';

          return (
            <div
              key={index}
              style={{
                left: `${leftPercent}%`,
                width: `${widthPercent}%`,
                backgroundColor: color,
                // Apply a subtle inner gradient for the 'gradient UI' feel
                backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.1))`,
              }}
              // Responsive font size and padding
              className="absolute h-full flex items-center justify-center text-xs sm:text-sm font-bold text-white transition-all duration-300 ease-in-out border-r border-gray-900 px-1"
              title={`${item.processId}: ${item.start} to ${item.end} (Burst: ${duration})`}
            >
              {item.processId}
            </div>
          );
        })}
      </div>
      
      {/* Time Axis */}
      <div className="relative w-full h-4 mt-2">
          {/* Display time markers */}
          {fullChart.map((item, index) => (
              // Display start time for each block, and the final end time
              <span 
                  key={`time-start-${index}`}
                  style={{ left: `${(item.start / maxTime) * 100}%` }}
                  className="absolute -top-3 text-white text-xs transform -translate-x-1/2 border-l border-white/50 h-2"
              >
                  {item.start}
              </span>
          ))}
           {/* Final Time */}
          <span 
              style={{ left: `100%` }}
              className="absolute -top-3 text-white text-xs transform -translate-x-1/2 border-l border-white/50 h-2"
          >
              {maxTime}
          </span>
      </div>
    </div>
  );
}
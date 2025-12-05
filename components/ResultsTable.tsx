import { ScheduleResult, ScheduledProcess } from '@/lib/fcfs-scheduler';

interface ResultsTableProps {
  result: ScheduleResult;
}

const TableCell = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <td className={`p-2 sm:p-3 text-center border-t border-white/30 text-xs sm:text-base ${className}`}>
        {children}
    </td>
);

export default function ResultsTable({ result }: ResultsTableProps) {
  return (
    <div className="space-y-6">
      <div className="text-white bg-white/10 p-4 rounded-xl shadow-inner border border-white/30">
        <h3 className="text-xl font-bold mb-3">Summary Metrics</h3>
        <div className="flex flex-col sm:flex-row justify-around text-center space-y-3 sm:space-y-0">
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold text-teal-400">
              {result.averageTurnaroundTime.toFixed(2)}
            </p>
            <p className="text-sm opacity-80">Avg. Turnaround Time</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold text-yellow-400">
              {result.averageWaitingTime.toFixed(2)}
            </p>
            <p className="text-sm opacity-80">Avg. Waiting Time</p>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto rounded-xl shadow-lg border border-white/30">
        <table className="min-w-full text-white">
          <thead style={{ background: 'linear-gradient(to bottom, #3a6073, #1f4068)' }}>
            <tr>
              <th className="p-2 sm:p-3 text-left text-xs sm:text-base">Process ID</th>
              <th className="p-2 sm:p-3 text-xs sm:text-base">AT</th>
              <th className="p-2 sm:p-3 text-xs sm:text-base">BT</th>
              <th className="p-2 sm:p-3 text-xs sm:text-base">Start Time</th>
              <th className="p-2 sm:p-3 text-xs sm:text-base">CT</th>
              <th className="p-2 sm:p-3 text-xs sm:text-base">TAT</th>
              <th className="p-2 sm:p-3 text-xs sm:text-base">WT</th>
            </tr>
          </thead>
          <tbody>
            {result.scheduledProcesses.map((p: ScheduledProcess, index) => (
              <tr 
                key={p.id} 
                className={index % 2 === 0 ? 'bg-white/5' : 'bg-white/10'}
              >
                <TableCell className="text-left font-bold">{p.id}</TableCell>
                <TableCell>{p.arrivalTime}</TableCell>
                <TableCell>{p.burstTime}</TableCell>
                <TableCell className="text-blue-300">{p.startTime}</TableCell>
                <TableCell className="text-green-300">{p.completionTime}</TableCell>
                <TableCell className="font-semibold">{p.turnaroundTime}</TableCell>
                <TableCell className="font-semibold">{p.waitingTime}</TableCell>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
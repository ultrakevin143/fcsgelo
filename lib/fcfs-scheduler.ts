// lib/fcfs-scheduler.ts

export interface Process {
  id: string;
  arrivalTime: number;
  burstTime: number;
}

export interface ScheduledProcess extends Process {
  completionTime: number;
  turnaroundTime: number;
  waitingTime: number;
  startTime: number; // For Gantt Chart
}

export interface ScheduleResult {
  scheduledProcesses: ScheduledProcess[];
  averageTurnaroundTime: number;
  averageWaitingTime: number;
  ganttChart: {
    processId: string;
    start: number;
    end: number;
  }[];
}

export function runFCFSScheduling(processes: Process[]): ScheduleResult {
  // 1. Sort processes by Arrival Time (FCFS Rule)
  const sortedProcesses = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);

  const scheduledProcesses: ScheduledProcess[] = [];
  const ganttChart: ScheduleResult['ganttChart'] = [];
  let currentTime = 0;
  let totalTAT = 0;
  let totalWT = 0;

  for (const process of sortedProcesses) {
    // 2. Determine Start Time
    // The CPU must wait until the process arrives (process.arrivalTime)
    // AND until the previous process completes (currentTime).
    const startTime = Math.max(currentTime, process.arrivalTime);

    // 3. Determine Completion Time
    const completionTime = startTime + process.burstTime;

    // 4. Calculate Metrics
    const turnaroundTime = completionTime - process.arrivalTime;
    const waitingTime = turnaroundTime - process.burstTime;

    // 5. Update the current time for the next process
    currentTime = completionTime;

    // 6. Record Results
    const scheduledProcess: ScheduledProcess = {
      ...process,
      startTime,
      completionTime,
      turnaroundTime,
      waitingTime,
    };
    scheduledProcesses.push(scheduledProcess);

    // Add time slice to Gantt chart
    ganttChart.push({
      processId: process.id,
      start: startTime,
      end: completionTime,
    });

    totalTAT += turnaroundTime;
    totalWT += waitingTime;
  }
  const numProcesses = scheduledProcesses.length;
  const averageTurnaroundTime = numProcesses > 0 ? totalTAT / numProcesses : 0;
  const averageWaitingTime = numProcesses > 0 ? totalWT / numProcesses : 0;

  return {
    scheduledProcesses,
    averageTurnaroundTime,
    averageWaitingTime,
    ganttChart,
  };
}
// app/page.tsx
'use client';

import { useState } from 'react';
import { runFCFSScheduling, Process, ScheduleResult } from '@/lib/fcfs-scheduler';
import ProcessInput from '@/components/ProcessInput';
import ResultsTable from '@/components/ResultsTable';
import GanttChart from '@/components/GanttChart';
import { FaPlay, FaSyncAlt } from 'react-icons/fa';

const initialProcesses: Process[] = [
  { id: 'P1', arrivalTime: 0, burstTime: 5 },
  { id: 'P2', arrivalTime: 3, burstTime: 9 },
  { id: 'P3', arrivalTime: 5, burstTime: 6 },
];

export default function FCFSScheduler() {
  const [processes, setProcesses] = useState<Process[]>(initialProcesses);
  const [result, setResult] = useState<ScheduleResult | null>(null);

  const handleRunScheduler = () => {
    const schedulingResult = runFCFSScheduling(processes);
    setResult(schedulingResult);
  };

  const handleAddProcess = () => {
    setProcesses([
      ...processes,
      {
        id: `P${processes.length + 1}`,
        arrivalTime: 0,
        burstTime: 1,
      },
    ]);
    setResult(null); // Clear result on input change
  };

  const handleUpdateProcess = (index: number, field: keyof Process, value: number | string) => {
    const newProcesses = [...processes];
    newProcesses[index] = { ...newProcesses[index], [field]: value };
    setProcesses(newProcesses as Process[]);
    setResult(null);
  };
  
  const handleRemoveProcess = (index: number) => {
      setProcesses(processes.filter((_, i) => i !== index));
      setResult(null);
  };

  return (
    <div className="min-h-screen p-8" style={{ background: 'linear-gradient(135deg, #1f4068 0%, #162447 100%)' }}>
      <header className="text-center mb-10 text-white">
        <h1 className="text-4xl font-extrabold tracking-tight">
          FCFS CPU Scheduler Simulator
        </h1>
        <p className="text-lg opacity-80 mt-2">First-Come, First-Served Algorithm</p>
      </header>

      <main className="max-w-7xl mx-auto bg-white/10 backdrop-blur-sm p-8 rounded-xl shadow-2xl">
        
        {/* Process Input Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
             Process Inputs
          </h2>
          <div className="space-y-4">
            {processes.map((p, index) => (
              <ProcessInput
                key={p.id + index}
                process={p}
                index={index}
                onUpdate={handleUpdateProcess}
                onRemove={handleRemoveProcess}
              />
            ))}
          </div>
          <div className="flex justify-between mt-6">
            <button
              onClick={handleAddProcess}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition duration-200 shadow-md"
            >
              + Add Process
            </button>
            <button
              onClick={handleRunScheduler}
              disabled={processes.length === 0}
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition duration-200 shadow-xl disabled:opacity-50 flex items-center"
            >
              <FaPlay className="mr-2" /> Run FCFS
            </button>
          </div>
        </section>

        {/* Results Display Section */}
        {result && (
          <section className="mt-12 space-y-10">
            <h2 className="text-3xl font-bold text-white mb-6 border-b border-white/30 pb-2">
              Scheduling Results
            </h2>

            {/* Gantt Chart Display */}
            <GanttChart ganttChart={result.ganttChart} />
            
            {/* Metrics and Table */}
            <ResultsTable result={result} />
          </section>
        )}

      </main>
    </div>
  );
}
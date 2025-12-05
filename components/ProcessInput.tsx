import { Process } from '@/lib/fcfs-scheduler';
import { FaTrashAlt } from 'react-icons/fa';

interface ProcessInputProps {
  process: Process;
  index: number;
  onUpdate: (index: number, field: keyof Process, value: number | string) => void;
  onRemove: (index: number) => void;
}

const InputField: React.FC<{ label: string; value: string | number; onChange: (value: number) => void }> = ({ label, value, onChange }) => (
    <div className="flex flex-col flex-1 min-w-[80px]"> {/* flex-1 ensures fluid width */}
        <label className="text-white text-xs sm:text-sm mb-1">{label}</label>
        <input
            type="number"
            min="0"
            value={value}
            onChange={(e) => onChange(parseInt(e.target.value) || 0)}
            className="p-2 border border-gray-700 bg-white/20 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-150"
        />
    </div>
);


export default function ProcessInput({ process, index, onUpdate, onRemove }: ProcessInputProps) {
  // Responsive Layout: space-x-2 for mobile, space-x-4 for wider screens.
  return (
    <div className="flex items-center space-x-2 sm:space-x-4 p-3 sm:p-4 rounded-lg bg-white/10 border border-white/20 transition hover:bg-white/15">
      
      {/* Process ID column */}
      <div className="w-8 sm:w-16 flex-shrink-0"> 
        <label className="text-base sm:text-lg font-bold text-white">{process.id}</label>
      </div>

      {/* Input Fields */}
      <InputField
        label="Arrival Time (AT)"
        value={process.arrivalTime}
        onChange={(value) => onUpdate(index, 'arrivalTime', value)}
      />

      <InputField
        label="Burst Time (BT)"
        value={process.burstTime}
        onChange={(value) => onUpdate(index, 'burstTime', value)}
      />
      
      {/* Remove button */}
      <button 
        onClick={() => onRemove(index)}
        className="p-2 text-red-400 hover:text-red-500 transition duration-150 flex-shrink-0"
        title="Remove Process"
      >
        <FaTrashAlt />
      </button>
    </div>
  );
}
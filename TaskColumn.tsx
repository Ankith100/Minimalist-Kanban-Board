import type { Column } from '../types/types';
import TaskCard from './TaskCard';

interface TaskColumnProps {
  column: Column;
}

const TaskColumn = ({ column }: TaskColumnProps) => {
  return (
    <div className="min-h-[200px]">
      <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${column.color}`}>
        {column.title}
      </div>
      <div className="space-y-4">
        {column.tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TaskColumn;

import type { Task } from '../types/types';

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <h3 className="font-medium mb-2">{task.title}</h3>
      {task.dueDate && (
        <div className="inline-block bg-pink-100 text-sm px-2 py-1 rounded-md mb-2">
          Due {task.dueDate}
        </div>
      )}
      {task.checklistItems && task.checklistItems.length > 0 && (
        <div className="space-y-2">
          {task.checklistItems.map((item) => (
            <div key={item.id} className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-full border ${item.completed ? 'bg-gray-200' : 'bg-gray-100'} flex items-center justify-center`}>
                {item.completed && (
                  <svg className="w-3 h-3 text-gray-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                )}
              </div>
              <span className={item.completed ? 'line-through text-gray-400' : ''}>
                {item.text}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskCard;

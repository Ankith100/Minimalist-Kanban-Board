import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Column as ColumnType, Task as TaskType } from '../types';
import { Task } from './Task';

interface ColumnProps {
  column: ColumnType;
  onTaskEdit: (task: TaskType) => void;
  onTaskDelete: (id: string) => void;
}

export function Column({ column, onTaskEdit, onTaskDelete }: ColumnProps) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <div className="bg-gray-100 p-4 rounded-lg w-80">
      <h2 className="text-lg font-semibold mb-4">{column.title}</h2>
      <div ref={setNodeRef} className="min-h-[200px]">
        <SortableContext
          items={column.tasks.map(task => task.id)}
          strategy={verticalListSortingStrategy}
        >
          {column.tasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              onEdit={onTaskEdit}
              onDelete={onTaskDelete}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}

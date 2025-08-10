import { useState } from 'react';
import type { Column, Task, ColumnType } from '../types/types';
import TaskColumn from './TaskColumn';
import Modal from './Modal';
import AddTaskForm from './AddTaskForm';

const initialColumns: Column[] = [
  {
    id: 'not-started',
    title: 'Not started',
    tasks: [],
    color: 'bg-gray-100'
  },
  {
    id: 'in-progress',
    title: 'In progress',
    tasks: [],
    color: 'bg-purple-100'
  },
  {
    id: 'blocked',
    title: 'Blocked',
    tasks: [],
    color: 'bg-pink-100'
  },
  {
    id: 'done',
    title: 'Done',
    tasks: [],
    color: 'bg-green-100'
  }
];

const Board = () => {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTask = (newTask: Omit<Task, 'id'>, columnId: ColumnType) => {
    const taskWithId: Task = {
      ...newTask,
      id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };

    setColumns(prevColumns =>
      prevColumns.map(column =>
        column.id === columnId
          ? { ...column, tasks: [...column.tasks, taskWithId] }
          : column
      )
    );
    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Personal</h1>
          <p className="text-gray-600">A board to keep track of personal tasks.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium"
        >
          + Add Task
        </button>
      </div>
      
      <div className="grid grid-cols-4 gap-4">
        {columns.map((column) => (
          <TaskColumn 
            key={column.id} 
            column={column}
          />
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddTaskForm
          onAddTask={handleAddTask}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default Board;
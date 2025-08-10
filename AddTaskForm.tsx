import { useState } from 'react';
import type { Task, ColumnType } from '../types/types';

interface AddTaskFormProps {
  onAddTask: (task: Omit<Task, 'id'>, columnId: ColumnType) => void;
  onCancel: () => void;
}

const AddTaskForm = ({ onAddTask, onCancel }: AddTaskFormProps) => {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [selectedColumn, setSelectedColumn] = useState<ColumnType>('not-started');
  const [checklistItems, setChecklistItems] = useState<string[]>(['']);

  const columnOptions = [
    { id: 'not-started' as ColumnType, label: 'Not started' },
    { id: 'in-progress' as ColumnType, label: 'In progress' },
    { id: 'blocked' as ColumnType, label: 'Blocked' },
    { id: 'done' as ColumnType, label: 'Done' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask: Omit<Task, 'id'> = {
      title: title.trim(),
      ...(dueDate && { dueDate }),
      ...(checklistItems.some(item => item.trim()) && {
        checklistItems: checklistItems
          .filter(item => item.trim())
          .map((item, index) => ({
            id: `${Date.now()}-${index}`,
            text: item.trim(),
            completed: false
          }))
      })
    };

    onAddTask(newTask, selectedColumn);
    setTitle('');
    setDueDate('');
    setSelectedColumn('not-started');
    setChecklistItems(['']);
  };

  const addChecklistItem = () => {
    setChecklistItems([...checklistItems, '']);
  };

  const updateChecklistItem = (index: number, value: string) => {
    const updated = [...checklistItems];
    updated[index] = value;
    setChecklistItems(updated);
  };

  const removeChecklistItem = (index: number) => {
    setChecklistItems(checklistItems.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          autoFocus
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Column
        </label>
        <select
          value={selectedColumn}
          onChange={(e) => setSelectedColumn(e.target.value as ColumnType)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {columnOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Due date (optional)..."
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Checklist Items (optional)
        </label>
          {checklistItems.map((item, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Checklist item..."
                value={item}
                onChange={(e) => updateChecklistItem(index, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {checklistItems.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeChecklistItem(index)}
                  className="text-red-500 hover:text-red-700 px-2"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        <button
          type="button"
          onClick={addChecklistItem}
          className="text-blue-500 hover:text-blue-700 text-sm"
        >
          + Add checklist item
        </button>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Task
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddTaskForm;

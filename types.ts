export interface Task {
  id: string;
  title: string;
  dueDate?: string;
  checklistItems?: {
    id: string;
    text: string;
    completed: boolean;
  }[];
}

export type ColumnType = 'not-started' | 'in-progress' | 'blocked' | 'done';

export interface Column {
  id: ColumnType;
  title: string;
  tasks: Task[];
  color: string;
}

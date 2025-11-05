import { format } from 'date-fns';

export const formatDueDate = (date: Date | null | undefined) => {
  if (!date) return 'No due date';
  return format(date, 'MMM dd, yyyy');
};

export const isOverdue = (dueDate: Date | null | undefined) => {
  if (!dueDate) return false;
  return dueDate < new Date();
};
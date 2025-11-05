// hooks/useTodos.ts (full corrected version - no 'any' casts, proper Id typing)
import { useQuery, useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
import { Todo } from '../types';

export const useTodos = () => {
  const rawTodos = useQuery(api.todo.list);
  console.log('Convex query result:', rawTodos);  // Add this line
  const todos = rawTodos ?? [];
  console.log('Processed todos:', todos);  // Debug: Should be []
  const createTodo = useMutation(api.todo.create);
  const updateTodo = useMutation(api.todo.update);
  const deleteTodo = useMutation(api.todo.deleteTodo);
  const reorderTodos = useMutation(api.todo.reorder);

  const addTodo = async (data: { title: string; description?: string; dueDate?: Date }) => {
    const payload = {
      title: data.title,
      description: data.description,
      dueDate: data.dueDate ? data.dueDate.getTime() : undefined,
      completed: false,
      order: todos.length,
    };
    await createTodo(payload);
  };

  const toggleTodo = async (id: string) => {  // Typed as Id<'todos'>
    const todo = todos.find(t => t._id === id);
    if (todo) {
      await updateTodo({ id: id as any, completed: !todo.completed });
    }
  };

  const editTodo = async (id: Todo['_id'], data: Partial<Omit<Todo, '_id' | 'createdAt' | 'updatedAt'>>) => {
    const payload: Parameters<typeof updateTodo>[0] = { id };
    if (data.title !== undefined) payload.title = data.title;
    if (data.description !== undefined) payload.description = data.description;
    if (data.dueDate !== undefined) payload.dueDate = data.dueDate ? data.dueDate.getTime() : null;
    if (data.completed !== undefined) payload.completed = data.completed;
    if (data.order !== undefined) payload.order = data.order;
    await updateTodo(payload);
  };

  const removeTodo = async (id: string) => {  // Typed as Id<'todos'>
    await deleteTodo({ id: id as any });
  };

  const dragEnd = async ({ data }: { data: Todo[] }) => {
    const updates = data.map((todo, index) => ({ id: todo._id, order: index }));  // id is Id<'todos'>
    await reorderTodos({ updates });
  };

  return {
    todos,
    addTodo,
    toggleTodo,
    editTodo,
    removeTodo,
    dragEnd,
    isLoading: rawTodos === undefined,
  };
};
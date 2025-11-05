import { query, mutation } from './_generated/server';
import { v } from 'convex/values';
import { Doc } from './_generated/dataModel';

export const list = query({
  args: {},
  handler: async (ctx) => {
    const todos = await ctx.db
      .query('todos')
      .order('asc')  // Uses 'by_order' index
      .collect();
    return todos.map((todo: Doc<'todos'>) => ({
      _id: todo._id,
      title: todo.title,
      description: todo.description,
      dueDate: todo.dueDate ? new Date(todo.dueDate) : null,
      completed: todo.completed,
      order: todo.order,
      createdAt: new Date(todo._creationTime),
      updatedAt: new Date(todo.updatedAt),
    }));
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    dueDate: v.optional(v.union(v.number(), v.null())),
    completed: v.boolean(),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const id = await ctx.db.insert('todos', { ...args, updatedAt: now });
    return id;
  },
});

export const update = mutation({
  args: {
    id: v.id('todos'),
    title: v.optional(v.string()),
    description: v.optional(v.optional(v.string())),
    dueDate: v.optional(v.optional(v.union(v.number(), v.null()))),
    completed: v.optional(v.boolean()),
    order: v.optional(v.number()),  // Added: Allow patching order in edit
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const updates: Partial<Doc<'todos'>> = { updatedAt: now };
    if (args.title !== undefined) updates.title = args.title;
    if (args.description !== undefined) updates.description = args.description;
    if (args.dueDate !== undefined) updates.dueDate = args.dueDate;
    if (args.completed !== undefined) updates.completed = args.completed;
    if (args.order !== undefined) updates.order = args.order;  // Added: Patch order if provided
    await ctx.db.patch(args.id, updates);
  },
});

export const deleteTodo = mutation({
  args: { id: v.id('todos') },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id);
    const remaining = await ctx.db
      .query('todos')
      .order('asc')
      .collect();
    const now = Date.now();
    for (let i = 0; i < remaining.length; i++) {
      await ctx.db.patch(remaining[i]._id, { order: i, updatedAt: now });
    }
  },
});

export const reorder = mutation({
  args: {
    updates: v.array(
      v.object({
        id: v.id('todos'),
        order: v.number(),
      })
    ),
  },
  handler: async (ctx, { updates }) => {
    const now = Date.now();
    for (const update of updates) {
      await ctx.db.patch(update.id, { order: update.order, updatedAt: now });
    }
  },
});
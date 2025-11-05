import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  todos: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    dueDate: v.optional(v.union(v.number(), v.null())),
    completed: v.boolean(),
    order: v.number(),
    updatedAt: v.number(),  // Add this for tracking updates
  })
    .index('by_order', ['order'])
   // .index('by_user', ['_creationTime']) // For real-time, but no user for simplicity
});
// export interface Todo {
//   _id: string;
//   title: string;
//   description?: string;
//   dueDate?: Date | null;
//   completed: boolean;
//   createdAt: Date;
//   updatedAt: Date;
//   order: number; // For drag-sort
// }

// export type Theme = 'light' | 'dark';

// export interface TaskFormData {
//   title: string;
//   description?: string;
//   dueDate?: Date | null;
// }
// types/index.ts (ensure this is updated with proper Id typing)
import { Id } from '../convex/_generated/dataModel';

export interface Todo {
  _id: Id<'todos'>;  // Must use Id<'todos'> for Convex mutations
  title: string;
  description?: string;
  dueDate?: Date | null;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  order: number;
}

export type Theme = 'light' | 'dark';

export interface TaskFormData {
  title: string;
  description?: string;
  dueDate?: Date | null;
}

// Extend styled-components theme (if not already)
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    mode: 'light' | 'dark';
    colors: {
      background: string;
      surface: string;
      text: string;
      textSecondary: string;
      primary: string;
      primaryLight: string;
      error: string;
      border: string;
    };
    spacing: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
    };
    typography: {
      title: string;
      body: string;
      caption: string;
    };
    borderRadius: number;
    shadow: {
      light: string;
      dark: string;
    };
  }
}
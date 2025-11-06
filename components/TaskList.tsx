<script src="http://localhost:8097"></script>
import React from 'react';
import { FlatList, View, Text, ActivityIndicator } from 'react-native';
import DraggableFlatList, { DraggableFlatListProps } from 'react-native-draggable-flatlist';
import { TaskItem } from './TaskItem';
import { Todo } from '../types/index';
import styled from 'styled-components/native';
import { theme as designTheme } from '../app/constants/theme';
const Container = styled.View`
  flex: 1;
`;

const EmptyState = styled.View<{ themeMode: 'light' | 'dark' }>`
  align-items: center;
  padding: ${designTheme.spacing.xl}px;
`;

const EmptyText = styled.Text<{ themeMode: 'light' | 'dark' }>`
  color: ${({ themeMode }: { themeMode: 'light' | 'dark' }) => designTheme.colors[themeMode].textSecondary};
  text-align: center;
  margin-top: ${designTheme.spacing.sm}px;
`;

const SectionHeader = styled.Text<{ themeMode: 'light' | 'dark' }>`
  font-size: 18px;
  font-weight: bold;
  color: ${({ themeMode }: { themeMode: 'light' | 'dark' }) => designTheme.colors[themeMode].text};
  margin: ${designTheme.spacing.lg}px 0 ${designTheme.spacing.sm}px ${designTheme.spacing.lg}px;
`;

interface TaskListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
  themeMode: 'light' | 'dark';
  onDragEnd: (params: { data: Todo[] }) => void;
  searchQuery: string;
}

export const TaskList: React.FC<TaskListProps> = ({
  todos,
  onToggle,
  onDelete,
  onEdit,
  themeMode,
  onDragEnd,
  searchQuery,
}) => {
  const activeTodos = todos.filter(t => !t.completed && t.title.toLowerCase().includes(searchQuery.toLowerCase()));
  const completedTodos = todos.filter(t => t.completed && t.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const renderItem = ({ item, drag, isActive }: { item: Todo; drag?: () => void; isActive?: boolean }) => (
    <TaskItem
      todo={item}
      onToggle={onToggle}
      onDelete={onDelete}
      onEdit={onEdit}
      themeMode={themeMode}
      {...(drag && { onLongPress: drag })}
    />
  );

  if (todos.length === 0) {
    return (
      <EmptyState themeMode={themeMode}>
        <ActivityIndicator size="large" color={designTheme.colors[themeMode].primary} />
        <EmptyText themeMode={themeMode}>No tasks yet. Add one to get started!</EmptyText>
      </EmptyState>
    );
  }

  return (
    <Container>
      {activeTodos.length > 0 && (
        <>
          <SectionHeader themeMode={themeMode}>Active Tasks</SectionHeader>
          <DraggableFlatList
            data={activeTodos}
            renderItem={renderItem}
            keyExtractor={item => item._id}
            onDragEnd={onDragEnd}
            contentContainerStyle={{ paddingHorizontal: designTheme.spacing.lg }}
          />
        </>
      )}
      {completedTodos.length > 0 && (
        <>
          <SectionHeader themeMode={themeMode}>Completed</SectionHeader>
          <FlatList
            data={completedTodos}
            renderItem={({ item }) => (
              <TaskItem todo={item} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} themeMode={themeMode} />
            )}
            keyExtractor={item => item._id}
            contentContainerStyle={{ paddingHorizontal: designTheme.spacing.lg }}
          />
        </>
      )}
      {activeTodos.length === 0 && completedTodos.length === 0 && searchQuery && (
  <EmptyState themeMode={themeMode}>
    <EmptyText themeMode={themeMode}>
     { `No tasks match "${searchQuery}"`}.
    </EmptyText>
  </EmptyState>
)}
    </Container>
  );
};
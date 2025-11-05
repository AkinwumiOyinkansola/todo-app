import React from 'react';
import { View, Text, Pressable, StyleSheet, Dimensions, Alert } from 'react-native';
//import { useDispatch } from 'react-redux'; // Wait, no Redux, use props
import { Checkbox } from '../components/ui/checkbox';
import { Todo } from '../types/index';
import { formatDueDate, isOverdue } from '../lib/utils';
import styled from 'styled-components/native';
import { theme as designTheme } from '@/constants/theme';
import Animated, { useAnimatedStyle, withSpring, FadeInDown } from 'react-native-reanimated';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler'; // For swipe delete

const { width: screenWidth } = Dimensions.get('window');

type ThemeMode = keyof typeof designTheme.colors;

const Container = styled(Animated.View)<{ themeMode: ThemeMode; completed: boolean }>`
  flex-direction: row;
  align-items: center;
  padding: ${designTheme.spacing.md}px;
  background-color: ${({ themeMode }: { themeMode: ThemeMode }) => designTheme.colors[themeMode].surface};
  border-radius: ${designTheme.borderRadius}px;
  margin-bottom: ${designTheme.spacing.sm}px;
  opacity: ${({ completed }: { completed: boolean }) => (completed ? 0.7 : 1)};
`;

const Content = styled.View`
  flex: 1;
  margin-left: ${designTheme.spacing.sm}px;
`;

const Title = styled.Text<{ themeMode: ThemeMode; completed: boolean }>`
  font-size: 16px;
  color: ${({ themeMode, completed }: { themeMode: ThemeMode; completed: boolean }) =>
    completed ? designTheme.colors[themeMode].textSecondary : designTheme.colors[themeMode].text};
  text-decoration-line: ${({ completed }: { completed: boolean }) => (completed ? 'line-through' : 'none')};
`;

const Description = styled.Text<{ themeMode: ThemeMode }>`
  font-size: 14px;
  color: ${({ themeMode }: { themeMode: ThemeMode }) => designTheme.colors[themeMode].textSecondary};
  margin-top: 4px;
`;

const DueDate = styled.Text<{ themeMode: ThemeMode; overdue: boolean }>`
  font-size: 12px;
  color: ${({ overdue, themeMode }: { overdue: boolean; themeMode: ThemeMode }) =>
    overdue ? designTheme.colors[themeMode].error : designTheme.colors[themeMode].textSecondary};
  margin-top: 4px;
`;

interface TaskItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
  themeMode: keyof typeof designTheme.colors;
}

export const TaskItem: React.FC<TaskItemProps> = ({ todo, onToggle, onDelete, onEdit, themeMode }) => {
  const scale = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(0.95) }], // For press animation
  }));

  const renderRightActions = () => (
    <Pressable
      style={styles.deleteButton}
      onPress={() => {
        Alert.alert('Delete Task', 'Are you sure?', [{ text: 'Cancel' }, { text: 'Delete', onPress: () => onDelete(todo._id) }]);
      }}
    >
      <Text style={styles.deleteText}>Delete</Text>
    </Pressable>
  );

  return (
      <Swipeable renderRightActions={renderRightActions}>
      <Pressable onPress={() => onEdit(todo)} style={{ flex: 1 }}>
        <Animated.View entering={FadeInDown} style={[styles.container, scale]}>
          <Checkbox checked={todo.completed} onPress={() => onToggle(todo._id)} themeMode={themeMode} />
          <Content>
            <Title themeMode={themeMode} completed={todo.completed}>
              {todo.title}
            </Title>
            {todo.description && <Description themeMode={themeMode}>{todo.description}</Description>}
            <DueDate themeMode={themeMode} overdue={isOverdue(todo.dueDate)}>
              {formatDueDate(todo.dueDate)}
            </DueDate>
          </Content>
        </Animated.View>
      </Pressable>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
  },
  deleteText: {
    color: 'white',
    fontWeight: '600',
    paddingHorizontal: 20,
  },
});
/*import React, { JSX, useState } from 'react';
import { ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../../hooks/useTheme';
import { useTodos } from '../../hooks/useTodos';
import { ThemeSwitcher } from '../../components/ThemeSwitcher';
import { SearchBar } from '../../components/SearchBar';
import { TaskList } from '../../components/TaskList';
import { AddEditTaskModal } from '../../components/AddEditTaskModal';
import styled from 'styled-components/native';
import { Plus } from 'lucide-react-native';
import { Todo, TaskFormData } from '../../types/index';
import { theme } from '@/constants/theme';
import { Text, View } from 'react-native';  

console.log('TodoScreen loaded!');  // Add at top of component
type ThemeMode = keyof typeof theme.colors;

const Screen = styled.SafeAreaView<{ themeMode: ThemeMode }>`
  flex: 1;
  background-color: ${({ themeMode }: { themeMode: ThemeMode }) => theme.colors[themeMode].background};
`;

const Header = styled.View<{ themeMode: ThemeMode }>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.lg}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ themeMode }: { themeMode: ThemeMode }) => theme.colors[themeMode].border};
`;

const Title = styled.Text<{ themeMode: ThemeMode }>`
  font-size: 24px;
  font-weight: bold;
  color: ${({ themeMode }: { themeMode: ThemeMode }) => theme.colors[themeMode].text};
`;

const AddButton = styled.TouchableOpacity`
  padding: ${theme.spacing.sm}px;
`;

const Content = styled.ScrollView`
  flex: 1;
`;

export default function TodoScreen(): JSX.Element {
  const { theme: themeMode, toggleTheme } = useTheme();
  const themeKey: ThemeMode = themeMode as ThemeMode;
  const { todos, addTodo, toggleTodo, editTodo, removeTodo, dragEnd } = useTodos();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const todoPredicate = (t: Todo): boolean =>
    !searchQuery || t.title.toLowerCase().includes(searchQuery.toLowerCase());

  const filteredTodos: Todo[] = todos.filter(todo => todoPredicate(todo));

  const handleAddTask = async (data: TaskFormData): Promise<void> => {
    await addTodo({ ...data, dueDate: data.dueDate ?? undefined });
  };

  const handleEditTask = async (data: TaskFormData): Promise<void> => {
    if (editingTodo) {
      await editTodo(editingTodo._id, data);
      setEditingTodo(null);
    } else {
      await handleAddTask(data);
    }
    setModalVisible(false);
  };

  const openAddModal = (): void => {
    setEditingTodo(null);
    setModalVisible(true);
  };

  const openEditModal = (todo: Todo): void => {
    setEditingTodo(todo);
    setModalVisible(true);
  };

  const handleSearch = (query: string): void => {
    setSearchQuery(query);
  };
return (
  <Screen themeMode={themeKey}>
    <StatusBar style={themeKey === 'dark' ? 'light' : 'dark'} />
    <Header themeMode={themeKey}>
      <Title themeMode={themeKey}>TODO</Title>
      <View style={{ flexDirection: 'row' }}>
        <Text>Test Header</Text>  // Simple text in View (wrapped)
      </View>
    </Header>
    <Content>
      <Text style={{ padding: 20 }}>App Loaded – No Error!</Text>  // Wrapped text
    </Content>
  </Screen>
);*/
  // return (
  //   <Screen themeMode={themeKey}>
  //     <StatusBar style={themeKey === 'dark' ? 'light' : 'dark'} />
  //     <Header themeMode={themeKey}>
  //       <Title themeMode={themeKey}>TODO</Title>
  //       <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm }}>
  //         <ThemeSwitcher />
  //         <AddButton onPress={openAddModal} accessibilityLabel="Add new task">
  //           <Plus size={24} color={theme.colors[themeKey].primary} />
  //         </AddButton>
  //       </View>
  //     </Header>
  //     <Content>
  //       <SearchBar themeMode={themeKey} onFilter={handleSearch} />
  //       <TaskList
  //         todos={filteredTodos}
  //         onToggle={toggleTodo}  // Now matches async + Id type
  //         onDelete={removeTodo}  // Now matches async + Id type
  //         onEdit={openEditModal}  // Passes full Todo
  //         themeMode={themeKey}
  //         onDragEnd={dragEnd}  // Now matches async
  //         searchQuery={searchQuery}
  //       />
  //     </Content>
  //     <AddEditTaskModal
  //       visible={modalVisible}
  //       onClose={() => setModalVisible(false)}
  //       initialData={
  //         editingTodo
  //           ? { title: editingTodo.title, description: editingTodo.description, dueDate: editingTodo.dueDate }
  //           : { title: '' }
  //       }
  //       onSubmit={handleEditTask}
  //       themeMode={themeKey}
  //     />
  //   </Screen>
  // );
//} 
/*import React from 'react';
import { View, Text } from 'react-native';

export default function TodoScreen() {
  console.log('TodoScreen rendered successfully!');

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#A855F7' }}>
      <Text style={{ color: 'white', fontSize: 24 }}>TODO App Works! 🚀</Text>
    </View>
  );
}*/


import React, { JSX, useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../../hooks/useTheme';
import { useTodos } from '../../hooks/useTodos';
import { ThemeSwitcher } from '../../components/ThemeSwitcher';
import { SearchBar } from '../../components/SearchBar';
import { TaskList } from '../../components/TaskList';
import { AddEditTaskModal } from '../../components/AddEditTaskModal';
import styled from 'styled-components/native';
import { Plus } from 'lucide-react-native';
import { Todo, TaskFormData } from '../../types/index';
import { theme } from '../constants/theme';

console.log('TodoScreen loaded!');  // Add at top of component

type ThemeMode = keyof typeof theme.colors;

const Screen = styled.SafeAreaView<{ themeMode: ThemeMode }>`
  flex: 1;
  background-color: ${({ themeMode }: { themeMode: ThemeMode }) => theme.colors[themeMode].background};
`;

const Header = styled.View<{ themeMode: ThemeMode }>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.lg}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ themeMode }: { themeMode: ThemeMode }) => theme.colors[themeMode].border};
`;

const Title = styled.Text<{ themeMode: ThemeMode }>`
  font-size: 24px;
  font-weight: bold;
  color: ${({ themeMode }: { themeMode: ThemeMode }) => theme.colors[themeMode].text};
`;

const AddButton = styled.TouchableOpacity`
  padding: ${theme.spacing.sm}px;
`;

const Content = styled(ScrollView)`
  flex: 1;
`;

export default function TodoScreen(): JSX.Element {
  const { theme: themeMode, toggleTheme } = useTheme();
  const themeKey: ThemeMode = themeMode as ThemeMode;
  const { todos, addTodo, toggleTodo, editTodo, removeTodo, dragEnd } = useTodos();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const todoPredicate = (t: Todo): boolean =>
    !searchQuery || t.title.toLowerCase().includes(searchQuery.toLowerCase());

  const filteredTodos: Todo[] = todos.filter(todo => todoPredicate(todo));

  const handleAddTask = async (data: TaskFormData): Promise<void> => {
    await addTodo({ ...data, dueDate: data.dueDate ?? undefined });
  };

  const handleEditTask = async (data: TaskFormData): Promise<void> => {
    if (editingTodo) {
      await editTodo(editingTodo._id, data);
      setEditingTodo(null);
    } else {
      await handleAddTask(data);
    }
    setModalVisible(false);
  };

  const openAddModal = (): void => {
    setEditingTodo(null);
    setModalVisible(true);
  };

  const openEditModal = (todo: Todo): void => {
    setEditingTodo(todo);
    setModalVisible(true);
  };

  const handleSearch = (query: string): void => {
    setSearchQuery(query);
  };

  return (
    <Screen themeMode={themeKey}>
      <StatusBar style={themeKey === 'dark' ? 'light' : 'dark'} />
      <Header themeMode={themeKey}>
        <Title themeMode={themeKey}>TODO</Title>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm }}>
          <ThemeSwitcher />
          <AddButton onPress={openAddModal} accessibilityLabel="Add new task">
            <Plus size={24} color={theme.colors[themeKey].primary} />
          </AddButton>
        </View>
      </Header>
      <Content>
        <SearchBar themeMode={themeKey} onFilter={handleSearch} />
        <TaskList
          todos={filteredTodos}
          onToggle={toggleTodo}
          onDelete={removeTodo}
          onEdit={openEditModal}
          themeMode={themeKey}
          onDragEnd={dragEnd}
          searchQuery={searchQuery}
        />
      </Content>
      <AddEditTaskModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        initialData={
          editingTodo
            ? { title: editingTodo.title, description: editingTodo.description, dueDate: editingTodo.dueDate }
            : { title: '' }
        }
        onSubmit={handleEditTask}
        themeMode={themeKey}
      />
    </Screen>
  );
}


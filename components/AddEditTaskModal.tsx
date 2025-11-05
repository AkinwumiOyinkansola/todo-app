import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Modal } from '../components/ui/modal';
import styled from 'styled-components/native';
import { theme as designTheme } from '../app/constants/theme';
import { useTodos } from '../hooks/useTodos';
import { TaskFormData } from '../types/index';

const FormContainer = styled.View`
  gap: ${designTheme.spacing.md}px;
`;

const Label = styled.Text<{ themeMode: 'light' | 'dark' }>`
  font-size: 14px;
  color: ${({ themeMode }: { themeMode: 'light' | 'dark' }) => designTheme.colors[themeMode].textSecondary};
  margin-bottom: ${designTheme.spacing.xs}px;
`;

const Buttons = styled.View`
  flex-direction: row;
  gap: ${designTheme.spacing.sm}px;
  justify-content: flex-end;
  margin-top: ${designTheme.spacing.lg}px;
`;

interface AddEditTaskModalProps {
  visible: boolean;
  onClose: () => void;
  initialData?: TaskFormData;
  onSubmit: (data: TaskFormData) => void;
  themeMode: 'light' | 'dark';
}

export const AddEditTaskModal: React.FC<AddEditTaskModalProps> = ({
  visible,
  onClose,
  initialData = { title: '' },
  onSubmit,
  themeMode,
}) => {
  const [formData, setFormData] = useState<TaskFormData>(initialData);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSubmit = () => {
    if (!formData.title.trim()) {
      Alert.alert('Error', 'Title is required');
      return;
    }
    onSubmit(formData);
    onClose();
    setFormData({ title: '' });
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    setFormData(prev => ({ ...prev, dueDate: selectedDate || undefined }));
  };

    function formatDueDate(dueDate: Date): string {
        if (!dueDate || !(dueDate instanceof Date) || isNaN(dueDate.getTime())) return '';

        const today = new Date();
        const sameDay = (a: Date, b: Date) =>
            a.getFullYear() === b.getFullYear() &&
            a.getMonth() === b.getMonth() &&
            a.getDate() === b.getDate();

        if (sameDay(dueDate, today)) return 'Today';

        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        if (sameDay(dueDate, yesterday)) return 'Yesterday';

        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        if (sameDay(dueDate, tomorrow)) return 'Tomorrow';

        return dueDate.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    }
  return (
    <Modal visible={visible} onClose={onClose} themeMode={themeMode}>
      <FormContainer>
        <View>
          <Label themeMode={themeMode}>Title</Label>
          <Input
            themeMode={themeMode}
            value={formData.title}
            onChangeText={text => setFormData(prev => ({ ...prev, title: text }))}
            placeholder="Enter task title"
          />
        </View>
        <View>
          <Label themeMode={themeMode}>Description</Label>
          <Input
            themeMode={themeMode}
            value={formData.description || ''}
            onChangeText={text => setFormData(prev => ({ ...prev, description: text || undefined }))}
            placeholder="Enter description (optional)"
            multiline
            numberOfLines={3}
          />
        </View>
        <View>
          <Label themeMode={themeMode}>Due Date</Label>
          <Button
            themeMode={themeMode}
            variant="secondary"
            title={formData.dueDate ? formatDueDate(formData.dueDate) : 'Select date'}
            onPress={() => setShowDatePicker(true)}
          />
          {showDatePicker && (
            <DateTimePicker
              value={formData.dueDate || new Date()}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>
        <Buttons>
          <Button themeMode={themeMode} variant="secondary" title="Cancel" onPress={onClose} />
          <Button themeMode={themeMode} title={initialData.title ? 'Update' : 'Add Task'} onPress={handleSubmit} />
        </Buttons>
      </FormContainer>
    </Modal>
  );
};
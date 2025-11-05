import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import { Search } from 'lucide-react-native';
import styled from 'styled-components/native';
import { Input } from '../components/ui/input';
import { theme as designTheme } from '@/constants/theme';
import { useTodos } from '../hooks/useTodos';

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${designTheme.spacing.lg}px;
`;

const Icon = styled(Search)`
  margin-right: ${designTheme.spacing.sm}px;
  color: ${designTheme.colors.light.textSecondary}; // Will be themed via parent
`;

interface SearchBarProps {
  themeMode: 'light' | 'dark';
  onFilter: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ themeMode, onFilter }) => {
  const [query, setQuery] = useState('');

  const handleChange = (text: string) => {
    setQuery(text);
    onFilter(text);
  };

  return (
    <Container>
      <Icon size={20} color={designTheme.colors[themeMode].textSecondary} />
      <Input
        themeMode={themeMode}
        placeholder="Search tasks..."
        value={query}
        onChangeText={handleChange}
        style={{ flex: 1 }}
      />
    </Container>
  );
};
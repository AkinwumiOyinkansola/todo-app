import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Moon, Sun } from 'lucide-react-native';
import styled from 'styled-components/native';
import { theme as designTheme } from '../app/constants/theme';
import { useTheme } from '../hooks/useTheme';

const IconContainer = styled.TouchableOpacity`
  padding: ${designTheme.spacing.sm}px;
`;

export const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const Icon = theme === 'light' ? Moon : Sun;
  return (
    <IconContainer onPress={toggleTheme} accessibilityRole="switch" accessibilityLabel="Toggle theme">
      <Icon size={24} color={designTheme.colors[theme as keyof typeof designTheme.colors].primary} />
    </IconContainer>
  );
};
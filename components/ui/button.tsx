import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native';
import styled from 'styled-components/native';
import { theme } from '@/constants/theme';

const StyledButton = styled.TouchableOpacity<{ variant?: 'primary' | 'secondary'; themeMode: 'light' | 'dark' }>`
  background-color: ${({ variant, themeMode }: { variant?: 'primary' | 'secondary'; themeMode: 'light' | 'dark' }) =>
    variant === 'primary' ? theme.colors[themeMode].primary : 'transparent'};
  padding: ${theme.spacing.md}px ${theme.spacing.lg}px;
  border-radius: ${theme.borderRadius}px;
  border-width: 1px;
  border-color: ${({ variant, themeMode }: { variant?: 'primary' | 'secondary'; themeMode: 'light' | 'dark' }) =>
    variant === 'primary' ? theme.colors[themeMode].primary : theme.colors[themeMode].border};
  align-items: center;
  justify-content: center;
  min-height: 44px;
`;

const StyledText = styled.Text<{ themeMode: 'light' | 'dark' }>`
  color: ${({ themeMode }: { themeMode: 'light' | 'dark' }) => theme.colors[themeMode].text};
  font-size: 16px;
  font-weight: 600;
`;

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary';
  themeMode: 'light' | 'dark';
}

export const Button: React.FC<ButtonProps> = ({ title, variant = 'primary', themeMode, ...props }) => (
  <StyledButton variant={variant} themeMode={themeMode} {...props}>
    <StyledText themeMode={themeMode}>{title}</StyledText>
  </StyledButton>
);
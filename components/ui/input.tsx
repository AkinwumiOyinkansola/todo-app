import React from 'react';
import { TextInput, TextInputProps, ViewStyle } from 'react-native';
import styled from 'styled-components/native';
import { theme } from '../../app/constants/theme';

const StyledInput = styled.TextInput<{ themeMode: 'light' | 'dark' }>`
  background-color: ${({ themeMode }: { themeMode: 'light' | 'dark' }) => theme.colors[themeMode].surface};
  color: ${({ themeMode }: { themeMode: 'light' | 'dark' }) => theme.colors[themeMode].text};
  padding: ${theme.spacing.sm}px ${theme.spacing.md}px;
  border-radius: ${theme.borderRadius}px;
  border-width: 1px;
  border-color: ${({ themeMode }: { themeMode: 'light' | 'dark' }) => theme.colors[themeMode].border};
  font-size: 16px;
  min-height: 44px;
`;

interface InputProps extends TextInputProps {
  themeMode: 'light' | 'dark';
  style?: TextInputProps['style'];
  placeholder?: string;
}

export const Input: React.FC<InputProps> = ({ themeMode, style, ...props }) => (
  <StyledInput themeMode={themeMode} style={style} {...props} editable />
);
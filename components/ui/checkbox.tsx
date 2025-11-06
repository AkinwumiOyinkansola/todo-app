import React from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
import { Check } from 'lucide-react-native';
import styled from 'styled-components/native';
import { theme } from '../../app/constants/theme';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

const Container = styled.TouchableOpacity<{ themeMode: 'light' | 'dark'; checked: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border-width: 2px;
  border-color: ${({ themeMode }: { themeMode: 'light' | 'dark'; checked: boolean }) =>
    theme.colors[themeMode].primary};
  background-color: ({ checked, themeMode }: { checked: boolean; themeMode: 'light' | 'dark' }) =>
    checked ? theme.colors[themeMode].primary : 'transparent'};
  justify-content: center;
  align-items: center;
`;

const AnimatedCheck = Animated.createAnimatedComponent(Check);

interface CheckboxProps {
  checked: boolean;
  onPress: () => void;
  themeMode: 'light' | 'dark';
  style?: ViewStyle;
}

export const Checkbox: React.FC<CheckboxProps> = ({ checked, onPress, themeMode, style }: CheckboxProps) => {
  const scale = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: withSpring(checked ? 1 : 0),
    transform: [{ scale: withSpring(checked ? 1 : 0) }],
  }));

  if (checked) scale.value = withSpring(1);

  return React.createElement(
    Container,
    { checked, themeMode, onPress, style },
    React.createElement(AnimatedCheck, {
      size: 16,
      color: theme.colors[themeMode].background,
      style: [animatedStyle, { position: 'absolute' }],
    })
  );
};
import { Text, View } from 'react-native';
import { Link, router } from 'expo-router';
import { useTheme } from '../hooks/useTheme';
import styled from 'styled-components/native';
import { theme as designTheme } from '../app/constants/theme';
import type { DefaultTheme } from 'styled-components';
const NotFoundContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const NotFoundTitle = styled.Text<{ themeMode: 'light' | 'dark' }>`
  font-size: 24px;
  font-weight: bold;
  color: ${(props) => designTheme.colors[props.themeMode].text};
`;

export default function NotFound() {
  const { theme: themeMode } = useTheme();

  return (
    <NotFoundContainer>
      <NotFoundTitle themeMode={themeMode}>Oops! Page not found.</NotFoundTitle>
      <Link href={{ pathname: "/tabs" }} asChild>
        <Text>Go Home</Text>
      </Link>
    </NotFoundContainer>
  );
} 
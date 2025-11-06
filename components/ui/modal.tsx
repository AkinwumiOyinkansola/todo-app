import React from 'react';
import { Modal as RNModal, View, Pressable, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { theme } from '../../app/constants/theme';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const { height } = Dimensions.get('window');

const Backdrop = styled.Pressable<{ themeMode: 'light' | 'dark' }>`
  flex: 1;
  background-color: ${({ themeMode }: { themeMode: 'light' | 'dark' }) => theme.colors[themeMode].text}20;
`;

const Content = styled(Animated.View)<{ themeMode: 'light' | 'dark' }>`
  background-color: ${({ themeMode }: { themeMode: 'light' | 'dark' }) => theme.colors[themeMode].background};
  margin: ${theme.spacing.xl}px;
  border-radius: ${theme.borderRadius}px;
  padding: ${theme.spacing.lg}px;
  max-height: ${height * 0.8}px;
  shadow-color: #000;
  shadow-offset: 0 2px;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  elevation: 5;
`;

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  themeMode: 'light' | 'dark';
}

export const Modal: React.FC<ModalProps> = ({ visible, onClose, children, themeMode }) => (
  <RNModal transparent visible={visible} animationType="none" onRequestClose={onClose}>
    <Backdrop themeMode={themeMode} onPress={onClose}>
      <Pressable style={{ flex: 1, justifyContent: 'center' }}>
        <Content
          themeMode={themeMode}
          entering={FadeIn.duration(300)}
          exiting={FadeOut.duration(300)}
        >
          {children}
        </Content>
      </Pressable>
    </Backdrop>
  </RNModal>
);
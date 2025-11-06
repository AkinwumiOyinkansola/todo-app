import { LogBox } from 'react-native';
import { registerRootComponent } from 'expo';
import Root from 'expo-router';
import 'react-native-gesture-handler';  // Must be first for gestures (drag/swipe)

// Show all warnings and errors in detail
LogBox.ignoreAllLogs(false);
console.reportErrorsAsExceptions = true;




registerRootComponent(Root);
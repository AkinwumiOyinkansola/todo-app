const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Fix for RNGH web StyleSheet resolution
config.resolver.alias = {
  ...config.resolver.alias,
  'react-native/Libraries/StyleSheet/StyleSheet': 'react-native-web/dist/exports/StyleSheet',
  'react-native/Libraries/StyleSheet/StyleSheetProperties': 'react-native-web/dist/exports/StyleSheet/properties',
};

module.exports = config;
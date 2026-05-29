import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#F59E0B',
    onPrimary: '#FFFFFF',
    primaryContainer: '#FFEFD5',
    onPrimaryContainer: '#3E2723',
    secondary: '#0369A1',
    onSecondary: '#FFFFFF',
    background: '#FAFAFA',
    surface: '#FFFFFF',
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#FBBF24',
    onPrimary: '#1C1917',
    primaryContainer: '#451A03',
    onPrimaryContainer: '#FFEFD5',
    secondary: '#38BDF8',
    onSecondary: '#0C4A6E',
    background: '#121212',
    surface: '#1E1E1E',
  },
};

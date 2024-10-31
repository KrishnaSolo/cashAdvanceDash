import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import Dashboard from './components/organisms/Dashboard';
import GlobalStyles from './components/atoms/GlobalStyles';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Dashboard />
    </ThemeProvider>
  );
}

export default App;

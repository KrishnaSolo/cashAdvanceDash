import { createGlobalStyle } from 'styled-components';
import { theme } from '../../theme';

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: ${theme.typography.fontFamily};
    background-color: ${theme.colors.background.main};
    color: ${theme.colors.text.primary};
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${theme.colors.text.primary};
    margin-bottom: ${theme.spacing.sm};
  }

  h1 {
    font-size: ${theme.typography.sizes['3xl']};
    font-weight: ${theme.typography.weights.bold};
  }

  h2 {
    font-size: ${theme.typography.sizes['2xl']};
    font-weight: ${theme.typography.weights.semibold};
  }
`;

export default GlobalStyles;

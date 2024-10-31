export interface Theme {
  colors: {
    primary: string;
    primaryHover: string;
    secondary: string;
    success: string;
    error: string;
    warning: string;
    text: {
      primary: string;
      secondary: string;
    };
    background: {
      main: string;
      card: string;
      overlay: string;
    };
    border: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
  };
  transitions: {
    default: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  typography: {
    fontFamily: string;
    sizes: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
    };
    weights: {
      normal: number;
      medium: number;
      semibold: number;
      bold: number;
    };
  };
}

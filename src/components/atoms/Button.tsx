import styled from 'styled-components';
import { theme } from '../../theme';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
}

export const Button = styled.button<ButtonProps>`
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  font-weight: ${theme.typography.weights.medium};
  transition: all ${theme.transitions.default};
  cursor: pointer;
  border: none;

  ${({ variant = 'primary' }) =>
    variant === 'primary'
      ? `
    background: ${theme.colors.primary};
    color: white;
    
    &:hover {
      background: ${theme.colors.primaryDark};
    }
  `
      : `
    background: ${theme.colors.background.secondary};
    color: ${theme.colors.text.primary};
    
    &:hover {
      background: ${theme.colors.background.hover};
    }
  `}
`;

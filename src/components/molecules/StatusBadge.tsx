import styled from 'styled-components';
import { theme } from '../../theme';
import { TransactionStatus } from '../../types';

export const StatusBadge = styled.span<{ status: TransactionStatus }>`
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.typography.sizes.sm};
  font-weight: ${theme.typography.weights.medium};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};

  ${({ status }) =>
    status === 'completed'
      ? `
    background: ${theme.colors.success}20;
    color: ${theme.colors.success};
  `
      : `
    background: ${theme.colors.warning}20;
    color: ${theme.colors.warning};
  `}
`;

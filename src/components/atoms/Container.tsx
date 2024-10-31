import styled from 'styled-components';
import { theme } from '../../theme';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing.xl};

  @media (max-width: 640px) {
    padding: ${theme.spacing.lg};
  }
`;

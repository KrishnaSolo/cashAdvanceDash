import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../theme';

export const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${theme.colors.background.overlay};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled(motion.div)`
  background: ${theme.colors.background.card};
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  width: 90%;
  max-width: 500px;
  position: relative;
  box-shadow: ${theme.shadows.lg};
`;

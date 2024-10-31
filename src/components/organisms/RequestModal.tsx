import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Calendar, DollarSign } from 'lucide-react';
import { theme } from '../../theme';
import { Input } from '../atoms/Input';
import { Button } from '../atoms/Button';
import { ModalOverlay, ModalContent } from '../molecules/Modal';
import { formatCurrency } from '../../utils/formatters';

const Title = styled.h2`
  font-size: ${theme.typography.sizes.xl};
  font-weight: ${theme.typography.weights.bold};
  margin-bottom: ${theme.spacing.lg};
  color: ${theme.colors.text.primary};
`;

const InputGroup = styled.div`
  margin-bottom: ${theme.spacing.lg};
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${theme.spacing.xs};
  font-weight: ${theme.typography.weights.medium};
  color: ${theme.colors.text.secondary};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  justify-content: flex-end;
`;

const SuccessContainer = styled(motion.div)`
  text-align: center;
  padding: ${theme.spacing.xl} ${theme.spacing.lg};
`;

const IconWrapper = styled.div`
  width: 64px;
  height: 64px;
  border-radius: ${theme.borderRadius.full};
  background: ${theme.colors.success}15;
  color: ${theme.colors.success};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${theme.spacing.lg};
`;

const SuccessTitle = styled.h3`
  color: ${theme.colors.success};
  font-size: ${theme.typography.sizes.xl};
  font-weight: ${theme.typography.weights.bold};
  margin-bottom: ${theme.spacing.md};
`;

const SuccessDetails = styled.div`
  background: ${theme.colors.background.secondary};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  margin: ${theme.spacing.lg} 0;
`;

const DetailRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.xs} 0;
  color: ${theme.colors.text.secondary};

  &:not(:last-child) {
    border-bottom: 1px solid ${theme.colors.border};
    margin-bottom: ${theme.spacing.xs};
    padding-bottom: ${theme.spacing.sm};
  }
`;

const DetailLabel = styled.span`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  color: ${theme.colors.text.secondary};
  font-size: ${theme.typography.sizes.sm};
`;

const DetailValue = styled.span`
  margin-left: auto;
  font-weight: ${theme.typography.weights.medium};
  color: ${theme.colors.text.primary};
`;

const SuccessSummary = styled.p`
  color: ${theme.colors.text.primary};
  font-size: ${theme.typography.sizes.lg};
  font-weight: ${theme.typography.weights.medium};
  margin: ${theme.spacing.lg} 0;
  line-height: 1.5;
`;

const ProcessingInfo = styled.p`
  color: ${theme.colors.text.secondary};
  font-size: ${theme.typography.sizes.base};
  margin-top: ${theme.spacing.md};
`;

interface RequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (amount: number) => Promise<void>;
  maxAmount: number;
}

export const RequestModal: React.FC<RequestModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  maxAmount,
}) => {
  const [amount, setAmount] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submittedAmount, setSubmittedAmount] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);

    if (!numAmount || numAmount > maxAmount) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(numAmount);
      setSubmittedAmount(numAmount);
      setShowSuccess(true);
    } catch (error) {
      console.error('Failed to submit request:', error);
      // Here you could add error handling UI if needed
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      // Only reset states after closing the modal
      onClose();
      // Reset form state after animation completes
      setTimeout(() => {
        setAmount('');
        setShowSuccess(false);
        setSubmittedAmount(0);
      }, 300);
    }
  };

  const handleSuccessClose = () => {
    // Close modal after showing success state for a moment
    setTimeout(() => {
      handleClose();
    }, 3000);
  };

  const repaymentDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString(
    'en-US',
    {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <ModalContent
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={e => e.stopPropagation()}
          >
            {showSuccess ? (
              <SuccessContainer
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onAnimationComplete={handleSuccessClose}
              >
                <IconWrapper>
                  <Check size={32} />
                </IconWrapper>
                <SuccessTitle>Success!</SuccessTitle>
                <SuccessSummary>
                  You have requested {formatCurrency(submittedAmount)}. It will be processed
                  shortly.
                </SuccessSummary>
                <SuccessDetails>
                  <DetailRow>
                    <DetailLabel>
                      <DollarSign size={16} />
                      Amount Requested
                    </DetailLabel>
                    <DetailValue>{formatCurrency(submittedAmount)}</DetailValue>
                  </DetailRow>
                  <DetailRow>
                    <DetailLabel>
                      <Calendar size={16} />
                      Estimated Repayment
                    </DetailLabel>
                    <DetailValue>{repaymentDate}</DetailValue>
                  </DetailRow>
                </SuccessDetails>
                <ProcessingInfo>
                  You will receive a confirmation notification once your request is processed.
                </ProcessingInfo>
              </SuccessContainer>
            ) : (
              <form onSubmit={handleSubmit}>
                <Title>Request Cash Advance</Title>
                <InputGroup>
                  <Label htmlFor="amount">Amount (up to {formatCurrency(maxAmount)})</Label>
                  <Input
                    id="amount"
                    type="number"
                    min="1"
                    max={maxAmount}
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    required
                    disabled={isSubmitting}
                  />
                </InputGroup>
                <ButtonGroup>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleClose}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" disabled={isSubmitting}>
                    {isSubmitting ? 'Processing...' : 'Request Advance'}
                  </Button>
                </ButtonGroup>
              </form>
            )}
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

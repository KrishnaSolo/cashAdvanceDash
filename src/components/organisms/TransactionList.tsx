import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Transaction } from '../../types';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { theme } from '../../theme';

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin: ${theme.spacing.xl} auto; // Changed margin-top to margin to center horizontally
  display: flex;
  flex-direction: column;
  align-items: center; // Center children horizontally
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.lg};
  width: 100%; // Ensure header takes full width
`;

const Title = styled.h2`
  font-size: ${theme.typography.sizes['2xl']};
  color: ${theme.colors.text.primary};
  margin: 0;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
`;

const FilterButton = styled.button<{ $active: boolean }>`
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border: none;
  border-radius: ${theme.borderRadius.md};
  background-color: ${props =>
    props.$active ? theme.colors.primary : theme.colors.background.secondary};
  color: ${props => (props.$active ? 'white' : theme.colors.text.primary)};
  cursor: pointer;
  transition: all ${theme.transitions.default};

  &:hover {
    background-color: ${props =>
      props.$active ? theme.colors.primaryDark : theme.colors.background.hover};
  }
`;

const TransactionItem = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.lg};
  background-color: ${theme.colors.background.card};
  border-radius: ${theme.borderRadius.lg};
  margin-bottom: ${theme.spacing.sm};
  box-shadow: ${theme.shadows.sm};
  cursor: pointer;
  position: relative;
  width: 100%; // Ensure transaction items take full width

  &:hover {
    box-shadow: ${theme.shadows.md};
  }
`;

const TransactionInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

const TransactionDate = styled.span`
  font-size: ${theme.typography.sizes.sm};
  color: ${theme.colors.text.secondary};
`;

const TransactionAmount = styled.span<{ type: 'advance' | 'repayment' }>`
  font-weight: ${theme.typography.weights.bold};
  color: ${props => (props.type === 'advance' ? theme.colors.success : theme.colors.warning)};
`;

const StatusBadge = styled.span<{ status: 'pending' | 'completed' }>`
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.typography.sizes.sm};
  background-color: ${props =>
    props.status === 'pending' ? `${theme.colors.warning}20` : `${theme.colors.success}20`};
  color: ${props => (props.status === 'pending' ? theme.colors.warning : theme.colors.success)};
`;

const DetailTooltip = styled(motion.div)`
  position: absolute;
  top: -60px;
  right: 0;
  background-color: ${theme.colors.text.primary};
  color: white;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.sizes.sm};
  pointer-events: none;
  z-index: 10;
  box-shadow: ${theme.shadows.lg};
`;

interface TransactionListProps {
  transactions: Transaction[];
}

export const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filteredTransactions = transactions.filter(transaction => {
    if (filter === 'all') return true;
    return transaction.status === filter;
  });

  return (
    <Container>
      <Header>
        <Title>Recent Transactions</Title>
        <FilterContainer>
          <FilterButton onClick={() => setFilter('all')} $active={filter === 'all'}>
            All
          </FilterButton>
          <FilterButton onClick={() => setFilter('pending')} $active={filter === 'pending'}>
            Pending
          </FilterButton>
          <FilterButton onClick={() => setFilter('completed')} $active={filter === 'completed'}>
            Completed
          </FilterButton>
        </FilterContainer>
      </Header>
      {filteredTransactions.map(transaction => (
        <TransactionItem
          key={transaction.id}
          onMouseEnter={() => setHoveredId(transaction.id)}
          onMouseLeave={() => setHoveredId(null)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <TransactionInfo>
            <TransactionDate>{formatDate(transaction.date)}</TransactionDate>
            <TransactionAmount type={transaction.type}>
              {transaction.type === 'advance' ? '+' : '-'}
              {formatCurrency(transaction.amount)}
            </TransactionAmount>
          </TransactionInfo>
          <StatusBadge status={transaction.status as 'pending' | 'completed'}>
            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
          </StatusBadge>
          {hoveredId === transaction.id && (
            <DetailTooltip initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              ID: {transaction.id}
              <br />
              Repayment Date: {formatDate(transaction.repaymentDate)}
            </DetailTooltip>
          )}
        </TransactionItem>
      ))}
    </Container>
  );
};

export default TransactionList;

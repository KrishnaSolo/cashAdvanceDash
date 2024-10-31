import React, { useState } from 'react';
import styled from 'styled-components';
import { Wallet, TrendingUp } from 'lucide-react';
import { Container, Card, Button } from '../atoms';
import TransactionList from './TransactionList';
import { RequestModal } from './RequestModal';
import { useCashAdvance } from '../../hooks/useCashAdvance';
import { theme } from '../../theme';

const DashboardContainer = styled(Container)`
  padding-top: ${theme.spacing.xl};
  padding-bottom: ${theme.spacing.xl};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.xl};

  @media (max-width: 640px) {
    flex-direction: column;
    gap: ${theme.spacing.lg};
    text-align: center;
  }
`;

const Title = styled.h1`
  margin: 0;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
`;

const BalanceCard = styled(Card)`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.lg};
  background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryDark} 100%);
  color: white;
  transition: transform ${theme.transitions.default};

  &:hover {
    transform: translateY(-2px);
  }
`;

const StatsCard = styled(Card)`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.lg};
  transition: transform ${theme.transitions.default};

  &:hover {
    transform: translateY(-2px);
  }
`;

const IconWrapper = styled.div<{ variant?: 'primary' | 'secondary' }>`
  width: 48px;
  height: 48px;
  border-radius: ${theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ variant }) =>
    variant === 'primary' ? 'rgba(255, 255, 255, 0.2)' : `${theme.colors.primary}10`};
  color: ${({ variant }) => (variant === 'primary' ? 'white' : theme.colors.primary)};
`;

const InfoWrapper = styled.div`
  flex: 1;
`;

const Label = styled.p<{ variant?: 'primary' }>`
  margin: 0;
  font-size: ${theme.typography.sizes.sm};
  color: ${({ variant }) =>
    variant === 'primary' ? 'rgba(255, 255, 255, 0.9)' : theme.colors.text.secondary};
`;

const Value = styled.h2<{ variant?: 'primary' }>`
  margin: 0;
  color: ${({ variant }) => (variant === 'primary' ? 'white' : theme.colors.text.primary)};
`;

const LoadingState = styled.div`
  text-align: center;
  padding: ${theme.spacing.xl};
  color: ${theme.colors.text.secondary};
`;

const Dashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { balance, transactions, isLoading, requestAdvance } = useCashAdvance();

  const totalAdvanced = transactions
    .filter(t => t.type === 'advance' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const handleRequestAdvance = async (amount: number) => {
    try {
      await requestAdvance(amount);
      // Modal will be closed by the RequestModal component after showing success state
    } catch (error) {
      console.error('Failed to process request:', error);
      setIsModalOpen(false); // Close modal only on error
    }
  };

  if (isLoading) {
    return <LoadingState>Loading your dashboard...</LoadingState>;
  }

  return (
    <DashboardContainer>
      <Header>
        <Title>Cash Advance Dashboard</Title>
        <Button onClick={() => setIsModalOpen(true)}>Request a Cash Advance</Button>
      </Header>

      <StatsContainer>
        <BalanceCard>
          <IconWrapper variant="primary">
            <Wallet size={24} />
          </IconWrapper>
          <InfoWrapper>
            <Label variant="primary">Available Balance</Label>
            <Value variant="primary">${balance.toFixed(2)}</Value>
          </InfoWrapper>
        </BalanceCard>

        <StatsCard>
          <IconWrapper>
            <TrendingUp size={24} />
          </IconWrapper>
          <InfoWrapper>
            <Label>Total Advanced</Label>
            <Value>${totalAdvanced.toFixed(2)}</Value>
          </InfoWrapper>
        </StatsCard>
      </StatsContainer>

      <TransactionList transactions={transactions} />

      <RequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleRequestAdvance}
        maxAmount={balance}
      />
    </DashboardContainer>
  );
};

export default Dashboard;

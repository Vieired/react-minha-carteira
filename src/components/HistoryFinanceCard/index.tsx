import React from 'react';

import { Container, Tag } from './styles';

interface IHistoryFinanceCardProps {
    tagColor: string;
    title: string;
    subtitle: string;
    amount: string;
    onClick?: () => void;
}

const HistoryFinanceCard: React.FC<IHistoryFinanceCardProps> = ({
    tagColor,
    title,
    subtitle,
    amount,
    onClick
}) => (
    <Container onClick={onClick}>
        <Tag color={tagColor} />
        <div>
            <span>{title}</span>
            <small>{subtitle}</small>
        </div>
        <h3>{amount}</h3>
    </Container>
);

export default HistoryFinanceCard;
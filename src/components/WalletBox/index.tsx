import React from 'react';
import CountUp from 'react-countup';

import dolarImg from '../../assets/dollar.svg';
import arrowUpImg from '../../assets/arrow-up.svg';
import arrowDownImg from '../../assets/arrow-down.svg';

import { Container } from './styles';

interface IWalletBoxPropx {
    title: string;
    amount: number;
    footerLabel: string;
    icon: 'dolar' | 'arrowUp' | 'arrowDown';
    color: string;
}

const WalletBox: React.FC<IWalletBoxPropx> = ({
    title,
    amount,
    footerLabel,
    icon, color
}) => {

    const iconSelected = () => {
        switch(icon) {
            case 'dolar': return dolarImg;
            case 'arrowUp': return arrowUpImg;
            case 'arrowDown': return arrowDownImg;
            default: return dolarImg;
        }
    }

    return (
        <Container color={color}>
            <span>{title}</span>
            <h1>
                <strong>R$</strong>
                <CountUp
                    end={amount}
                    separator="."
                    decimal=","
                    decimals={2}
                />
            </h1>
            <small>{footerLabel}</small>
            <img src={iconSelected()} alt={title} />
        </Container>
    );
}

export default WalletBox;
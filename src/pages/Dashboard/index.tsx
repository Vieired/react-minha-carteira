import React, { useMemo, useState } from 'react';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import WalletBox from '../../components/WalletBox';
import MessageBox from '../../components/MessageBox';

import expenses from '../../repositories/expenses';
import gains from '../../repositories/gains';
import listOfMonths from '../../utils/months';
import happyImg from '../../assets/happy.svg';
import sadImg from '../../assets/sad.svg';
import grinningImg from '../../assets/grinning.svg';

import { Container, Content } from './styles';

const Dashboard: React.FC = () => {

    const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth()+1);
    const [selectedYear, setSelectedYear] = useState<number>(2020);

    const years = useMemo(() => {
        let uniqueYears: number[] = [];

        [...expenses, ...gains].forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();

            if(!uniqueYears.includes(year)) {
                uniqueYears.push(year)
            }
        });

        return uniqueYears.map(year => {
            return {
                value: year,
                label: year
            }
        });
    },[]);

    const months = useMemo(() => {
        return listOfMonths.map((month, index) => {
            return {
                value: index + 1,
                label: month,
            }
        });
    },[]);    

    const totalExpenses = useMemo(() => {
        let total: number = 0;

        expenses.forEach(item => {
            const date = new Date(item.date),
                month = date.getMonth()+1,
                year = date.getFullYear();

            if(month === selectedMonth && year === selectedYear) {
                try {
                    total += Number(item.amount);
                }
                catch {
                    throw new Error('Invalid month value. Is accept 0 -24.');
                }
            }
        });

        return total;
    },[selectedMonth, selectedYear]);

    const totalGains = useMemo(() => {
        let total: number = 0;

        gains.forEach(item => {
            const date = new Date(item.date),
                month = date.getMonth()+1,
                year = date.getFullYear();

            if(month === selectedMonth && year === selectedYear) {
                try {
                    total += Number(item.amount);
                }
                catch {
                    throw new Error('Invalid month value. Is accept 0 -24.');
                }
            }
        });

        return total;
    },[selectedMonth, selectedYear]);    

    const totalBalance = useMemo(() => {
        return totalGains - totalExpenses
    },[totalGains, totalExpenses]);

    const messege = useMemo(() => {
        if(totalBalance < 0) {
            return {
                title: "Que triste.",
                description: "Neste mês você gastou mais do que deveria.",
                footerText: "Verifique seus gastos e tente cortar algumas coisas desnecessárias.",
                icon: sadImg
            }
        }
        else if(totalBalance === 0) {
            return {
                title: "Ufa!",
                description: "Neste mês você gastou exatamente o que ganhou.",
                footerText: "Tenha cuidado. No próximo tente poupar o seu dinheiro.",
                icon: grinningImg
            }
        }
        else {
            return {
                title: "Muito bem!",
                description: "Sua carteira está positiva!",
                footerText: "Continue assim. Considere investir o seu saldo.",
                icon: happyImg
            }
        }

    },[totalBalance]);

    const handleChangeMonth = (elem: React.ChangeEvent<HTMLSelectElement>) => {
        try {
            const parseMonth = Number(elem.target.value);
            setSelectedMonth(parseMonth);
        }
        catch(eror) {
            throw new Error('Invalid month value. Is accept 0 - 24.');
        }
    }

    const handleChangeYear = (elem: React.ChangeEvent<HTMLSelectElement>) => {
        try {
            const parseYear = Number(elem.target.value);
            setSelectedYear(parseYear);
        }
        catch(error) {
            throw new Error('Invalid month value. Is accept 0 - 24.');
        }        
    }

    return (
        <Container>
            <ContentHeader title="Dashboard" lineColor="#F7931B">
                <SelectInput
                    options={months}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChangeMonth(e)}
                    defaultValue={selectedMonth}
                />
                <SelectInput
                    options={years}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChangeYear(e)}
                    defaultValue={selectedYear}
                />
            </ContentHeader>

            <Content>
                <WalletBox
                    title="saldo"
                    color="#4E41F0"
                    amount={totalBalance}
                    footerLabel="Atualizado com base nas entradas e saídas"
                    icon="dolar"
                />
                <WalletBox
                    title="entradas"
                    color="#F7931B"
                    amount={totalGains}
                    footerLabel="Atualizado com base nas entradas e saídas"
                    icon="arrowUp"
                />
                <WalletBox
                    title="saídas"
                    color="#4E41F0"
                    amount={totalExpenses}
                    footerLabel="Atualizado com base nas entradas e saídas"
                    icon="arrowDown"
                />

                <MessageBox
                    title={messege.title}
                    description={messege.description}
                    footerText={messege.footerText}
                    icon={happyImg}
                />
            </Content>
        </Container>
    );
}

export default Dashboard;
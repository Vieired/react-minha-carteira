import React, { useMemo, useState } from 'react';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import WalletBox from '../../components/WalletBox';

import expenses from '../../repositories/expenses';
import gains from '../../repositories/gains';
import listOfMonths from '../../utils/months';

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

    const handleChangeMonth = (elem: React.ChangeEvent<HTMLSelectElement>) => {
        try {
            const parseMonth = Number(elem);
            setSelectedMonth(parseMonth);
        }
        catch(eror) {
            throw new Error('Invalid month value. Is accept 0 - 24.');
        }
    }

    const handleChangeYear = (elem: React.ChangeEvent<HTMLSelectElement>) => {
        try {
            const parseYear = Number(elem);
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
                    amount={150.00}
                    footerLabel="Atualizado com base nas entradas e saídas"
                    icon="dolar"
                />
                <WalletBox
                    title="entradas"
                    color="#F7931B"
                    amount={5000.00}
                    footerLabel="Atualizado com base nas entradas e saídas"
                    icon="arrowUp"
                />
                <WalletBox
                    title="saídas"
                    color="#4E41F0"
                    amount={4850.00}
                    footerLabel="Atualizado com base nas entradas e saídas"
                    icon="arrowDown"
                />                                
            </Content>            
        </Container>
    );
}

export default Dashboard;
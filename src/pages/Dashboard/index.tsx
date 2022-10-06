import React, { useMemo, useState } from 'react';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import WalletBox from '../../components/WalletBox';
import MessageBox from '../../components/MessageBox';
import PieChartBox from '../../components/PieChartBox';
import HistoryBox from '../../components/HistoryBox';

import expenses from '../../repositories/expenses';
import gains from '../../repositories/gains';
import listOfMonths from '../../utils/months';
import happyImg from '../../assets/happy.svg';
import sadImg from '../../assets/sad.svg';
import grinningImg from '../../assets/grinning.svg';
import thinkingImg from '../../assets/thinking.png';

import { Container, Content } from './styles';
import BarChartBox from '../../components/BarChartBox';
import InputCKEditor from '../../components/InputCKEditor';

const Dashboard: React.FC = () => {

    const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth()+1);
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
    const [ richText, setRichText ] = useState<any>('');

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
        else if(totalGains === 0 && totalExpenses === 0) {
            return {
                title: "Ops!",
                description: "Neste mês não há registros de entradas ou saídas.",
                footerText: "Parece que você não fez nenhum registro do mês e ano selecionado.",
                icon: thinkingImg
            }
        }
        else if(totalBalance === 0) {
            return {
                title: "Ufaa!",
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

    },[totalBalance, totalExpenses, totalGains]);

    const relationExpensesVersusGains = useMemo(() => {
        const total = totalGains + totalExpenses;
        const percentGains = Number(((totalGains / total) * 100).toFixed(1));
        const percentExpenses = Number(((totalExpenses / total) * 100).toFixed(1));

        const data = [
            {
                name: "Entradas",
                value: totalGains,
                percent: percentGains ? percentGains : 0,
                color: '#E44C4E'
            },
            {
                name: "Saídas",
                value: totalExpenses,
                percent: percentExpenses ? percentExpenses : 0,
                color: '#F7931B'
            }            
        ];

        return data;
    },[totalGains, totalExpenses]);

    const historyData = useMemo(() => {
        return listOfMonths.map((_, month) => {
            let amountEntry = 0;
            gains.forEach(gain => {
                const date = new Date(gain.date);
                const gainMonth = date.getMonth();
                const gainYear = date.getFullYear();

                if(gainMonth === month && gainYear === selectedYear) {
                    try {
                        amountEntry += Number(gain.amount);
                    }
                    catch {
                        throw new Error("amountEntryu is invalid. amountEntry must be valid number.");
                    }
                }
            });

            let amountOutput = 0;
            expenses.forEach(expense => {
                const date = new Date(expense.date);
                const expenseMonth = date.getMonth();
                const expenseYear = date.getFullYear();

                if(expenseMonth === month && expenseYear === selectedYear) {
                    try {
                        amountOutput += Number(expense.amount);
                    }
                    catch {
                        throw new Error("amountOutputu is invalid. amountOutput must be valid number.");
                    }
                }
            });
            
            return {
                monthNumber: month,
                month: listOfMonths[month].substr(0, 3),
                amountEntry,
                amountOutput
            }
        })
        .filter(item => {
            const currentMonth = new Date().getMonth();
            const currentYear = new Date().getFullYear();
            return (selectedYear === currentYear && item.monthNumber <= currentMonth) || (selectedYear < currentYear);
        });
    },[selectedYear]);

    const relationExpensevesRecurrentVersusEventual = useMemo(() => {
        let amountRecurrent = 0;
        let amountEventual = 0;

        expenses.filter((expense) => {
            const date = new Date(expense.date);
            const month = date.getMonth()+1;
            const year = date.getFullYear();

            return month === selectedMonth && year === selectedYear;
        })
        .forEach(expense => {
            if(expense.frequency === 'recorrente') {
                return amountRecurrent += Number(expense.amount);
            }
            if(expense.frequency === 'eventual') {
                return amountEventual += Number(expense.amount);
            }            
        })

        const total = amountRecurrent + amountEventual;
        const percentRecurrent = Number(((amountRecurrent / total) * 100).toFixed(1));
        const percentEventual = Number(((amountEventual / total) * 100).toFixed(1));
        return [
            {
                name: 'Recorrentes',
                amount: amountRecurrent,
                percent: percentRecurrent ? percentRecurrent : 0,
                color: "#F7931B"
            },
            {
                name: 'Eventuais',
                amount: amountEventual,
                percent: percentEventual ? percentEventual : 0,
                color: "#E44C4E"
            }            
        ];
    },[selectedMonth, selectedYear]);

    const relationGainsRecurrentVersusEventual = useMemo(() => {
        let amountRecurrent = 0;
        let amountEventual = 0;

        gains.filter((gain) => {
            const date = new Date(gain.date);
            const month = date.getMonth()+1;
            const year = date.getFullYear();

            return month === selectedMonth && year === selectedYear;
        })
        .forEach(gain => {
            if(gain.frequency === 'recorrente') {
                return amountRecurrent += Number(gain.amount);
            }
            if(gain.frequency === 'eventual') {
                return amountEventual += Number(gain.amount);
            }            
        })

        const total = amountRecurrent + amountEventual;
        const recurrentPercent = Number(((amountRecurrent / total) * 100).toFixed(1));
        const eventualPercent = Number(((amountRecurrent / total) * 100).toFixed(1));
        return [
            {
                name: 'Recorrentes',
                amount: amountRecurrent,
                percent: recurrentPercent ? recurrentPercent : 0,
                color: "#F7931B"
            },
            {
                name: 'Eventuais',
                amount: amountEventual,
                percent: eventualPercent ? eventualPercent : 0,
                color: "#E44C4E"
            }            
        ];
    },[selectedMonth, selectedYear]);    

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
                    icon={messege.icon}
                />

                <PieChartBox data={relationExpensesVersusGains} />

                <HistoryBox
                    data={historyData}
                    lineColorAmountEntry="#F7931B"
                    lineColorAmountOutput="#E44C4E"
                />

                <BarChartBox
                    title="Saídas"
                    data={relationExpensevesRecurrentVersusEventual}
                />

                <BarChartBox
                    title="Entradas"
                    data={relationGainsRecurrentVersusEventual}
                />

                <InputCKEditor
                    label="Texto Rico"
                    name="textoRico"
                    onChange={(value:string) => setRichText(value)}
                    value={richText}
                />
            </Content>
        </Container>
    );
}

export default Dashboard;
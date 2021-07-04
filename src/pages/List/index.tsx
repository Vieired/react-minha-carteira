import React, { useMemo, useState, useEffect } from 'react';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';

import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';
import formatCurrency from '../../utils/formatCurrency';
import formatDate from '../../utils/formatDate';
import listOfMonths from '../../utils/months';

import { Container, Content, Filters } from './styles';

interface IRouteParams {
    match: {
        params: {
            type: string;
        }
    }
}

interface IData {
    id: string;
    description: string;
    amounFormatted: string;
    frequency: string;
    dateFormatted: string;
    tagColor: string;
}

const List: React.FC<IRouteParams> = ({ match }) => {
    const [data, setData] = useState<IData[]>([]);
    const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth()+1);
    // const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
    const [selectedYear, setSelectedYear] = useState<number>(2020);
    const [frequencyFilterSelected, setFrequencyFilterSelected] = useState(['recorrente','eventual']);
    console.log(selectedYear);
    const movimentType = match.params.type;

    const pageData = useMemo(() => {
        return movimentType === 'entry-balance' ?
        {
            title: 'Entradas',
            lineColor: '#F7931B',
            data: gains
        } : {
            title: 'Saídas',
            lineColor: '#E44C4E',
            data: expenses
        }
    },[movimentType]);

    const years = useMemo(() => {
        let uniqueYears: number[] = [];

        const { data } = pageData;

        data.forEach(item => {
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
    },[pageData]);

    const months = useMemo(() => {
        return listOfMonths.map((month, index) => {
            return {
                value: index + 1,
                label: month,
            }
        });
    },[]);

    const handleFrequencyClick = (frequency: string) => {
        const alreadySelected = frequencyFilterSelected.findIndex(item => item === frequency);

        if(alreadySelected >= 0) {
            const filtered = frequencyFilterSelected.filter(item => item !== frequency);
            setFrequencyFilterSelected(filtered);
        } else {
            setFrequencyFilterSelected((prev) => [ ...prev, frequency])
        }
    }

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

    useEffect(() => {
        const { data } = pageData;
        const filteredData = data.filter(item => {
            const date = new Date(item.date),
                month = date.getMonth()+1,
                year = date.getFullYear();
            return month === selectedMonth 
                && year === selectedYear 
                && frequencyFilterSelected.includes(item.frequency);
        });

        const formattedDate = filteredData.map(item => {
            return {
                id: String(new Date().getTime()) + String(Math.random() * data.length),
                description: item.description,
                amounFormatted: formatCurrency(Number(item.amount)),
                frequency: item.frequency,
                dateFormatted: formatDate(item.date),
                tagColor: item.frequency === 'recorrente' ? '#4E41F0' : '#E44C4E'
            }
        })

        setData(formattedDate);
    }, [pageData, selectedMonth, selectedYear, data.length, frequencyFilterSelected]);

    return (
        <Container>
            <ContentHeader title={pageData.title} lineColor={pageData.lineColor}>
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

            <Filters>
                <button
                    type="button"
                    className={`tag-filter tag-filter-recurrent 
                                ${frequencyFilterSelected.includes('recorrente') 
                                && 'tag-actived'}`}
                    onClick={() => handleFrequencyClick('recorrente')}
                >
                    Recorrentes
                </button>
                <button
                    type="button"
                    className={`tag-filter tag-filter-eventual 
                                ${frequencyFilterSelected.includes('eventual') 
                                && 'tag-actived'}`}
                    onClick={() => handleFrequencyClick('eventual')}
                >
                    Eventuais
                </button>                    
            </Filters>

            <Content>
                {
                    data.map(item => (
                        <HistoryFinanceCard
                            key={item.id}
                            tagColor={item.tagColor}
                            title={item.description}
                            subtitle={item.dateFormatted}
                            amount={item.amounFormatted}
                        />
                    ))
                }
            </Content>
        </Container>
    );
}

export default List;
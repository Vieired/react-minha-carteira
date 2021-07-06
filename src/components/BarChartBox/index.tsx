import React from 'react';
import {
    Bar,
    BarChart,
    Cell,
    ResponsiveContainer,
    Tooltip
} from 'recharts';
import formatCurrency from '../../utils/formatCurrency';
import {
    Container,
    Legend,
    LegendContainer,
    SideLeft,
    SideRight
} from './styles';


interface IBarChartBoxProps {
    title: string;
    data: {
        name: string;
        amount: number;
        percent: number;
        color: string;
    }[];
}

const BarChartBox: React.FC<IBarChartBoxProps> = ({
    title, data
}) => {
    return (
        <Container>

            <SideLeft>
                <h2>{title}</h2>
                <LegendContainer>
                    {data.map(indicator => (
                        <Legend color={indicator.color} key={indicator.name}>
                            <div>{indicator.percent}%</div>
                            <span>{indicator.name}</span>
                        </Legend>
                    ))}
                </LegendContainer>                
            </SideLeft>

            <SideRight>
                <ResponsiveContainer>
                    <BarChart data={data}>
                        <Bar dataKey="amount" name="Valor">
                            {data.map(indicator => (
                                <Cell
                                    key={indicator.name}
                                    cursor="pointer"
                                    fill={indicator.color}
                                    
                                />
                            ))}
                        </Bar>
                        <Tooltip
                            formatter={(value:number) => formatCurrency(value)}
                            cursor={{fill:'none'}}/>
                    </BarChart>
                </ResponsiveContainer>
            </SideRight>

        </Container>
    );
}

export default BarChartBox;
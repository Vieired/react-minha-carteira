import { useState } from 'react';
import TableAntDesign from '../../../components/TableAntDesign';
import { ColumnsType } from 'antd/es/table';
import { IPeople, IResponseStarships } from '../../../shared/models/StarWars';
import {
    FaChevronDown as CaretDown,
    FaChevronLeft as CaretLeft
} from 'react-icons/fa';
import { Container } from './styles';

interface Props {
    item: IResponseStarships;
}

const StarshipLI: React.FC<Props> = ({item}) => {

    const [toggle, setToggle] = useState<boolean>(false);

    const columns: ColumnsType<IPeople[]> = [
        {
            title: 'Piloto',
            dataIndex: 'name',
            key: 'name',
        },        
        // {
        //     title: 'Gênero',
        //     dataIndex: 'gender',
        //     key: 'gender',
        // },
    ];

    return (
        <Container>
            <button
                title={item.data.manufacturer}
                onClick={() => setToggle(prevState => !prevState)}
            >
                <p>{item.data.name} ({item.data.starship_class})</p>
                <span>{toggle ? <CaretLeft/> : <CaretDown/>}</span>
            </button>
            {item?.data?.pilots && item.data.pilots.length > 0 && (
                <div className={toggle ? "open" : ""}>
                    <TableAntDesign
                        columns={columns}
                        dataSource={item.data.pilots?.map((pilot:string,_) => {
                            return {
                                id:_,
                                name: pilot,
                            }
                        }) || []}
                        
                    />
                </div>
            )}
        </Container>
    )
};

export default StarshipLI;
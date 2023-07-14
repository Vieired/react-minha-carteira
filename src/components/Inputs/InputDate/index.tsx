import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import ptBR from 'date-fns/locale/pt-BR';

import { Container } from "./styles";

interface Props {
    value?: string | number;
    label?: string;
    id?: string;
    name: string;
    placeholder?: string;
    disabled?: boolean;
    readOnly?: boolean;
    noDefaultDate?: boolean;
    defaultDate?: Date;
    errorText?: string;
    fit?: boolean;
    selected: string | undefined;
    onSelect?: (date: any) => void;
    onChange?: (date: any) => void;
    onBlur?(e: React.FocusEvent<unknown>): void;
}

const InputDate: React.FC<Props> = ({
    id,
    name,
    label,
    placeholder = 'Dia/Mês/Ano',
    disabled = false,
    readOnly = false,
    noDefaultDate = false,
    defaultDate = new Date(),
    errorText,
    fit = false,
    selected = undefined,
    onSelect,
    onChange,
    onBlur
}) => {
    registerLocale('pt-BR', ptBR);
    setDefaultLocale('pt-BR');

    function handleDateValue(date: string | undefined) {
        if (!date) return null;
    
        return null;
    }

    // function handleChange(date: Date) {
    //     // try {
    //     //     const dateFormat = formatDate(date, 'yyyy-MM-dd');
    //     //     onChange(dateStr);
    //     // } catch {
    //     //     onChange('');
    //     // }

    //     const dateStr = date.toISOString();
    //     onChange(dateStr);
    // }    

    return (
        <Container>
            { label && <label htmlFor={id}>{label}</label> }
            <div>
                <p>Componente desativado: Instalar dependências do react-datepicker para usá-lo.</p>
                <DatePicker
                    id={id}
                    name={name}
                    locale='pt-BR'
                    selected={handleDateValue(selected)}
                    // onSelect={(date: Date) => handleSelected(date)}
                    onSelect={() => onSelect}
                    onChange={() => onChange}
                    // onChange={handleChange}
                    placeholderText={placeholder}
                    disabled={disabled}
                    readOnly={readOnly}
                    dateFormat="dd/MM/yyyy"
                    isClearable={!readOnly}
                    autoComplete="off"
                    aria-label={label || `Campo de data`}
                />
            </div>
            { (!fit || (fit && errorText)) && <small role="alert">{errorText}</small> }
        </Container>
    );
}

export default InputDate;



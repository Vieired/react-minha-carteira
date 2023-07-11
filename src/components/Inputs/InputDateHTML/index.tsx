import { Container } from "./styles";

interface Props {
    value: string;
    label?: string;
    id?: string;
    name: string;
    placeholder?: string;
    disabled?: boolean;
    readOnly?: boolean;
    errorText?: string;
    fit?: boolean;
    onChange?(date: React.ChangeEvent<HTMLInputElement>): void;
    className?: string;
    onBlur?(e: React.FocusEvent<unknown>): void;
}

const InputDateHTML: React.FC<Props> = ({
    value,
    id,
    name,
    label,
    placeholder = 'Dia/Mês/Ano',
    disabled = false,
    readOnly = false,
    errorText,
    fit = false,
    onChange,
    className = '',
    onBlur,
}) => { 

    const handleValue = (): string|undefined => {
        return value && isValidDate(value) ? (new Date(value)).toISOString().split('T')[0] : ''
    }

    const isValidDate = (dateString: string): boolean => {
        let date = new Date(dateString);
        return !isNaN(date.getTime());
    }    

    return (
        <Container>
            { label && <label htmlFor={id}>{label}</label> }
            <>
                <input
                    type="date"
                    value={handleValue()}
                    onChange={onChange}
                    autoComplete="off"
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    disabled={disabled}
                    readOnly={readOnly}
                    aria-label={label || placeholder || `Campo de data`}
                    aria-errormessage={errorText}
                    aria-invalid={errorText && errorText!=='' ? true : false}                    
                />            
            </>
            { (!fit || (fit && errorText)) && <small role="alert">{errorText}</small> }
        </Container>
    );
}

export default InputDateHTML;



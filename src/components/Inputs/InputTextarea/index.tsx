import { Container } from "./styles";

interface Props {
    value?: string | number;
    label?: string;
    id?: string;
    name?: string;
    placeholder?: string;
    maxLength?: number;
    autoComplete?: boolean;
    readOnly?: boolean;
    disabled?: boolean;
    errorText?: string;
    fit?: boolean;
    onChange?(e: React.ChangeEvent<unknown>): void;
    onBlur?(e: React.FocusEvent<unknown>): void;
}

const InputTextarea: React.FC<Props> = ({
    value = '',
    id,
    name,
    label,
    placeholder = '',
    maxLength = 100,
    autoComplete = 'off',
    readOnly = false,
    disabled = false,
    errorText,
    fit = false,
    onChange,
    onBlur
}) => {

    return (
        <Container>
            { label && <label htmlFor={id || name}>{label}</label> }
            <textarea
                value={value}
                id={id}
                name={name}
                placeholder={placeholder}
                maxLength={maxLength}
                autoComplete={autoComplete ? 'on' : 'off'}
                readOnly={readOnly}
                onChange={onChange}
                onBlur={onBlur}
                disabled={disabled}
                aria-label={label || placeholder || `Campo Área de Texto`}
                aria-errormessage={errorText}
                aria-invalid={errorText && errorText!=='' ? true : false}
            />
            { (!fit || (fit && errorText)) && <small role="alert">{errorText}</small> }
        </Container>
    );
}

export default InputTextarea;
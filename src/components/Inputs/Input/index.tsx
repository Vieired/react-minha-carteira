import { Container } from "./styles";

interface Props {
    value?: string | number;
    label?: string;
    type?: "text" | "password" | "search";
    id?: string;
    name?: string;
    className?: string;
    placeholder?: string;
    autoComplete?: boolean;
    autoFocus?: boolean;
    readOnly?: boolean;
    disabled?: boolean;
    hidden?: boolean;
    maxLength?: number;
    errorText?: string;
    fit?: boolean;
    onChange?(e: React.ChangeEvent<unknown>): void;
    onBlur?(e: React.FocusEvent<unknown>): void;
}

const Input: React.FC<Props> = ({
    value = '',
    id,
    name,
    label,
    type = 'text',
    placeholder = '',
    className = '',
    autoComplete = false,
    autoFocus = false,
    readOnly = false,
    disabled = false,
    hidden = false,
    maxLength = undefined,
    errorText,
    fit = false,
    onChange,
    onBlur
}) => {

    return (
        <Container className={className}>
            { label && <label htmlFor={id || name}>{label}</label> }
            <input
                value={(type === "text" && value == null) ? "" : value}
                id={id || name}
                name={name}
                type={type}
                placeholder={placeholder}
                autoComplete={autoComplete ? 'on' : 'off'}
                autoFocus={autoFocus}
                readOnly={readOnly}
                onChange={onChange}
                onBlur={onBlur}
                disabled={disabled}
                hidden={hidden}
                maxLength={maxLength}
                aria-label={label || placeholder || `Campo do tipo ${type}`}
                aria-errormessage={errorText}
                aria-invalid={errorText && errorText!=='' ? true : false}
            />
            { (!fit || (fit && errorText)) && <small role="alert">{errorText}</small> }
        </Container>
    );
}

export default Input;
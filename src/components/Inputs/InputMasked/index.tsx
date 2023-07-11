import InputMask from "react-input-mask";
import { Container } from "./styles";

interface Props {
    maskType: "cpf" | "cellPhone" | "int0to9999" | "int1to99";
    value?: string | number;
    label?: string;
    id?: string;
    name?: string;
    className?: string;
    placeholder?: string;
    maskPlaceholder?: string;
    // maskChar?: string;
    alwaysShowMask?: boolean;
    autoComplete?: boolean;
    autoFocus?: boolean;
    readOnly?: boolean;
    disabled?: boolean;
    hidden?: boolean;
    errorText?: string;
    fit?: boolean;
    onChange?(e: React.ChangeEvent<any>): void;
    onBlur?(e: React.FocusEvent<unknown>): void;
}

const InputMasked: React.FC<Props> = ({
    maskType,
    value = '',
    id,
    name,
    label,
    placeholder = undefined,
    maskPlaceholder = '_',
    // maskChar = '_',
    alwaysShowMask = true,
    className = '',
    autoComplete = false,
    autoFocus = false,
    readOnly = false,
    disabled = false,
    hidden = false,
    errorText,
    fit = false,
    onChange,
    onBlur
}) => {

    const clearFormatation = (value: string): string => {
        // console.log(value);

        if(maskType === "int1to99") {
            return value.replace(/<<$&>>(^([1-9][0-9]*)$)|(^0$)/g, '');
        }

        const rest = value.replace(/[^0-9]/g, '');

        // console.log("Pós limpeza: ", rest);
        return `${rest}`;
    }

    const handleChange = (evt: React.ChangeEvent<any>) => {
        // console.log(evt.target.value);
        onChange && onChange({
            ...evt,
            target: {
                ...evt.target,
                value: clearFormatation(evt.target.value),
                id,
                name
            }
        } as React.ChangeEvent<any>)
    }

    const getMaskFormat = maskType === 'cpf'
        ?
        "999.999.999-99"
        :
        maskType === 'cellPhone'
            ?
            "(99) 9 9999-9999"
            :
            maskType === 'int0to9999'
                ?
                "9999"
                // [/([1-9])|(0$)/g, /[0-9]/g, /[0-9]/g, /[0-9]/g]
                :
                maskType === 'int1to99'
                    ?
                    "99"
                    :
                    "";

    return (
        <Container className={className}>
            { label && <label htmlFor={id}>{label}</label> }
            <InputMask
                mask={getMaskFormat}
                value={value.toString()}
                id={id}
                name={name}
                type="text"
                placeholder={placeholder}
                maskPlaceholder={maskPlaceholder}
                // maskChar={maskChar}
                alwaysShowMask={alwaysShowMask}
                autoComplete={autoComplete ? 'on' : 'off'}
                autoFocus={autoFocus}
                readOnly={readOnly}
                onChange={onChange && handleChange}
                onBlur={onBlur}
                disabled={disabled}
                hidden={hidden}
                aria-label={label || placeholder || 'Campo com formatação'}
                aria-errormessage={errorText}
                aria-invalid={errorText && errorText!=='' ? true : false}
            />
            { (!fit || (fit && errorText)) && <small role="alert">{errorText}</small> }
        </Container>
    );
}

export default InputMasked;
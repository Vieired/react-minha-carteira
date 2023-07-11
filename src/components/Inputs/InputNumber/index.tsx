import { Container } from "./styles";

interface Props {
    maskType?: 'int1to99' | 'int0to9999';
    value?: string | number;
    label?: string;
    id?: string;
    name?: string;
    className?: string;
    placeholder?: string;
    autoComplete?: boolean;
    autoFocus?: boolean;
    readOnly?: boolean;
    disabled?: boolean;
    hidden?: boolean;
    errorText?: string;
    fit?: boolean;
    onChange?(e: React.ChangeEvent<unknown>): void;
    onBlur?(e: React.FocusEvent<unknown>): void;
}

const InputNumber: React.FC<Props> = ({
    maskType = 'int0to9999',
    value = '',
    id,
    name,
    label,
    placeholder = '',
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

    const isNotNegative = (e:any) => {
        const env = e || window.event;
        const charCode = e.which ? e.which : e.keyCode;
        return charCode === 107 || charCode === 109 || charCode === 187 || charCode === 189
            ?
            env.preventDefault()
            :
            true
    };

    // const applyFormatation = (value: string): string => {
    //     // console.log(value);

    //     if(maskType === "int1to99") {
    //         return value.replace(/<<$&>>(^([1-9][0-9]*)$)|(^0$)/g, '');
    //     }

    //     return value.replace(/[^0-9]/g, '');
    // }
    const applyFormatation = (value: string): number => {
        // console.log(value);

        let rest = '';
        if(maskType === "int1to99") {
            rest = value.replace(/<<$&>>(^([1-9][0-9]*)$)|(^0$)/g, '');
            // rest = value.replace(/<<$&>>(^([1-9][0-9]*)$)|(^0$)/g, '');
        }

        // const rest = value.replace(/[^0-9]/g, '');
        rest = value.replace(/[^0-9]/g, '');
        // rest = value.replace(/<<$&>>(^([1-9][0-9]*)$)|(^0$)/g, '');

        // console.log("Pós limpeza: ", rest);
        return Number(rest);
        // return rest;
    }

    const handleChange = (evt: React.ChangeEvent<any>) => {
        onChange && onChange({
            ...evt,
            target: {
                ...evt.target,
                value: applyFormatation(evt.target.value),
                id,
                name
            }
        } as React.ChangeEvent<any>)
    }

    return (
        <Container className={className}>
            { label && <label htmlFor={id}>{label}</label> }
            <input
                value={value}
                id={id}
                name={name}
                type="number"
                placeholder={placeholder}
                autoComplete={autoComplete ? 'on' : 'off'}
                autoFocus={autoFocus}
                readOnly={readOnly}
                onChange={onChange && handleChange}
                onBlur={onBlur}
                onKeyDown={e => isNotNegative(e)}
                // onKeyDown={e => isNumber(e)}
                // onInput={e => isPositive(e)}
                // min='0'
                disabled={disabled}
                hidden={hidden}
                aria-label={label || placeholder || `Campo do tipo número`}
                aria-errormessage={errorText}
                aria-invalid={errorText && errorText!=='' ? true : false}
            />
            { (!fit || (fit && errorText)) && <small role="alert">{errorText}</small> }
        </Container>
    );
}

export default InputNumber;
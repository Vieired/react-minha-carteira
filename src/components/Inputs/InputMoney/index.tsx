import { useState } from "react";
import { Container } from "./styles";

interface Props {
    value?: string;
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
    maxLength?: number;
    errorText?: string;
    fit?: boolean;
    onChange?(e: React.ChangeEvent<any>): void;
    onBlur?(e: React.FocusEvent<unknown>): void;
}

const InputMoney: React.FC<Props> = ({
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
    maxLength = undefined,
    errorText,
    fit = false,
    onChange,
    onBlur
}) => {
    const [currencyValue, setCurrencyValue] = useState<string>(value);

    const convertToAmericanNumberSystem = (val: string) => {
        let newValue: string = val.replace(/\D/g,'');
        newValue = (Number(newValue)/100).toFixed(2) + '';
        newValue = newValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1');
        val = newValue;
        return newValue;
    }

    const formatMoney = (val: string) => {
        // Aplica máscara de formato monetário apenas visualmente
        // (o número no objeto deve permanecer em formato americano)

        // Mascara com formato "locale pt-BR" e "currency BRL"
        let newValue: string = val.replace(/\D/g,'');
        newValue = (Number(newValue)/100).toFixed(2) + '';
        newValue = newValue.replace(".", ",");
        newValue = newValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        val = newValue;

        // // Mascara com formato monetário "locale en" e "currency USD"
        // let newValue: string = val.replace(/\D/g,'');
        // newValue = (Number(newValue)/100).toFixed(2) + '';
        // newValue = newValue.replace(",", ".");
        // newValue = newValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        // val = newValue;

        return setCurrencyValue(newValue);
    }

    // const formatMoney = (val: string) => {
    //     // TODO: Melhorar esta função, pois ela só está aceitando até
    //     // 6 números, excluindo-se vírgulas e pontos   .     
    //     let valor: string = val + '';
    //     valor = String(parseInt(valor.replace(/[\D]+/g,'')));
    //     valor = valor + '';
    //     valor = valor.replace(/([0-9]{2})$/g, ",$1");
      
    //     if (valor.length > 6) {
    //       valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    //     }
      
    //     return setCurrencyValue(valor);
    // }

    // const formatMoney = (val: string) => {
    //     // TODO: Melhorar esta função, pois ela só está aceitando até
    //     // 11 números, excluindo-se vírgulas e pontos.
    //     let valor = val;
    //     valor=valor.replace(/\D/g,"")  //permite digitar apenas número             
    //     valor=valor.replace(/[0-9]{12}/,"inválido")   //limita pra máximo 999.999.999,99                
    //     valor=valor.replace(/(\d{1})(\d{8})$/,"$1.$2")  //coloca ponto antes dos últimos 8 dígitos     
    //     valor=valor.replace(/(\d{1})(\d{5})$/,"$1.$2")  //coloca ponto antes dos últimos 5 dígitos                
    //     valor=valor.replace(/(\d{1})(\d{1,2})$/,"$1,$2")    //coloca virgula antes dos últimos 2 dígitos                
    //     val = valor;   
      
    //     return setCurrencyValue(valor);
    // }

    const handleChange = (e: React.ChangeEvent<any>) => {
        // Converte o número puro que vem do evento para um número em formato americano
        const number = convertToAmericanNumberSystem(e.target.value);
        setCurrencyValue(number || '');
        onChange && onChange({
            ...e,
            target: {
                ...e.target,
                value: number || '',
                id,
                name
            }
        } as React.ChangeEvent<any>)        
    }    

    return (
        <Container className={className}>
            { label && <label htmlFor={id || name}>{label}</label> }
            <input
                value={currencyValue == null ? "" : currencyValue}
                id={id || name}
                name={name}
                type={"text"}
                placeholder={placeholder}
                autoComplete={autoComplete ? 'on' : 'off'}
                autoFocus={autoFocus}
                readOnly={readOnly}
                onChange={onChange && handleChange}
                onBlur={onBlur}
                onKeyUp={(e) => formatMoney(e.currentTarget.value)}
                disabled={disabled}
                hidden={hidden}
                maxLength={maxLength}
                aria-label={label || placeholder || `Campo do tipo monetário`}
                aria-errormessage={errorText}
                aria-invalid={errorText && errorText!=='' ? true : false}
            />
            { (!fit || (fit && errorText)) && <small role="alert">{errorText}</small> }
        </Container>
    );
}

export default InputMoney;
import { useEffect } from "react";
import Select, {
    AriaGuidanceProps,
    AriaOnChangeProps,
    AriaOnFocusProps,
    GroupBase
} from "react-select";

import { SelectStyles } from "../../../styles/SelectStyles";
import { Container } from "./styles";

interface DomainBinarySelectOption {
    value: boolean;
    label: string;
}

interface Props {
    formik?: any;
    defaultValue?: DomainBinarySelectOption;
    value?: boolean;
    label?: string;
    id?: string;
    name: string;
    placeholder?: string;
    disabled?: boolean;
    searchable?: boolean;
    readOnly?: boolean;
    errorText?: string;
    fit?: boolean;
    isLoading?: boolean;
    className?: string;
    onBlur?(e: React.FocusEvent<unknown>): void;
}

const InputBinarySelect: React.FC<Props> = ({
    formik,
    defaultValue = false,
    value = false,
    id,
    name,
    label,
    placeholder = 'Selecione',
    disabled = false,
    searchable = false,
    errorText,
    fit = false,
    isLoading = false,
    className = '',
    onBlur
}) => {
    
    const options: DomainBinarySelectOption[] = [
        { value: false, label: 'Não' },
        { value: true, label: 'Sim' },
    ];

    useEffect(() => {
        return () => {
            if(formik?.values && name)
                formik.setFieldValue(name, false)
        }
    }, []);

    return (
        <Container>
            { label && (
                <label id={`aria-label-${id || name}`} htmlFor={id || name}>
                    {label}
                </label>
            )}
            <div>
                <Select
                    inputId={id || name}
                    name={name}
                    aria-labelledby={`aria-label-${id || name}`}
                    value={value ? options[1] : options[0]}
                    onChange={(option: any) => {
                        formik.setFieldValue(name, option.value)
                    }}
                    defaultValue={defaultValue ? options[1] : options[0]}
                    getOptionValue={(option: DomainBinarySelectOption) => option.value.toString()}
                    getOptionLabel={(option: DomainBinarySelectOption) => option.label}
                    options={options}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    styles={SelectStyles}
                    isSearchable={searchable}
                    isDisabled={disabled}
                    isLoading={isLoading}
                    // readOnly={readOnly}
                    className={className}
                    aria-label={label || `Campo de combinação Sim ou Não`}
                    ariaLiveMessages={{
                        onFocus: (props: AriaOnFocusProps<DomainBinarySelectOption, GroupBase<DomainBinarySelectOption>>) => {
                            return `Focado em "${props.focused?.label}"${
                                props.isDisabled ? ', desabilitada.' : ''
                            } de ${props.options.length} disponíveis.`;
                        },                        
                        guidance: (props: AriaGuidanceProps) => {
                            return props.context;
                        },
                        onChange: (props: AriaOnChangeProps<DomainBinarySelectOption, false>) => {
                            return `Opção "${props.value?.label}" selecionada`
                        },
                    }}
                    aria-errormessage={errorText}
                    aria-invalid={errorText && errorText!=='' ? true : false}
                />
            </div>            
            { (!fit || (fit && errorText)) && <small role="alert">{errorText}</small> }
        </Container>
    );
}

export default InputBinarySelect;
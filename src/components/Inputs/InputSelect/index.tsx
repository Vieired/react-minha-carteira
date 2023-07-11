import {
    Ref,
    forwardRef,
    useImperativeHandle,
    useRef
} from "react";
import
    Select,
    {
        ActionMeta,
        AriaGuidanceProps,
        AriaOnChangeProps,
        AriaOnFocusProps,
        GroupBase,
        SelectInstance,
        SingleValue
    }
from "react-select";
import { SelectStyles } from "../../../styles/SelectStyles";
import { DomainSelectOption } from "../../../shared/models/Domains";
import { Container } from "./styles";

interface Props {
    refProp?: Ref<RefObject>;
    options: DomainSelectOption[];
    // filterOption: boolean;
    defaultValue?: DomainSelectOption | undefined;
    value: DomainSelectOption | undefined;
    id?: string;
    name: string;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    searchable?: boolean;
    readOnly?: boolean;
    errorText?: string;
    fit?: boolean;
    isLoading?: boolean;
    className?: string;
    onChange: (newValue: SingleValue<DomainSelectOption>, actionMeta: ActionMeta<DomainSelectOption>) => void;
    onBlur?(e: React.FocusEvent<unknown>): void;
    clearField?: () => void;
}

interface RefObject {
    clearField: () =>  void;
}

const InputSelect = forwardRef((
    {
        options,
        // filterOption = false,
        defaultValue = undefined,
        value = undefined,
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
        onChange,
        onBlur
    }: Props,
    refProp?: Ref<RefObject>
) => {
    const ref = useRef<SelectInstance<DomainSelectOption>>(null);

    const clear = (): void => {
        const selectEl = ref.current;
        if (!selectEl) return;
        selectEl.clearValue();
        console.log(`Limpou campo "${label}"`)
    };

    const clearField = () => {
        clear()
    }

    useImperativeHandle(refProp, () => ({ clearField }));

    return (
        <Container>
            { label && (
                <label id={`aria-label-${id || name}`} htmlFor={id || name}>
                    {label}
                </label>
            )}
            <div>
                <Select
                    ref={ref}
                    inputId={id || name}
                    name={name}
                    aria-labelledby={`aria-label-${id || name}`}
                    value={value}
                    onChange={onChange}
                    defaultValue={defaultValue}
                    getOptionValue={(option: DomainSelectOption) => option.value}
                    getOptionLabel={(option: DomainSelectOption) => option.label}
                    options={options}
                    // filterOption={filterOption && filterOption}
                    // filterOption={true}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    styles={{
                        ...SelectStyles,
                        control: (styles) => ({
                            ...styles,
                            borderRadius:'none', borderColor: '#949494'
                        })
                    }}
                    isSearchable={searchable}
                    isDisabled={disabled}
                    isLoading={isLoading}
                    className={className}
                    ariaLiveMessages={{
                        onFocus: (props: AriaOnFocusProps<DomainSelectOption, GroupBase<DomainSelectOption>>) => {
                            return `Focado em "${props.focused?.alt || props.focused?.label}"${
                                props.isDisabled ? ', desabilitada.' : ''
                            } de ${props.options.length} disponíveis.`;
                        },                        
                        guidance: (props: AriaGuidanceProps) => {
                            return props.context;
                        },
                        onChange: (props: AriaOnChangeProps<DomainSelectOption, false>) => {
                            return `Opção "${props.value?.alt || props.value?.label}" selecionada`
                        },
                    }}
                    aria-errormessage={errorText}
                    aria-invalid={errorText && errorText!=='' ? true : false}
                />
            </div>            
            { (!fit || (fit && errorText)) && <small role="alert">{errorText}</small> }
        </Container>
    );
});

export default InputSelect;
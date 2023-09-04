// import { FormikProps } from "formik";
import { Container } from "./styles";

interface Props {
    // formik: FormikProps<any>;
    id?: string;
    name: string;
    label?: string;
    defaultChecked?: boolean;
    disabled?: boolean;
    errorText?: string;
    fit?: boolean;
    onChange?(e: React.ChangeEvent<unknown>): void;
    onBlur?(e: React.FocusEvent<unknown>): void;    
}

const InputCheckbox: React.FC<Props> = ({
    id,
    name,
    label,
    defaultChecked = false,
    disabled = false,
    errorText,
    fit = false,
    onChange,
    onBlur
}) => {
    // const handleCheckboxChange = (field: string, checked: any) => {
    //     // console.log(field, checked);
    //     formik.setFieldValue(field, checked);
    // };

    return (
        <Container>
            <span>
                <input
                    type="checkbox"
                    id={id || name}
                    name={name ?? id}
                    // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    //     handleCheckboxChange(name, e.target.checked)}
                    onChange={onChange}
                    onBlur={onBlur}
                    defaultChecked={defaultChecked}
                    disabled={disabled}
                    aria-label={label || `Checkbox Field`}
                    aria-errormessage={errorText}
                    aria-invalid={errorText && errorText!=='' ? true : false}
                />
                { label && <label htmlFor={id || name}>{label}</label> }
            </span>
            { (!fit || (fit && errorText)) && <small role="alert">{errorText}</small> }
        </Container>
    );
}

export default InputCheckbox;
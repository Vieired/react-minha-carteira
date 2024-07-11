import { useState } from "react";
import { useHistory } from "react-router-dom";

import { useFormik } from "formik";
import { SingleValue } from "react-select";
import { toast } from "react-toastify";

import { useBudget } from "../../../hooks/BudgetContext";
import { BudgetItem } from "../../../shared/models/Budget";
import { DomainSelectOption } from "../../../shared/models/Domains";
import { BUDGETS_FREQUENCY, BUDGETS_TYPE } from "../../../shared/consts";
import Button from "../../../components/Inputs/Button";
import ContentHeader from "../../../components/ContentHeader";
import Input from "../../../components/Inputs/Input";
import InputMoney from "../../../components/Inputs/InputMoney";
import InputDateHTML from "../../../components/Inputs/InputDateHTML";
import InputSelect from "../../../components/Inputs/InputSelect";
import InputCKEditor from "../../../components/InputCKEditor";
import schema from "./schema";
import { Buttons, Container } from "./styles";

const AddBudget: React.FC = () => {

    const { push } = useHistory();
    const { addOrEdit } = useBudget();

    const [isLoadingSend, setIsLoadingEdit] = useState<boolean>(false);

    const handleSubmit = (data: BudgetItem) => {
        setIsLoadingEdit(true);
        addOrEdit(data, handleCancelClick);
    }

    const formik = useFormik({
        onSubmit: handleSubmit,
        validationSchema: schema,
        enableReinitialize: true,
        initialValues: {
            amount: '0.00',
            date: '2023-07-10',
            description: '',
            frequency: '',
            type: '',
            // details: '',
        } as BudgetItem
    });

    const handleCancelClick = () => {
        push('/budget')
    }

    const getErrorMessage = (fieldName: string): string | undefined => {
        if(formik.isSubmitting && !formik.isValid){
            toast.error("Verifique os campos obrigatórios.", {
                toastId: 'invalid-form-field'
            });
        }

        return (formik?.getFieldMeta(fieldName)?.touched &&
                formik?.getFieldMeta(fieldName)?.error)
            ?
            formik.getFieldMeta(fieldName).error
            :
            ''
    }

    return (
        <Container
            className={isLoadingSend ? "loading-send" : ""}
        >
            <ContentHeader
                title="Cadastrar Orçamento"
                lineColor="#F7931B"
            />
            <form onSubmit={formik.handleSubmit}>
                <Input
                    id="description"
                    name="description"
                    label="Descrição *"
                    placeholder="Descrição"
                    value={formik?.values?.description}
                    onChange={formik?.handleChange}
                    autoFocus
                    errorText={getErrorMessage('description')}
                />
                <InputMoney
                    id="amount"
                    name="amount"
                    label="Valor *"
                    maxLength={13}
                    placeholder="0,00"
                    value={formik?.values?.amount}
                    // value={String(formik?.values?.amount)}
                    onChange={formik?.handleChange}
                    errorText={getErrorMessage('amount')}
                />
                <InputSelect
                    name="type"
                    label="Tipo"
                    value={
                        formik?.values
                        ? 
                        BUDGETS_TYPE.find((x: DomainSelectOption) =>
                            x?.value?.toString() === formik?.values['type']?.toString()
                        )
                        :
                        undefined
                    }
                    onChange={(e:SingleValue<DomainSelectOption>) => {
                        formik.setFieldValue('type', e?.value);
                    }}
                    options={BUDGETS_TYPE}
                    searchable
                    // errorText={getErrorMessage('type')}
                />
                <InputSelect
                    name="frequency"
                    label="Frequência"
                    value={
                        formik?.values
                        ? 
                        BUDGETS_FREQUENCY.find((x: DomainSelectOption) =>
                            x?.value?.toString() === formik?.values['frequency']?.toString()
                        )
                        :
                        undefined
                    }
                    onChange={(e:SingleValue<DomainSelectOption>) => {
                        formik.setFieldValue('frequency', e?.value);
                    }}
                    options={BUDGETS_FREQUENCY}
                    searchable
                    // errorText={getErrorMessage('frequency')}
                />
                <InputDateHTML
                    label="Data de Nascimento *"
                    id="date"
                    name="date"
                    value={formik?.values?.date || ''}
                    onChange={formik?.handleChange}
                    errorText={
                        formik?.touched?.date && formik?.errors?.date
                        ? formik?.errors?.date
                        : undefined
                    }
                />
                <InputCKEditor
                    label="Detalhes"
                    name="details"
                    value={formik?.values?.details}
                    onChange={formik?.handleChange}
                />
                
                <Buttons>
                    <Button
                        type="button"
                        btnTheme="secondary"
                        onClick={handleCancelClick}
                    >
                        Cancelar
                    </Button>
                    <Button type="submit" btnTheme="primary">Salvar</Button>
                </Buttons>
            </form>
        </Container>
    )
}

export default AddBudget;
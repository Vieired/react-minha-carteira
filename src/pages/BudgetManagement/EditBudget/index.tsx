import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useFormik } from "formik";

import { useBudget } from "../../../hooks/BudgetContext";
import { BudgetItem } from "../../../shared/models/Budget";
import Button from "../../../components/Inputs/Button";
import ContentHeader from "../../../components/ContentHeader";
import Input from "../../../components/Inputs/Input";
import InputMoney from "../../../components/Inputs/InputMoney";
// import InputDate from "../../../components/Inputs/InputDate";
import InputDateHTML from "../../../components/Inputs/InputDateHTML";

import { Buttons, Container } from "./styles";
import InputSelect from "../../../components/Inputs/InputSelect";
import { SingleValue } from "react-select";
import { DomainSelectOption } from "../../../shared/models/Domains";
import { BUDGETS_TYPE } from "../../../shared/consts";

const EditBudget: React.FC = () => {

    const { push } = useHistory();
    const { id } = useParams<BudgetItem>();
    // const [selectedDate, setSelectedDate] = useState<string|undefined>(undefined);
    const {
        budgetItemEditing,
        getBudgetItemById,
        edit,
    } = useBudget();

    const handleSubmit = (data: BudgetItem) => {
        console.log(data);
        edit(data);
    }

    const formik = useFormik({
        onSubmit: handleSubmit,
        enableReinitialize: true,
        initialValues: budgetItemEditing as BudgetItem
    });

    const handleCancelClick = () => {
        push('/budget')
    }

    // const handleSelected = (date: Date) => {
    //     const dateStr = date.toISOString();
    //     setSelectedDate(dateStr);
    // }
    // const handleDateChange = (fieldName: string, date: Date) => {
    //     const dateStr = date.toISOString();
    //     formik.setFieldValue(fieldName, dateStr);
    //     setSelectedDate(dateStr);
    // }

    // const getErrorMessage = (fieldName: string): string | undefined => {
    //     if(formik.isSubmitting && !formik.isValid){
    //         toast.error("Verifique os campos obrigatórios.", {
    //             toastId: customId
    //         });
    //     }

    //     return (formik?.getFieldMeta(fieldName)?.touched &&
    //             formik?.getFieldMeta(fieldName)?.error)
    //         ?
    //         formik.getFieldMeta(fieldName).error
    //         :
    //         ''
    // }

    useEffect(() => {
        // if(!budgetItemEditing) {
            let idParam: number = 0;
            if(id?.includes(':')) {
                idParam = Number(id?.split(':')[1]);
            } else {
                idParam = Number(id);
            }        
            
            getBudgetItemById(idParam)
        // }
    },[]);

    return (
        <Container>
            <ContentHeader
                title="Editar Orçamento"
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
                    errorText={
                        formik?.touched?.description && formik?.errors?.description
                        ? formik?.errors?.description
                        : undefined
                    }
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
                    errorText={
                        formik?.touched?.amount && formik?.errors?.amount
                        ? formik?.errors?.amount
                        : undefined
                    }
                />
                {/* <InputNumber
                    maskType="money"
                    id="amount"
                    name="amount"
                    label="Valor *"
                    placeholder="0,00"
                    value={formik?.values?.amount}
                    onChange={formik?.handleChange}
                    errorText={
                        formik?.touched?.amount && formik?.errors?.amount
                        ? formik?.errors?.amount
                        : undefined
                    }
                /> */}
                {/* <Input
                    id="type"
                    name="type"
                    label="Tipo *"
                    placeholder="Tipo"
                    value={formik?.values?.type}
                    onChange={formik?.handleChange}
                    autoFocus
                    errorText={
                        formik?.touched?.type && formik?.errors?.type
                        ? formik?.errors?.type
                        : undefined
                    }
                /> */}
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
                <Input
                    id="frequency"
                    name="frequency"
                    label="Frequência *"
                    placeholder="Frequência"
                    value={formik?.values?.frequency}
                    onChange={formik?.handleChange}
                    autoFocus
                    errorText={
                        formik?.touched?.frequency && formik?.errors?.frequency
                        ? formik?.errors?.frequency
                        : undefined
                    }
                />
                <InputDateHTML
                    label="Data de Nascimento"
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
                {/* <Input
                    id="date"
                    name="date"
                    label="Data *"
                    placeholder="Data"
                    value={formik?.values?.date}
                    onChange={formik?.handleChange}
                    autoFocus
                    errorText={
                        formik?.touched?.date && formik?.errors?.date
                        ? formik?.errors?.date
                        : undefined
                    }
                /> */}
                {/* <InputDate
                    id="date"
                    name="date"
                    label="Data *"
                    placeholder="Data"
                    selected={selectedDate}
                    onSelect={date => handleSelected(date)}
                    onChange={date => handleDateChange('dataNascimento', date)}
                    noDefaultDate               
                /> */}
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

export default EditBudget;
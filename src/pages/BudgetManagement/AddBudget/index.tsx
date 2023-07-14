import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { SingleValue } from "react-select";

import { BudgetItem } from "../../../shared/models/Budget";
import { DomainSelectOption } from "../../../shared/models/Domains";
import { BUDGETS_FREQUENCY, BUDGETS_TYPE } from "../../../shared/consts";
import Button from "../../../components/Inputs/Button";
import ContentHeader from "../../../components/ContentHeader";
import Input from "../../../components/Inputs/Input";
import InputMoney from "../../../components/Inputs/InputMoney";
import InputDateHTML from "../../../components/Inputs/InputDateHTML";
import InputSelect from "../../../components/Inputs/InputSelect";

import { Buttons, Container } from "./styles";

const AddBudget: React.FC = () => {

    const { push } = useHistory();

    const handleSubmit = (data: BudgetItem) => {
        console.log(data)
    }

    const formik = useFormik({
        onSubmit: handleSubmit,
        enableReinitialize: true,
        initialValues: {
            amount: '0.00',
            date: '2023-07-10',
            description: '',
            frequency: '',
            type: ''
        } as BudgetItem
    });

    const handleCancelClick = () => {
        push('/budget')
    }

    return (
        <Container>
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
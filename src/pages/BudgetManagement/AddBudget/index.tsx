import { useHistory } from "react-router-dom";
import { useFormik } from "formik";

import { BudgetItem } from "../../../shared/models/Budget";
import Button from "../../../components/Inputs/Button";
import ContentHeader from "../../../components/ContentHeader";
import Input from "../../../components/Inputs/Input";
import InputMoney from "../../../components/Inputs/InputMoney";

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
                <Input
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
                <Input
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
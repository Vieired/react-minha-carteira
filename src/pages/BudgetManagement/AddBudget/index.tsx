import { useFormik } from "formik";

import { Container } from "./styles";
import { BudgetItem } from "../../../shared/models/Budget";
import Button from "../../../components/Button";
import ContentHeader from "../../../components/ContentHeader";
import Input from "../../../components/Inputs/Input";
import InputMoney from "../../../components/Inputs/InputMoney";

const AddBudget: React.FC = () => {

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

    return (
        <Container>
            <ContentHeader
                title="Cadastro de Orçamentos"
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
                <Button type="submit">Cadastrar</Button>
            </form>
        </Container>
    )
}

export default AddBudget;
import {
    useEffect,
    useMemo,
    // useState,
} from "react";
import { useHistory, useParams } from "react-router-dom";

import { useFormik } from "formik";
import { SingleValue } from "react-select";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { toast } from "react-toastify";

import { BUDGETS_FREQUENCY, BUDGETS_TYPE } from "../../../shared/consts";
import { useBudget } from "../../../hooks/BudgetContext";
import { BudgetItem } from "../../../shared/models/Budget";
import { DomainSelectOption } from "../../../shared/models/Domains";
import Button from "../../../components/Inputs/Button";
import ContentHeader from "../../../components/ContentHeader";
import Input from "../../../components/Inputs/Input";
import InputMoney from "../../../components/Inputs/InputMoney";
// import InputDate from "../../../components/Inputs/InputDate";
import InputDateHTML from "../../../components/Inputs/InputDateHTML";
import InputSelect from "../../../components/Inputs/InputSelect";
import InputCKEditor from "../../../components/InputCKEditor";
// import { BigSpinner } from "../../../components/BigSpinner";
import schema from "./schema";
import { Buttons, Container } from "./styles";

const EditBudget: React.FC = () => {

    // const InputCKEditor = lazy(() => import('../../../components/InputCKEditor'));

    const { push } = useHistory();
    const { id } = useParams<BudgetItem>();
    // const [selectedDate, setSelectedDate] = useState<string|undefined>(undefined);
    const {
        isLoadingEditForm,
        budgetItemEditing,
        getBudgetItemById,
        clearBudgetItem,
        addOrEdit,
    } = useBudget();

    // const [ready, setReady] = useState<boolean>(false);

    const isLoading = useMemo(() => {
        return !budgetItemEditing
            || isLoadingEditForm
            // || !ready
    },[
        budgetItemEditing,
        isLoadingEditForm,
        // ready,
    ]);

    const handleSubmit = (data: BudgetItem) => {
        // console.log(data);
        addOrEdit(data, handleCancelClick);
    }

    const formik = useFormik({
        onSubmit: handleSubmit,
        validationSchema: schema,
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

    useEffect(() => {
        // console.log("id params: ", id);
        // if(!budgetItemEditing) {
            // let idParam: number = 0;
            // if(id?.includes(':')) {
            //     idParam = Number(id?.split(':')[1]);
            // } else {
            //     idParam = Number(id);
            // }
            // getBudgetItemById(idParam)
        // }

        // if(id)
        getBudgetItemById(Number(id))
    },[getBudgetItemById, id]);

    // useEffect(() => {
    //     if(budgetItemEditing) {
    //         setReady(true)
    //     }
    // },[budgetItemEditing]);

    useEffect(() => {
        return () => {
            formik.resetForm();
            clearBudgetItem();
        };
    }, []);

    // if(!isLoading) {
    //     return <BigSpinner/>
    // }

    return (
        <Container
            // onClick={() => setReady(prevState => !prevState)}
        >
            <ContentHeader
                title="Editar Orçamento"
                lineColor="#F7931B"
            />
            <form onSubmit={formik.handleSubmit}>
                {isLoading && (
                    <div style={{gap:'8px'}}>
                        <Skeleton
                            height={65}
                            inline={false}
                            baseColor="#ffffff14"
                            highlightColor="#f5f5f5db"
                        />
                        <br/>
                        <Skeleton
                            height={65}
                            inline={false}
                            baseColor="#ffffff14"
                            highlightColor="#f5f5f5db"
                        />
                        <br/>
                        <Skeleton
                            height={65}
                            inline={false}
                            baseColor="#ffffff14"
                            highlightColor="#f5f5f5db"
                        />
                        <br/>
                        <Skeleton
                            height={65}
                            inline={false}
                            baseColor="#ffffff14"
                            highlightColor="#f5f5f5db"
                        />
                        <br/>
                        <Skeleton
                            height={65}
                            inline={false}
                            baseColor="#ffffff14"
                            highlightColor="#f5f5f5db"
                        />
                        <br/>
                        <Skeleton
                            height={545}
                            inline={false}
                            baseColor="#ffffff14"
                            highlightColor="#f5f5f5db"
                        />                                                                                                                        
                    </div>
                )}
                {!isLoading && (
                    <>
                        <Input
                            id="description"
                            name="description"
                            label="Descrição *"
                            placeholder="Descrição"
                            value={formik?.values?.description}
                            onChange={formik?.handleChange}
                            autoFocus
                            errorText={getErrorMessage('description')}
                            // errorText={
                            //     formik?.touched?.description && formik?.errors?.description
                            //     ? formik?.errors?.description
                            //     : undefined
                            // }
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
                            // errorText={
                            //     formik?.touched?.amount && formik?.errors?.amount
                            //     ? formik?.errors?.amount
                            //     : undefined
                            // }
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

                        <InputCKEditor
                            label="Detalhes"
                            // id="details"
                            name="details"
                            // value={formik?.values?.details || ""}
                            value={formik?.values?.details}
                            onChange={formik?.handleChange}
                        />
                    </>
                )}

                <Buttons>
                    <Button
                        type="button"
                        btnTheme="secondary"
                        onClick={handleCancelClick}
                        disabled={isLoading}
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        btnTheme="primary"
                        disabled={isLoading}
                    >
                        Salvar
                    </Button>
                </Buttons>
            </form>
        </Container>
    )
}

export default EditBudget;
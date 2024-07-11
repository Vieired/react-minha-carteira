import * as yup from 'yup';

const schema = yup.object().shape({
    description: yup.string().min(3, 'Minimum 3 characters')
        .max(100, 'Maximum 500 characters').required(),
    amount: yup.number().required(),
});

export default schema;

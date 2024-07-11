import * as yup from 'yup';

const schema = yup.object().shape({
    description: yup.string().min(3, 'Minimum 3 characters')
        .max(100, 'Maximum 500 characters').required(),
    amount: yup.number().required(),
//   domain: yup.string().min(3, 'Minimum 3 characters')
//     .max(100, 'Maximum 500 characters').required(),
//   address1: yup.string().min(3, 'Minimum 3 characters')
//     .max(300, 'Maximum 300 characters').required(),
//   city: yup.string().min(3, 'Minimum 3 characters')
//     .required().required(),
//   province: yup.string().min(3, 'Minimum 3 characters')
//     .required().required(),
//   contactEmail: yup.string().email().required(),
//   accountingContactEmail: yup.string().email().required(),
//   markupPercentage: yup.number().required(),
});

export default schema;

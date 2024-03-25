import * as yup from 'yup'

const FormSchema = yup.object({
    name: yup.string().required('فیلد نام متغیر خالی می باشد'),
    key: yup.string().required('فیلد کلید متغیر خالی می باشد'),
    body: yup.string().required('فیلد دیتا متغیر خالی می باشد'),
    information: yup.string().required('فیلد تعریف متغیر خالی می باشد'),
})


export {
    FormSchema
}
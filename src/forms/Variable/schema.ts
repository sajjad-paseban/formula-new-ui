import * as yup from 'yup'


export const FormSchema = yup.object({
    name: yup.string().required('فیلد نام متغیر خالی می باشد'),
    type: yup.number().required('گزینه برای فیلد نوع متغیر انتخاب کنید'),
})
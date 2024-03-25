import Swal from 'sweetalert2'
import { ToastMessage } from './enums';
export function Toast(){
    return Swal.mixin({
        toast: true,
        position: 'bottom-left',
        showConfirmButton: false,
        timer: 8000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    })
}

export function messages(ToastMessageType: ToastMessage){
    switch(ToastMessageType){   
        case ToastMessage.ServerError:  
            Toast().fire({title: 'خطا در برقراری ارتباط با سرور', icon: 'error'})
            return;
        case ToastMessage.Success:  
            Toast().fire({title: 'عملیات با موفقیت انجام شد', icon: 'success'})
            return;
    }
}
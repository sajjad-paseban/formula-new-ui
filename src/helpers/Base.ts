/* eslint-disable */

export const checkVariableName = (event: any)=>{

    const name = event.target.value;
    const NormalNumbers: any = ["1","2","3","4","5","6","7","8","9","0"];
    const LowerCase: any = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    const UpperCase: any = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

    // stop typing when the user starts name of variable with a number
    if(event.target.value.length == 0 && NormalNumbers.includes(event.key)){
        event.preventDefault();
    }
    // stop typing when the user types something out of defined range
    if(!(LowerCase.includes(event.key) || UpperCase.includes(event.key) || NormalNumbers.includes(event.key))){
        event.preventDefault();
    }
}

export function handleNumber(e: any){
    let persianNumbers = ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۰"]
    let normalNumbers = ["1","2","3","4","5","6","7","8","9","0","-"]
    if(!(normalNumbers.includes(e.key) || persianNumbers.includes(e.key)))
        e.preventDefault()

}
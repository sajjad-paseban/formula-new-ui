/* eslint-disable */


import { defineStore } from "pinia";
import { ref } from "vue";

interface IParamsParameter{
    id?: string,
    nickname?: string,
    information?: string,
    value?: string
}
interface IValueParameter{
    id: number,
    name: string,
    key: string,
    body: string,
    params: IParamsParameter[] | string | any,
    information: string
}
interface IVariableStore{
    name?: string,
    type?: number,
    value?: string | IValueParameter,
}

export const useVariableStore = defineStore("variable-store", () =>{
    const variable: IVariableStore[] | any = ref<IVariableStore[] | any>([]);

    function setNull(){
        variable.value = []
    }
    function addVariable(params: IVariableStore){
        variable.value.push(params)
    }

    function setParameter(variableIndex: number, parameterIndex: number, value: string | any){
        let v = variable.value[variableIndex].value;
        let json = JSON.parse(v.params);
        json[parameterIndex].value = value
        v.params = JSON.stringify(json)    
    }

    function removeVariable(pos: number){
        (variable.value as Array<IVariableStore>).splice(pos,1)
    }

    return {
        variable,
        addVariable,
        removeVariable,
        setParameter,
        setNull
    }
       
});
import { ref } from 'vue';
import { defineStore } from 'pinia';


export interface IStatement{
    id: string,
    nickname: string,
    type: string,
    value: string | boolean | number
}

interface ICondition{
    id: string,
    statement?: IStatement[] | string,
    body: string,
    // conditions: ICondition[]
}

export const useConditionStore = defineStore('condition-store', ()=> {
    const process_condition: ICondition[] | any = ref<ICondition[] | any>([])
    function addCondition(params: ICondition){
        (process_condition.value as Array<ICondition>).push(params)
    }

    function addStatement(pos: number, params: IStatement){
        ((process_condition.value as Array<ICondition>)[pos].statement as Array<IStatement>).push(params)
    }

    function removeStatementItem(indexParent: number, indexStatement: number){
        ((process_condition.value as Array<ICondition>)[indexParent].statement as Array<IStatement>).pop()
    }

    function addBody(pos: number, body: string){
        (process_condition.value as Array<ICondition>)[pos].body = body
    }

    function removeCondition(pos: number){
        (process_condition.value as Array<ICondition>).splice(pos, 1)
    }

    return {
        process_condition,
        addCondition,
        removeCondition,
        addStatement,
        removeStatementItem,
        addBody
    }
})
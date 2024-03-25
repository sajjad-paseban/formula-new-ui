/* eslint-disable */

import { type IStatement } from './../stores/condition';
export function StatementParamValueTool(key: string, value?: string | null | number): IStatement{
    switch(key){
    case "VARIABLE_TOOL":
        return {
            id: key,
            nickname: 'متغیر',
            type: 'variable',
            value: value ? value : ''
        }
        break;
    
    case "STATIC_VALUE_TOOL":
        return {
            id: key,
            nickname: 'مقدار ثابت',
            type: 'static_value',
            value: value ? value : ''
        }
        break;
    case "CALC_TOOL":
        return {
            id: key,
            nickname: 'عملیات محاسباتی',
            type: 'calc_value',
            value: value ? value : ''
        }
        break;
    case "AND_TOOL":
            return {
                id: key,
                nickname: 'و',
                type: 'conditional',
                value: '&&'
            }
            break;

        case "OR_TOOL":
            return {
                id: key,
                nickname: 'یا',
                type: 'conditional',
                value: '||'
            }
            break;

        case "TRUE_TOOL":
            return {
                id: key,
                nickname: 'درست باشد',
                type: 'bool',
                value: true
            }
            break;

        case "FALSE_TOOL":
            return {
                id: key,
                nickname: 'نادرست باشد',
                type: 'bool',
                value: false
            }
            break;

        case "EQUAL_TOOL":
            return {
                id: key,
                nickname: 'برابر باشد با',
                type: 'comparative',
                value: '=='
            }
            break;

        case "NOT_EQUAL_TOOL":
            return {
                id: key,
                nickname: 'برابر نباشد با',
                type: 'comparative',
                value: '!='
            }
            break;

        case "GOE_TOOL":
            return {
                id: key,
                nickname: 'بزرگ تر مساوی با',
                type: 'comparative',
                value: '>='
            }
            break;
        case "G_TOOL":
            return {
                id: key,
                nickname: 'بزرگ تر از',
                type: 'comparative',
                value: '>'
            }
            break;
        case "LOE_TOOL":
            return {
                id: key,
                nickname: 'کوچک تر مساوی با',
                type: 'comparative',
                value: '<='
            }
            break;
        case "L_TOOL":
            return {
                id: key,
                nickname: 'کوچک تر از',
                type: 'comparative',
                value: '<'
            }
            break;
        default:
            return {
                id: key,
                nickname: '',
                type: '',
                value: ''
            }
            break;
    }
}

function variablesFilter(variable: string){
    const op = variable.replaceAll(' ','')
    
    const numbers = [
        '0','1','2','3','4','5','6','7','8','9',
        '۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'    
    ];

    const signs = [
        '+','-','*','/','(',')','=','.'
    ];
    
    let flag = false;

    let newVariable = '';
    
    op.split('').forEach((item: string) => {
        if(!numbers.includes(item) && !signs.includes(item)){
            if(flag == false){
                newVariable += '$' + item;
                flag = true;
            }else{
                newVariable += item;
            }
        }else{
            flag = false;
            newVariable += item;
        }
    });

    return newVariable;
}

function parametersToPhpCode(variable: any){
    const params = JSON.parse(variable.params);
    const body = variable.body;
    var result = '';
    if(params && params.length > 0){
        params.map((item: any, index: number) => {
            result +=  variablesFilter(item.value) + ((params.length - 1 != index) ? ',': '')
        })
        return (body as string).replaceAll('()', '(' + result +')')
    }else{
        return body;
    }
}

export function variablesToPhpCode(variable: any){
    let code = '';
    (variable as Array<any>).map((val, index) =>{

        let filter = (val.type == 0) ? variablesFilter(val.value) : parametersToPhpCode(val.value);
        
        code += '\$'+val.name+'='+ filter +';\n'
    
    })
    return code
}

function statementToPhpCode(statement: any){
    let code = '';

    (statement as Array<any>).map((value, index) => {
        if(value.type == "variable")
            code += '\$'+value.value
        else if(value.type == "calc_value")
            code += variablesFilter(value.value)
        else
            code += value.value;
    })
    
    return code;
}

function bodyToPhpCode(body: string, variables: any){
    let code = 'return ';

    return code + variablesFilter(body) + ';'
}

export function conditionToPhpCode(condition: any, variables: any){
    let code = '';

    (condition as Array<any>).map((value, index) => {
            if(value.id === "IF_TOOL"){
                code += 'if(' + statementToPhpCode(value.statement) + '){' +'\n'
                code += bodyToPhpCode(value.body, variables)+'\n'
                code += '}\n'
            }else if(value.id === "ELSE_TOOL"){
                code += 'else(' + statementToPhpCode(value.statement) + '){' +'\n'
                code += bodyToPhpCode(value.body, variables)+'\n'
                code += '}\n'
            }else if(value.id === "ASIGN_VARIABLE_TOOL"){
                code += variablesFilter(value.body) + ';';
            }
    })

    return code
}



<template>
    <div class="variables-list-datagrid">
        <vue-good-table
            :columns="columns"
            :rows="getUpdatedRows"
            :search-options="options.search"
            :select-options="options.select"
            :sort-options="options.sort"
            :pagination-options="options.pagination"
            line-numbers="true"
            compactMode
            ref="variables-list-table"
        >
    
            <template #selected-row-actions>
                <Button 
                    title="حذف"
                    group="alpha"
                    btn-class="btn btn-gray"
                    class="mb-1"
                    @click="deleteAction"
                />
            </template>

            <template #emptystate>
                <p class="empty-state">
                    درحال حاضر دیتایی وجود ندارد
                </p>
            </template>
    
        </vue-good-table>
    </div>
</template>

<script lang="js">
import { defineComponent } from 'vue'
import 'vue-good-table-next/dist/vue-good-table-next.css'
import Swal from 'sweetalert2'
import { VueGoodTable } from 'vue-good-table-next'
import { destroy, getAll } from '@/services/variables.service'
import Button from '@/components/Button.vue'
import { messages } from '@/helpers/swal'
import { ToastMessage } from '@/helpers/enums'


export default defineComponent({
    name: 'variables-list-datagrid',
    components: {
        VueGoodTable,
        Button
    },
    methods:{
        deleteAction(){

            Swal.fire({
                title: '<div style="font-size: 22px">آیا از انجام این کار اطمینان کامل دارید؟</div>',
                showCancelButton: true,
                cancelButtonText: 'خیر',
                showConfirmButton: true,
                confirmButtonText: 'بله',
            }).then(async result =>  {
                if(result.isConfirmed){
                    const ids = this.$refs['variables-list-table'].selectedRows.map((i, index) =>{
                        this.rows.map((item, idx) => {
                            if(item.id == i.id)
                                this.rows.splice(idx, 1)
                        })
        
                        return i.id
                    })

                    const result = await destroy(ids).then(res => res)
                    if(result.status == 200 || result.status == 201){
                        messages(ToastMessage.Success)
                    }else{
                        messages(ToastMessage.ServerError)
                    }
                }
            })

        }
    },
    data() {
        return {
            columns: [
                {
                    label: 'نام متغیر',
                    field: 'name',
                },
                {
                    label: 'کلید متغیر',
                    field: 'key',
                },
                {
                    label: 'دیتا',
                    field: 'body',
                    tdClass: 'ltr'
                    
                },
                {
                    label: 'پارامتر ها',
                    field: 'params',
                    tdClass: 'ltr'
                },
                {
                    label: 'تعریف متغیر',
                    field: 'information',
                },
                {
                    label: 'عملیات',
                    field: 'actions',
                    html: true
                },
            
            ],
            rows: [],
            options:{
                search:{
                    enabled: true,
                    placeholder: 'جست و جو کنید'
                },
                select: {
                    enabled: true,
                    selectOnCheckboxOnly: true, // only select when checkbox is clicked instead of the row
                    // selectionInfoClass: 'custom-class',
                    selectionText: 'سطر انتخاب شده',
                    clearSelectionText: 'پاک کن',
                    disableSelectInfo: false, // disable the select info panel on top
                    // selectAllByGroup: true, // when used in combination with a grouped table, add a checkbox in the header row to check/uncheck the entire group
                },
                sort:{
                    enabled: true
                },
                pagination:{
                    enabled: true,
                    mode: 'records',
                    perPage: 5,
                    position: 'bottom',
                    // perPageDropdown: [10, 20, 30],
                    dropdownAllowAll: false,
                    setCurrentPage: 1,
                    nextLabel: 'بعدی',
                    prevLabel: 'قبلی',
                    rowsPerPageLabel: 'تعداد سطر در هر صفحه',
                    ofLabel: 'از',
                    pageLabel: 'صفحه', // for 'pages' mode
                    allLabel: 'همه',
                    // infoFn: (params: any) => `my own page ${params.firstRecordOnPage}`,
                }
            }
        }
    },
    async mounted(){
        const variables = await getAll().then(res => res)
        if(variables.status == 200)
            this.rows = variables.data
    },
    computed:{
        getUpdatedRows(){
            return this.rows.map(i => Object.assign(i, { actions: `<a class='btn btn-sm btn-primary' href='/tool/variable/edit/${i.id}'>ویرایش</a>`}) )
        }
    }
})
</script>

<style lang="scss" scoped>
    .variables-list-datagrid{
        padding: 0 10px;        
        p.empty-state{
            text-align: center;
        }
    }
</style>
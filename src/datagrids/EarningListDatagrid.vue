<template>
    <div class="earning-list-datagrid">
        <vue-good-table
            :columns="columns"
            :rows="getUpdatedRows"
            :search-options="options.search"
            :select-options="options.select"
            :sort-options="options.sort"
            :pagination-options="options.pagination"
            line-numbers="true"
            compactMode
            ref="earning-list-table"
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
import { destroy, getAll } from '@/services/earning.service'
import Button from '@/components/Button.vue'
import { messages } from '@/helpers/swal'
import { ToastMessage } from '@/helpers/enums'


export default defineComponent({
    name: 'earning-list-datagrid',
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
                    const ids = this.$refs['earning-list-table'].selectedRows.map((i, index) =>{
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
                    label: 'کد متغیر',
                    field: 'id',
                },
                {
                    label: 'عنوان کد درآمدی',
                    field: 'title',
                },
                {
                    label: 'نوع سیستم',
                    field: 'system_type',
                },
                {
                    label: 'متغیر ها',
                    field: 'variables',
                    tdClass: 'ltr'
                    
                },
                {
                    label: 'پردازنده',
                    field: 'process',
                    tdClass: 'ltr'
                },
                {
                    label: 'کد تولید شده',
                    field: 'Body',
                    tdClass: 'ltr'
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
        const earning = await getAll().then(res => res)
        if(earning.status == 200)
            this.rows = earning.data
    },
    computed:{
        getUpdatedRows(){
            return this.rows.map(i => Object.assign(i, { actions: `<a class='btn btn-sm btn-primary' href='/formula/edit/${i.id}'>ویرایش</a>`}) )
        }
    }
})
</script>

<style lang="scss" scoped>
    .landing-company-datagrid{
        padding: 0 10px;        
        p.empty-state{
            text-align: center;
        }
    }
</style>
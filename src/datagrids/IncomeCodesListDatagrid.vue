<template>
    <div class="landing-company-datagrid">
        <vue-good-table
            :columns="columns"
            :rows="[]"
            :search-options="options.search"
            :select-options="options.select"
            :sort-options="options.sort"
            :pagination-options="options.pagination"
            line-numbers="true"
            compactMode
        >
    
            <template #emptystate>
                <p class="empty-state">
                    درحال حاضر دیتایی وجود ندارد
                </p>
            </template>
    
        </vue-good-table>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import 'vue-good-table-next/dist/vue-good-table-next.css'
import { VueGoodTable } from 'vue-good-table-next';


export default defineComponent({
    name: 'landing-company-datagrid',
    components: {
        VueGoodTable
    },
    data() {
        return {
            columns: [
                {
                    label: 'نام شرکت',
                    field: 'company_name',
                },
                {
                    label: 'نام مدیر عامل',
                    field: 'company_manager_name',
                },
                {
                    label: 'نام سرپرست',
                    field: 'company_supervisor_name',
                },
                {
                    label: 'شماره همراه سرپرست',
                    field: 'company_supervisor_phone',
                },
                {
                    label: 'شماره تماس',
                    field: 'company_telephone',
                },
                {
                    label: 'آدرس',
                    field: 'company_address',
                },
                {
                    label: 'توضیحات',
                    field: 'company_description',
                },
                {
                    label: 'ظرفیت کل',
                    field: 'company_capacity',
                },
                {
                    label: 'ظرفیت باقی مانده',
                    field: 'company_remaining_capacity',
                },
            
            ],
            rows: [
                { id:1, company_name:"John", age: 20, createdAt: '',score: 0.03343 },
                { id:2, company_name:"Jane", age: 24, createdAt: '2011-10-31', score: 0.03343 },
                { id:3, company_name:"Susan", age: 16, createdAt: '2011-10-30', score: 0.03343 },
                { id:4, company_name:"Chris", age: 55, createdAt: '2011-10-11', score: 0.03343 },
                { id:5, company_name:"Dan", age: 40, createdAt: '2011-10-21', score: 0.03343 },
                { id:6, company_name:"John", age: 20, createdAt: '2011-10-31', score: 0.03343 },
            ],
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
                    disableSelectInfo: true, // disable the select info panel on top
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
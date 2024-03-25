<template>
    <div class="process-menu-partial">
        <button type="button" class="btn btn-sm btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            ابزار +
        </button>
        <ul class="dropdown-menu">
            <li class="dropdown-item" @click="addTool('IF_TOOL')">
                اگر
                <span>
                    (if)
                </span>
            </li>
            <li class="dropdown-item" @click="addTool('ASIGN_VARIABLE_TOOL')">
                مقداردهی متغیرها
                <span>
                    (asign value)
                </span>
            </li>
            <li class="dropdown-item">
                در غیر اینصورت
                <span>
                    (else)
                </span>
            </li>
        </ul>
        
    </div>
</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import { useConditionStore } from "@/stores/condition";
    import Button from "@/components/Button.vue";
    export default defineComponent({
        components: { },
        name: 'process-menu-partial',
        methods: {
            addTool(param: string){
                if(param === "ASIGN_VARIABLE_TOOL")
                    useConditionStore().addCondition({
                        id: param,
                        body: ''
                    })
                else
                    useConditionStore().addCondition({
                        id: param,
                        statement: [],
                        body: ''
                    })
            }
        }
    })
</script>


<style lang="scss" scoped>
.process-menu-partial{
    font-family: 'vazir';
}
</style>
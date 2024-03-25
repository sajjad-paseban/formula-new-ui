<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'page-not-found-view',
    mounted(){
        this.$router.push({
            path: '/'
        })
    },
})
</script>
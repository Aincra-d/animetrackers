<template>
    <div>
        <ui-select
            class="my-0 ml-3"
            placeholder="Select status"
            :options="statuses"
            :keys="{ label: 'name', value: 'code' }"
            v-model="status"
            @change="changeStatus"
        ></ui-select>
    </div>
</template>

<script>
    export default{
        name: 'selectStatus',
        data(){
            let statuses = ['All',this.$route.params.type == 'anime' ? 'Watching' : 'Reading','Completed','On-hold','Dropped',this.$route.params.type == 'anime' ? 'Plan to watch' : 'Plan to read'];
            return{
                statuses: statuses,
                status: this.$route.params.status.split('-').join(' ')
            }
        },
        methods: {
            changeStatus(){
                this.$router.push({
                    path: '/'
                    +(this.$route.params.username ? 'user/'+this.$route.params.username : 'local')
                    +'/list/'
                    +this.$route.params.type
                    +'/'
                    +this.status.toLowerCase().split('-').join('').split(' ').join('')
                    +'/1'
                    // name: 'list',
                    // params: {
                    //     type: 'anime',
                    //     status: this.status.toLowerCase().split('-').join('').split(' ').join('')
                    // }
                });
            }
        },
        watch: {
            '$route.params.status': function(status){
                this.status=status.split('-').join(' ')
            }
        }
    }
</script>

<style>
    .ui-select__content *{
        color:white !important;
        max-width: 200px;
        text-transform: capitalize;
    }

    .ui-select{
        display: inline-block!important;
    }
</style>
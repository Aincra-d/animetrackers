<template>
    <div>
        <ui-select
            class="my-0 ml-3"
            placeholder="Select collection"
            :options="collections"
            :keys="{ label: 'name', value: 'code' }"
            v-model="collection"
            @change="changeCollection"
        ></ui-select>
    </div>
</template>

<script>
    export default{
        name: 'anime_collections',
        data(){
            return{
                collections: [],
                collection_name: this.$route.params.name.split('-').join(' '),
                collection_id: parseInt(this.$route.params.id)
            }
        },
        methods: {
            changeCollection(){
                this.$router.push({
                    path: '/local/collections/'
                    +this.$route.params.type
                    +'/'
                    +this.$route.params.id
                    +'/'
                    +this.collection_name.split(' ').join('-').replace('/','')
                });
            }
        },
        watch: {
            '$route.params.name': function(name){
                this.collection_name=name
            },
            '$route.params.id': function(id){
                this.collection_id=id
            }
        },
        created(){
            let collections=JSON.parse(localStorage.collections);
            this.collections=collections.filter(collection => collection.type == this.$route.params.type).map(collection => collection.name);
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
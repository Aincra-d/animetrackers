<template>
    <div>
       <ui-select style="max-width: 70%;" class="my-0"
            has-search
            placeholder="Select studio"
            :options="studios"
            :keys="{ label: 'name', value: 'code' }"
            @change="changeStudio"
            v-model="studioName"
        ></ui-select>

        <!-- <router-link :to="'/top/anime/studio/'+selected.id+'/'+(selected.name.split(' ').join('-')).replace('/','-')+'/1'">
            <button type="button" class="btn btn-link btn-sm font-weight-bold text-light">Jump</button>
        </router-link> -->
    </div>
</template>

<script>
    export default{
        name: 'selectStudio',
        data(){
            let studios = require('./studios.json')
            return {
                id: this.$route.params.studioid,
                studioName: this.$route.params.studioname.split('-').join(' '),
                studios: studios,
                selected: {
                    id: this.$route.params.studioid,
                    name: this.$route.params.studioname.split('-').join(' ')
                }
            }
        },
        methods: {
            changeStudio(){
                this.selected=this.studios.find(x => x.name == this.studioName.name);
                this.$router.push({
                    path: '/top/anime/studio/'+this.selected.id+'/'+this.selected.name.split(' ').join('-').replace('/','-')+'/1'
                });
            }
        },
        watch: {
            '$route.params.studioid': function(id){
                this.selected=this.studios.find(x => x.id == id);
            },
            '$route.params.studioname': function(name){
                this.studioName=name.split('-').join(' ')
            }
        }
    }
</script>
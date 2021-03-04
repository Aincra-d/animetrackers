<template>
    <div>
       <ui-select style="max-width: 70%;" class="my-0"
            has-search
            placeholder="Select magazine"
            :options="magazines"
            :keys="{ label: 'name', value: 'code' }"
            @change="changeMagazine"
            v-model="magazineName"
        ></ui-select>

        <!-- <router-link :to="'/top/anime/magazine/'+selected.id+'/'+(selected.name.split(' ').join('-')).replace('/','-')+'/1'">
            <button type="button" class="btn btn-link btn-sm font-weight-bold text-light">Jump</button>
        </router-link> -->
    </div>
</template>

<script>
    export default{
        name: 'selectMagazine',
        data(){
            let magazines = require('./magazines.json')
            return {
                id: this.$route.params.magazineid,
                magazineName: this.$route.params.magazinename.split('-').join(' '),
                magazines: magazines,
                selected: {
                    id: this.$route.params.magazineid,
                    name: this.$route.params.magazinename.split('-').join(' ')
                }
            }
        },
        methods: {
            changeMagazine(){
                this.selected=this.magazines.find(x => x.name == this.magazineName.name);
                this.$router.push({
                    path: '/top/manga/magazine/'+this.selected.id+'/'+this.selected.name.split(' ').join('-').replace('/','-')+'/1'
                });
            }
        },
        watch: {
            '$route.params.magazineid': function(id){
                this.selected=this.magazines.find(x => x.id == id);
            },
            '$route.params.magazinename': function(name){
                this.magazineName=name.split('-').join(' ')
            }
        }
    }
</script>
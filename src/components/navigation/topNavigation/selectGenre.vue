<template>
    <div>
        <ui-select class="my-0"
            has-search
            placeholder="Select genre"
            :options="genres"
            :keys="{ label: 'name', value: 'code' }"
            v-model="genreName"
            @change="changeGenre"
        >
        </ui-select>

       <!--  <router-link :to="'/top/'+$route.params.type+'/genre/'+(genres.indexOf(genreName)+1)+'/'+genreName.split(' ').join('-')+'/1'">
            <button type="button" class="btn btn-link btn-sm font-weight-bold text-light">Jump</button>
        </router-link> -->
    </div>
</template>

<script>
    export default{
        name: 'selectGenre',
        data(){
            let genres = require('./genres.json')
            return{
                genres: genres,
                genreName: this.$route.params.genrename.split('-').join(' ')
            }
        },
        methods: {
            changeGenre(){
                this.$router.push({
                    path: '/top/'+this.$route.params.type+'/genre/'+(this.genres.indexOf(this.genreName)+1)+'/'+this.genreName.split(' ').join('-')+'/1'
                });
            }
        },
        watch: {
            '$route.params.genrename': function(genrename){
                this.genreName=genrename.split('-').join(' ')
            }
        }
    }
</script>

<style>
    .ui-select__content *{
        color:white !important;
        max-width: 200px;
    }

    .ui-select{
        display: inline-block!important;
    }
</style>
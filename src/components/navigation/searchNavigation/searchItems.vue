<template>
    <div>
        <ui-select style="max-width: 40%" class="d-inline-block p-0 my-0 ml-0 mr-3 text-light"
            placeholder="Type"
            :options="['Anime','Manga','Characters','People']"
            :keys="{ label: 'name', value: 'code' }"
            v-model="type"
        >
        </ui-select>
        <ui-textbox minlength="3" class="d-inline-block p-0 m-0 text-light" style="max-width: 60%" placeholder="Search" v-model.trim="search" @keydown-enter="doSearch"></ui-textbox>
       <!--  <router-link class="d-inline-block p-0 m-0" :to="'/search/'+type.toLowerCase()+'?search='+search.split(' ').join('-')">
            <button type="button" class="btn btn-link btn-sm font-weight-bold text-light">Go</button>
        </router-link> -->
    </div>
</template>

<script>
    export default{
        name: 'searchItems',
        data(){
            return {
                search: (this.$route.query.search.split('-').join(' ')).replace('/','-'),
                type: this.$route.params.type
            }
        },
        methods: {
            doSearch(){
                this.$router.push({
                    name: 'search',
                    params: {
                        type: this.type.toLowerCase()
                    },
                    query: {
                        search: (this.search.split(' ').join('-')).replace('/','-')
                    }
                })
            }
        },
        watch: {
            '$route.params.type': function (type) {
                this.type=type;
            },
            '$route.query.search': function (search) {
                this.search=(search.split('-').join(' ')).replace('/','-');
            }
        }
    }
</script>

<style type="text/css">
    .ui-select__content *,.ui-textbox *{
        color:white !important;
    }

    .ui-select__content *{
        text-transform: capitalize;
    }
</style>
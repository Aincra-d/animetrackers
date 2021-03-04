<template>
    <div>
        <div>
            <b-navbar toggleable="lg" type="dark" variant="dark">
                <router-link to="">
                    <b-navbar-brand>Home</b-navbar-brand>
                </router-link>
                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                <b-collapse id="nav-collapse" is-nav>
                    <b-navbar-nav class="mr-auto">
                        <anime></anime>
                        <manga></manga>

                        <b-nav-item>
                            <router-link class="text-light" to="/top/characters/1">
                                Characters
                            </router-link>
                        </b-nav-item>

                        <b-nav-item>
                            <router-link class="text-light" to="/season/2020/winter">
                                Seasonal
                            </router-link>
                        </b-nav-item>

                        <b-nav-form>
                            <b-form-input v-model="title" size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                            <b-button @click.prevent="search" size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                        </b-nav-form>
                    </b-navbar-nav>
                </b-collapse>
            </b-navbar>

            <search-results :title="title"></search-results>
        </div>
    </div>
</template>

<script>
    import searchResults from '@/components/searchResults.vue';
    export default{
        name: 'mainMenu',
        components: {
            'search-results': searchResults,
            anime: () => import('@/components/menu/anime.vue'),
            manga: () => import('@/components/menu/manga.vue')
        },
        data(){
            return{
                title: ''
            }
        },
        methods: {
            search(){
                alert(this.title)
            }
        }
    }
</script>

<style>
    nav{
        border-bottom: 3px solid white!important;
    }
</style>
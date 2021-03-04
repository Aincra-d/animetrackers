<template>
    <div>
        <ui-select class="my-0"
            placeholder="Select toplist"
            :options="options"
            :keys="{ label: 'name', value: 'code' }"
            v-model="option"
            @change="changeToplist"
        >
        </ui-select>

       <!--  <router-link :to="option.link">
            <button type="button" class="btn btn-link btn-sm font-weight-bold text-light">Jump</button>
        </router-link> -->
    </div>
</template>

<script>
    export default {
        name: 'selectToplist',
        data(){
            return{
                options: [],
                option: ''
            }
        },
        methods: {
            changeToplist(){
                this.$router.push({
                    path: this.option.link
                });
            },
            setOptions(){
                let options;
                if(this.$route.params.type=='anime'){
                    options=[
                        // { name: 'Search', link: '/search/anime?search='},
                        // { name: 'Seasonal', link: '/season/'+new Date().getFullYear()+'/spring'},
                        { name: 'Top rated', link: '/top/anime/1'},
                        { name: 'Most popular', link: '/top/anime/bypopularity/1'},
                        { name: 'Top airing', link: '/top/anime/airing/1'},
                        { name: 'Top upcoming', link: '/top/anime/upcoming/1'},
                        { name: 'Most favourited', link: '/top/anime/favorite/1'},
                        { name: 'Top TV', link: '/top/anime/tv/1'},
                        { name: 'Top movie', link: '/top/anime/movie/1'},
                        { name: 'Top OVA', link: '/top/anime/ova/1'},
                        { name: 'Top special', link: '/top/anime/special/1'}
                        // { name: 'Genre search', link: '/top/anime/genre/1/Action/1'},
                        // { name: 'Studio search', link: '/top/anime/studio/1/Studio-Pierrot/1'}
                        ];
                    }
                    else{
                        options=[
                        // { name: 'Search', link: '/search/manga?search='},
                        { name: 'Top rated', link: '/top/manga/1'},
                        { name: 'Most popular', link: '/top/manga/bypopularity/1'},
                        { name: 'Top novels', link: '/top/manga/novels/1'},
                        { name: 'Top doujin', link: '/top/manga/doujin/1'},
                        { name: 'Top manhwa', link: '/top/manga/manhwa/1'},
                        { name: 'Top manhua', link: '/top/manga/manhua/1'},
                        { name: 'Top oneshots', link: '/top/manga/oneshots/1'},
                        { name: 'Most favourited', link: '/top/manga/favorite/1'}
                        // { name: 'Genre search', link: '/top/manga/genre/1/Action/1'},
                        // { name: 'Magazine search', link: '/top/manga/magazine/1/Big-Comic-Original/1'}
                        ];
                    }
                    this.options=options;
                }
            },
            created(){
                this.setOptions();
            },
            watch: {
                '$route.params.type': function () {
                    this.setOptions();
                }
            },
        }
</script>
<template>
    <div class="bg-dark text-light" style="height:100vh;">
        <manga-header :stats="mangaStats" :info="mangaInfo"></manga-header>
        <manga-menu></manga-menu>
        <router-view :key="$route.fullPath"></router-view>
    </div>
</template>

<script>
    import axios from 'axios';
    import header from '@/components/mangaInfo/header/header.vue';
    import mangaMenu from '@/components/mangaInfo/header/menu.vue';
    export default{
        name: 'mangaInfo',
        components: {
            'manga-header': header,
            'manga-menu': mangaMenu
        },
        data(){
            return{
                mangaInfo: {},
                mangaStats: {}
            }
        },
        beforeRouteUpdate(to, from, next){
            if(to.params.mangaid!=from.params.mangaid){
                this.$Progress.start();
                let mangaInfo={};
                let mangaStats={};
                axios.get("https://api.jikan.moe/v3/manga/"+to.params.mangaid)
                .then(response => {
                    console.log(response.data)
                    let manga=response.data;

                    let image=manga.image_url.slice(0,-4)+'l.jpg';
                    mangaInfo={
                        id: manga.mal_id,
                        image: image,
                        title: manga.title
                    };

                    mangaStats={
                        score: manga.score,
                        members: manga.members,
                        favourites: manga.favorites,
                        rank: manga.rank
                    };
                    this.mangaInfo=mangaInfo;
                    this.mangaStats=mangaStats;
                }).catch(error => { console.log(error) });
                this.$Progress.finish();
            }
            next();
        },
        beforeRouteEnter(to, from, next){
            let mangaInfo={};
            let mangaStats={};
            axios.get("https://api.jikan.moe/v3/manga/"+to.params.mangaid)
            .then(response => {
                console.log(response.data)
                let manga=response.data;

                let image=manga.image_url.slice(0,-4)+'l.jpg';
                mangaInfo={
                    id: manga.mal_id,
                    image: image,
                    title: manga.title
                };

                mangaStats={
                    score: manga.score,
                    members: manga.members,
                    favourites: manga.favorites,
                    rank: manga.rank
                };
                next(vm => {
                    vm.$Progress.start();
                    vm.mangaInfo=mangaInfo;
                    vm.mangaStats=mangaStats;
                    vm.$Progress.finish();
                });
            }).catch(error => { console.log(error) });
        }
    };
</script>

<style type="text/css">
    .ui-collapsible__body{
        border:0;
        padding:0;
        margin:0;
        text-align: left;
    }
</style>
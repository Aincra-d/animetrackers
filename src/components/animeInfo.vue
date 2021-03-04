<template>
    <div class="bg-dark text-light" style="height:100vh;">
        <anime-header :stats="animeStats" :info="animeInfo"></anime-header>
        <anime-menu></anime-menu>
        <router-view :key="$route.fullPath"></router-view>
    </div>
</template>

<script>
    import axios from 'axios';
    import header from '@/components/animeInfo/header/header.vue';
    import animeMenu from '@/components/animeInfo/header/menu.vue';
    export default{
        name: 'animeInfo',
        components: {
            'anime-header': header,
            'anime-menu': animeMenu
        },
        data(){
            return{
                animeInfo: {},
                animeStats: {}
            }
        },
        beforeRouteUpdate(to, from, next){
            if(to.params.animeid!=from.params.animeid){
                this.$Progress.start();
                let animeInfo={};
                let animeStats={};
                axios.get("https://api.jikan.moe/v3/anime/"+to.params.animeid)
                .then(response => {
                    console.log(response.data)
                    let anime=response.data;

                    let image=anime.image_url.slice(0,-4)+'l.jpg';
                    animeInfo={
                        id: anime.mal_id,
                        image: image,
                        title: anime.title
                    };

                    animeStats={
                        score: anime.score,
                        members: anime.members,
                        favourites: anime.favorites,
                        rank: anime.rank
                    };
                    this.animeInfo=animeInfo;
                    this.animeStats=animeStats;
                }).catch(error => { console.log(error) });
                this.$Progress.finish();
            }
            next();
        },
        beforeRouteEnter(to, from, next){
            let animeInfo={};
            let animeStats={};
            axios.get("https://api.jikan.moe/v3/anime/"+to.params.animeid)
            .then(response => {
                console.log(response.data)
                let anime=response.data;

                let image=anime.image_url.slice(0,-4)+'l.jpg';
                animeInfo={
                    id: anime.mal_id,
                    image: image,
                    title: anime.title
                };

                animeStats={
                    score: anime.score,
                    members: anime.members,
                    favourites: anime.favorites,
                    rank: anime.rank
                };
                next(vm => {
                    vm.$Progress.start();
                    vm.animeInfo=animeInfo;
                    vm.animeStats=animeStats;
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
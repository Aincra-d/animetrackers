<template>
    <div>

    <div class="w-100 text-center text-light font-weight-bold">
        <ul class="list-unstyled">
            <li :key="genre.mal_id" v-for="genre in genres" class="d-inline-block d-lg-inline my-1 mr-1">
                <button type="button" class="btn btn-light rounded-0 btn-sm px-1 genres">{{genre.name}}</button>
            </li>
        </ul>
    </div>
    <info style="background: rgba(0,0,0,0.3);" :info="info"></info>
    <story style="background: rgba(0,0,0,0.3);" :story="story"></story>
    <related style="background: rgba(0,0,0,0.3);" v-if="relatedLoaded" :related="related"></related>
    <songs style="background: rgba(0,0,0,0.3);" :songs="songs"></songs>
    </div>
</template>

<script>
    import axios from 'axios';
    import related from '@/components/animeInfo/overview/related.vue';
    import info from '@/components/animeInfo/overview/info.vue';
    import story from '@/components/animeInfo/overview/story.vue';
    import songs from '@/components/animeInfo/overview/songs.vue';
    export default{
        name: 'overview',
        components: {
            related,
            story,
            songs,
            info
        },
        data(){
            let info=[];
            let genres=[];
            let songs=[];
            axios.get("https://api.jikan.moe/v3/anime/"+this.$route.params.animeid)
            .then(response => {
                console.log(response.data);

                let anime=response.data;
                for(let i=0; i<anime.genres.length; i++){
                    genres.push({
                        id: anime.genres[i].mal_id,
                        name: anime.genres[i].name
                    });
                }
                info.push({
                    episodes: anime.episodes,
                    type: anime.type,
                    status: anime.status,
                    aired: anime.aired.string,
                    rating: anime.rating,
                    premiered: anime.premiered,
                    duration: anime.duration,
                    background: anime.background,
                    source: anime.source,
                    broadcast: anime.broadcast,
                    studios: anime.studios,
                });
                this.$data.related=anime.related;

                songs.push({
                    openings: anime.opening_themes,
                    endings: anime.ending_themes
                });
                this.$data.story=anime.synopsis;
                this.$data.relatedLoaded=true;
            }).catch(error => { console.log(error) });
            return{
                info: info,
                genres: genres,
                songs: songs,
                related: related,
                story: "",
                charactersLoaded: false,
                relatedLoaded: false
            }
        }
    };
</script>

<style scoped>
    .genres{
        border-radius: 10% !important;
    }
</style>
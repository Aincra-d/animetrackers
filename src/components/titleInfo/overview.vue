<template>
    <div>

        <anime-info-modal ref="animeInfoModal"></anime-info-modal>

        <manga-info-modal ref="mangaInfoModal"></manga-info-modal>

        <anime-info
        v-if="$route.params.type=='anime'"
        :genres="genres"
        style="background: rgba(0,0,0,0.3);"
        :info="info">
        </anime-info>

        <manga-info
        v-else
        :genres="genres"
        style="background: rgba(0,0,0,0.3);"
        :info="info">
        </manga-info>

        <story
        v-if="story"
        style="background: rgba(0,0,0,0.3);"
        :story="story">
        </story>

        <characters></characters>

        <reviews></reviews>

        <tags></tags>

        <related
        @open-modal="openModal"
        v-if="relatedLoaded && JSON.stringify(related)!=='{}'"
        :related="related">
        </related>

        <recommendations @open-modal="openModal"></recommendations>

        <songs
        v-if="$route.params.type=='anime' && songs.length!=0"
        style="background: rgba(0,0,0,0.3);"
        :songs="songs">
        </songs>
    </div>
</template>

<script>
    import axios            from   'axios';
    import animeInfoModal   from   '@/components/animeInfoModal.vue';
    import mangaInfoModal   from   '@/components/mangaInfoModal.vue';
    import related          from   '@/components/titleInfo/overview/related.vue';
    import animeInfo        from   '@/components/titleInfo/overview/animeInfo.vue';
    import mangaInfo        from   '@/components/titleInfo/overview/mangaInfo.vue';
    import story            from   '@/components/titleInfo/overview/story.vue';
    import songs            from   '@/components/titleInfo/overview/songs.vue';
    import reviews          from   '@/components/titleInfo/overview/reviews.vue';
    import tags             from   '@/components/titleInfo/overview/tags.vue';
    import characters       from   '@/components/titleInfo/overview/characters.vue';
    import recommendations  from   '@/components/titleInfo/overview/recommendations.vue';
    export default{
        name: 'titleOverview',
        components: {
            related,
            'anime-info-modal': animeInfoModal,
            'manga-info-modal': mangaInfoModal,
            story,
            songs,
            reviews,
            tags,
            characters,
            recommendations,
            'anime-info': animeInfo,
            'manga-info': mangaInfo,
        },
        head: {
            title() {
                return {
                    inner: this.$route.params.title.split('-').join(' ')+' - Overview',
                    separator: '-',
                    complement: 'Anime'
                }
            },
            meta(){
                return  [
                    {
                        name: 'description',
                        content: 'Check out useful information about '+this.$route.params.title.split('-').join(' '),
                        id: this.$route.params.titleid
                    }
                ]
            }
        },
        data(){
            
            if(this.$route.params.type=='anime'){
                this.getAnimeData();
            }
            else{
                this.getMangaData();
            }
            return{
                info: [],
                genres: [],
                songs: [],
                related: [],
                story: "",
                relatedLoaded: false
            }
        },
        methods: {
            getAnimeData(){
                let info=[];
                let genres=[];
                let songs=[];
                
                axios.get("https://api.jikan.moe/v3/anime/"+this.$route.params.titleid)
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
                    this.related=anime.related;

                    songs.push({
                        openings: anime.opening_themes,
                        endings: anime.ending_themes
                    });

                    this.info=info;
                    this.genres=genres;
                    this.songs=songs;
                    this.story=anime.synopsis;
                    this.relatedLoaded=true;
                }).catch(error => { console.log(error) });
            },
            getMangaData(){
                let info=[];
                let genres=[];
                let authors=[];

                axios.get("https://api.jikan.moe/v3/manga/"+this.$route.params.titleid)
                .then(response => {
                    console.log(response.data);

                    let manga=response.data;
                    for(let i=0; i<manga.genres.length; i++){
                        genres.push({
                            id: manga.genres[i].mal_id,
                            name: manga.genres[i].name
                        });
                    }

                    for(let i=0; i<manga.authors.length; i++){
                        authors.push({
                            id: manga.authors[i].mal_id,
                            name: manga.authors[i].name
                        });
                    }
                    info.push({
                        status: manga.status,
                        type: manga.type,
                        volumes: manga.volumes,
                        chapters: manga.chapters,
                        published: manga.published.string,
                        rating: manga.rating,
                        authors: manga.authors
                    });

                    this.info=info;
                    this.genres=genres;
                    this.story=manga.synopsis;
                    this.related=manga.related;
                    this.relatedLoaded=true;
                }).catch(error => { console.log(error) });
            },
            openModal(ref,id,title){
                ref=='mangaInfoModal'
                ? this.$refs.mangaInfoModal.openModal(ref,id,title)
                : this.$refs.animeInfoModal.openModal(ref,id,title)
            },
            closeModal(ref) {
                this.$refs[ref].close();
            }
        }
    };
</script>

<style scoped>
    .genres{
        border-radius: 10% !important;
    }
</style>
<template>
    <div>
        <anime-info-modal ref="animeInfoModal">
        </anime-info-modal>

        <manga-info-modal ref="mangaInfoModal">
        </manga-info-modal>

        <div v-if="loaded">
            <info
            :char="character_info">
            </info>

            <animeRoles
            @open-modal="openModal"
            v-if="character_info.anime_roles.length!=0"
            :char="character_info">
            </animeRoles>

            <mangaRoles
            @open-modal="openModal"
            v-if="character_info.manga_roles.length!=0"
            :char="character_info">
            </mangaRoles>

            <voiceActors
            v-if="character_info.voice_actors.length!=0"
            :char="character_info">
            </voiceActors>
        </div>

        <div
        v-else
        class="text-center w-100">
            <i class="fas fa-spinner fa-2x fa-spin text-light"></i>
        </div>
    </div>
</template>

<script>
import axios            from 'axios';
import info             from '@/components/characterInfo/info.vue';
import animeRoles       from '@/components/characterInfo/animeRoles.vue';
import mangaRoles       from '@/components/characterInfo/mangaRoles.vue';
import voiceActors      from '@/components/characterInfo/voiceActors.vue';
import animeInfoModal   from '@/components/animeInfoModal.vue';
import mangaInfoModal   from '@/components/mangaInfoModal.vue';
export default{
    name: 'characterInfo',
    components: {
        info,
        animeRoles,
        mangaRoles,
        voiceActors,
        'anime-info-modal': animeInfoModal,
        'manga-info-modal': mangaInfoModal
    },
    head: {
        title() {
            return {
                inner: this.$route.params.name.split('-').join(' ')+' - Overview',
                separator: '-',
                complement: 'Anime'
            }
        },
        meta(){
            return  [
                {
                    name: 'description',
                    content: 'Check out useful information about '+this.$route.params.name.split('-').join(' ')+', other anime/manga that (s)he has been in, and their voice actors in different languages.',
                    id: this.$route.params.charid
                }
            ]
        }
    },
    data(){
        return{
            character_info: {},
            loaded: false
        }
    },
    methods: {
        openModal(ref,id,title) {
            ref=="animeInfoModal"
            ? this.$refs.animeInfoModal.openModal(ref,id,title)
            : this.$refs.mangaInfoModal.openModal(ref,id,title)
        },
        closeModal(ref) {
            this.$refs[ref].close();
        },
        getCharacterInfo(){
            let self=this;
            let character_info;

            axios.get("https://api.jikan.moe/v3/character/"+this.$route.params.charid)
            .then(response => {
                console.log(response.data);

                // self.$Progress.start();
                    character_info = {
                        id: response.data.mal_id,
                        name: response.data.name,
                        about: response.data.about,
                        favourites: response.data.member_favorites,
                        image: response.data.image_url,
                        anime_roles: response.data.animeography,
                        manga_roles: response.data.mangaography,
                        voice_actors: response.data.voice_actors
                    };

                    if(localStorage.animeList){
                        character_info.anime_roles.forEach(anime => {
                            anime.status = JSON.parse(localStorage.animeList).filter(item => item.id === anime.mal_id)[0]
                            ? JSON.parse(localStorage.animeList).filter(item => item.id === anime.mal_id)[0].status
                            : null
                        });
                    }

                    if(localStorage.mangaList){
                        character_info.manga_roles.forEach(manga => {
                            manga.status = JSON.parse(localStorage.mangaList).filter(item => item.id === manga.mal_id)[0]
                            ? JSON.parse(localStorage.mangaList).filter(item => item.id === manga.mal_id)[0].status
                            : null
                        });
                    }

                    if(localStorage.favourites){
                        character_info.voice_actors.forEach(actor => {
                            actor.favourited = localStorage.favourites
                            ? JSON.parse(localStorage.favourites).people.filter(person => person.id === actor.mal_id).length > 0
                            : false
                        });
                    }

                    console.log('character_info',character_info);

                    self.character_info = character_info;
                    self.loaded=true;
            }).catch(error =>{
                console.log(error);
                this.$notify({
                    group: 'foo',
                    type: 'error',
                    title: '<h6>Failed to load character info. Please try again!</h6>'
                });
                self.loaded=true;
            });
        }
    },
    // beforeRouteEnter(to,from,next){
    //     axios.get("https://api.jikan.moe/v3/character/"+to.params.charid)
    //     .then(response => {
    //         console.log(response.data);
    //         next(vm => {
    //             vm.$Progress.start();
    //             let character_info = {
    //                 id: response.data.mal_id,
    //                 name: response.data.name,
    //                 about: response.data.about,
    //                 favourites: response.data.member_favorites,
    //                 image: response.data.image_url,
    //                 anime_roles: response.data.animeography,
    //                 manga_roles: response.data.mangaography,
    //                 voice_actors: response.data.voice_actors
    //             };

    //             character_info.anime_roles.forEach(anime => {
    //                 anime.status = JSON.parse(localStorage.animeList).filter(item => item.id === anime.id)[0]
    //                 ? JSON.parse(localStorage.animeList).filter(item => item.id === anime.id)[0].status
    //                 : null
    //             });

    //             character_info.manga_roles.forEach(manga => {
    //                 manga.status = JSON.parse(localStorage.mangaList).filter(item => item.id === manga.id)[0]
    //                 ? JSON.parse(localStorage.mangaList).filter(item => item.id === manga.id)[0].status
    //                 : null
    //             });

    //             console.log('character_info',character_info);

    //             vm.char = character_info;
    //         });
    //     }).catch(error => { console.log(error) });
    // },
    created(){
        this.getCharacterInfo();
        // this.$Progress.finish();
    }
}
</script>

<style>
    .ui-collapsible__body{
        border:0;
    }

    .anime-roles .ui-collapsible__body, .manga-roles .ui-collapsible__body,.voice-actors .ui-collapsible__body{
        border:0;
        padding:0;
        margin:0;
        text-align: left;
    }
</style>
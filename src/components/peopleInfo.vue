<template>
    <div>
        <anime-info-modal ref="animeInfoModal">
        </anime-info-modal>

        <manga-info-modal ref="mangaInfoModal">
        </manga-info-modal>

        <div v-if="loaded">
            <info
            :person="person_info"
            :screen="$root.screen">
            </info>

            <roles
            @open-modal="openModal"
            v-if="person_info.roles.length != 0"
            :roles="person_info.roles"
            :screen="$root.screen">
            </roles>

            <positions
            @open-modal="openModal"
            v-if="person_info.positions.length != 0"
            :positions="person_info.positions"
            :screen="$root.screen">
            </positions>
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
import info             from '@/components/peopleInfo/info.vue';
import roles            from '@/components/peopleInfo/roles.vue';
import positions        from '@/components/peopleInfo/positions.vue';
import animeInfoModal   from '@/components/animeInfoModal.vue';
import mangaInfoModal   from '@/components/mangaInfoModal.vue';

export default{
    name: 'peopleInfo',
    components: {
        info,
        roles,
        positions,
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
                    content: 'Check out useful information about '+this.$route.params.name.split('-').join(' ')+', see what characters (s)he has been the voice actor/actress of, and what anime/manga they have been part of.',
                    id: this.$route.params.peopleid
                }
            ]
        }
    },
    data(){
        return{
            person_info: {},
            loaded: false,
        }
    },
    methods: {
        openModal(ref,id,title) {
            ref=="animeInfoModal"
            ? this.$refs.animeInfoModal.openModal(ref,id,title)
            : this.$refs.mangaInfoModal.openModal(ref,id,title)
        },
        getPersonInfo(){
            let self=this;
            let person_info;

            axios.get("https://api.jikan.moe/v3/person/"+this.$route.params.personid)
            .then(response => {
                console.log(response.data);

                person_info={
                    id: response.data.mal_id,
                    name: response.data.name,
                    about: response.data.about,
                    birthday: response.data.birthday,
                    favourites: response.data.member_favorites,
                    image: response.data.image_url,
                    roles: response.data.voice_acting_roles,
                    positions: response.data.anime_staff_positions,
                }

                if(localStorage.animeList){
                    person_info.positions.forEach(anime => {
                        anime.status = JSON.parse(localStorage.animeList).filter(item => item.id === anime.anime.mal_id)[0]
                        ? JSON.parse(localStorage.animeList).filter(item => item.id === anime.anime.mal_id)[0].status
                        : null
                    });
                }

                console.log('person_info',person_info);

                self.person_info=person_info;
                self.loaded=true;
            }).catch(error =>{
                console.log(error);
                this.$notify({
                    group: 'foo',
                    type: 'error',
                    title: '<h6>Failed to load person info. Please try again!</h6>'
                });
                self.loaded=true;
            });
        }
    },
    // beforeRouteEnter(to,form,next){
    //     axios.get("https://api.jikan.moe/v3/person/"+this.$route.params.personid)
    //     .then(response => {
    //         console.log(response.data);
    //         next(vm => {
    //             vm.person_info={
    //                 id: response.data.mal_id,
    //                 name: response.data.name,
    //                 about: response.data.about,
    //                 birthday: response.data.birthday,
    //                 favourites: response.data.member_favorites,
    //                 image: response.data.image_url,
    //                 roles: response.data.voice_acting_roles,
    //                 positions: response.data.anime_staff_positions,
    //             }
    //         });
    //     }).catch(error => { console.log(error) });
    // },
    created(){
        this.getPersonInfo();
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
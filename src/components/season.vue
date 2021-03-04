<template>
    <div class="d-block align-items-start text-center" style="height:100vh;">
        <anime-info-modal ref="animeInfoModal"></anime-info-modal>
        
        <div v-if="!loaded" class="w-100 text-center text-light font-weight-bold">
            <i class="fas fa-spinner fa-2x fa-spin"></i>
        </div>


        <div class="w-100 d-block mb-2" v-else>
            <slide-y-down-transition :duration="200">
                <card-view
                v-if="$root.seasonView=='card'"
                @open-modal="openModal"
                :show="show"
                :screen="$root.screen"
                :animes="$root.season"></card-view>

                <list-view
                v-else
                :view="$root.seasonView"
                @open-modal="openModal"
                :show="show"
                :screen="$root.screen"
                :animes="$root.season"></list-view>
            </slide-y-down-transition>

            <button
            v-if="(show < $root.season.length || $root.season.length > show)
            && show+50 < $root.season.length"
            @click="show+=50"
            type="button"
            class="btn btn-secondary">
                Show more
            </button>
        </div>

        <!-- <zoom-x-transition :duration="500">
            <card-view :is="comp" v-if="view=='card'" @open-modal="openModal" :screen="screen" :animes="animes"></card-view>
            <list-view v-else :view="view" @open-modal="openModal" :screen="screen" :animes="animes"></list-view>
        </zoom-x-transition> -->
</div>

</template>

<script>
  import axios from 'axios';
  import animeInfoModal from '@/components/animeInfoModal.vue';
  import cardView from '@/components/season/cardView.vue'
  import listView from '@/components/season/listView.vue'
  import dayjs from 'dayjs'
  import relativeTime from 'dayjs/plugin/relativeTime';
    export default{
        name: 'season',
        components: {
            'anime-info-modal': animeInfoModal,
            'card-view': cardView,
            'list-view': listView,
        },
        head: {
            title() {
                return {
                    inner: 'Seasonal anime - '+this.$route.params.season+' '+this.$route.params.year,
                    separator: '|',
                    complement: 'Anime'
                }
            },
            meta(){
                return  [
                    {
                        name: 'description',
                        content: 'Check out all the anime of '+this.$route.params.season+' '+this.$route.params.year
                    }
                ]
            }
        },
        data(){
            return{
                show: 0,
                sort: true,
                loaded: false,
            }
        },
        methods: {
            sortByScore(sort){
                this.$root.season.sort((a, b) => sort == 'desc' ? (parseFloat(b.score) - parseFloat(a.score))
                    : parseFloat(a.score) - parseFloat(b.score));
                this.sort=sort;
            },
            sortByMembers(sort){
                this.$root.season.sort((a, b) => sort == 'desc' ? (parseFloat(b.members) - parseFloat(a.members))
                    : parseFloat(a.members) - parseFloat(b.members));
                this.sort=sort;
            },
            sortByTitle(sort){
                this.items.sort((a, b) => sort == 'desc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title));
                this.sort=sort;
            },
            getSeason(){
                let animes=[];
                let self=this;


                axios.get("https://api.jikan.moe/v3/season/"+this.$route.params.year+"/"+this.$route.params.season.toLowerCase())
                .then(response =>{
                    self.loaded=false;
                    console.log(response.data);

                    for(let i=0; i<response.data.anime.length; i++){
                        if(!response.data.anime[i].continuing){
                            animes.push({
                                id: response.data.anime[i].mal_id,
                                title: response.data.anime[i].title,
                                image: response.data.anime[i].image_url,
                                score: response.data.anime[i].score,
                                members: response.data.anime[i].members,
                                episodes: response.data.anime[i].episodes,
                                story: response.data.anime[i].synopsis,
                                storyToggled: false,
                                start_date: dayjs(response.data.anime[i].airing_start).format('MMM DD'),
                                date: response.data.anime[i].airing_start
                                ? response.data.anime[i].airing_start.substring(0,10)
                                +' '+
                                response.data.anime[i].airing_start.substring(11,19)
                                : null,
                                genres: response.data.anime[i].genres,
                                r18: response.data.anime[i].r18,
                                kids: response.data.anime[i].kids
                            });
                        }
                    }
                    

                    if(localStorage.animeList){
                        animes.forEach(item => {
                            item.status = JSON.parse(localStorage.animeList).filter(anime => anime.id === item.id)[0]
                            ? JSON.parse(localStorage.animeList).filter(anime => anime.id === item.id)[0].status
                            : null
                        });
                    }

                    self.loaded=true;
                    // self.animes=animes;
                    self.$root.season=animes;
                    self.show=animes.length>=50 ? 50 : animes.length;
                    console.log('season',animes);
                }).catch(error =>{
                    console.log(error);
                    this.$notify({
                        group: 'foo',
                        type: 'error',
                        title: '<h6>Failed to load season. Please try again!</h6>'
                    });
                    self.loaded=true;
                });
            },
            openModal(ref,id,title) {
                ref=="animeInfoModal"
                ? this.$refs.animeInfoModal.openModal(ref,id,title)
                : this.$refs.mangaInfoModal.openModal(ref,id,title)
            }
        },
        created(){
            this.getSeason();
        },
        mounted(){
            dayjs.extend(relativeTime);
        }
    }
</script>
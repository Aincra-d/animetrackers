<template>
    <div class="d-block align-items-start text-center">
        <anime-info-modal
        v-if="$route.params.type=='anime'"
        ref="animeInfoModal">
        </anime-info-modal>

        <manga-info-modal
        v-else ref="mangaInfoModal">
        </manga-info-modal>

       <div class="w-100 text-left">
             <h3 class="text-light">
              <span>Recommendations</span>

              <button
              @click="changeView('list')"
              style="outline:0;"
              class="bg-transparent border-0 font-weight-bold float-right mt-1"
              :class="view == 'list' ? 'text-primary' : 'text-light'">
                <i class="fas fa-th-list fa-sm"></i>
              </button>

              <button
              @click="changeView('card')"
              style="outline:0;"
              class="bg-transparent border-0 font-weight-bold float-right mt-1"
              :class="view == 'card' ? 'text-primary' : 'text-light'">
                <i class="fas fa-th fa-sm"></i>
              </button>

            </h3>
        </div>

        <div v-if="loaded">
            <slide-y-down-transition :duration="200">
                <card-view
                v-if="view == 'card'"
                @open-modal="openModal"
                :slider="false"
                :screen="$root.screen"
                :recommendations="recommendations">
                </card-view>

                <list-view
                v-else
                @open-modal="openModal"
                :screen="$root.screen"
                :recommendations="recommendations">
                </list-view>
            </slide-y-down-transition>
        </div>

        <div v-else class="w-100 text-center font-weight-bold text-light">
            <span>
                <i class="fas fa-spinner fa-2x fa-spin"></i>
            </span>
        </div>

        <div
        v-if="loaded && recommendations.length == 0"
        class="w-100 text-center text-light">
            <h6>No recommendations have been added.</h6>
        </div>
    </div>
</template>

<script>
  import axios from 'axios';
  import animeInfoModal from '@/components/animeInfoModal.vue';
  import mangaInfoModal from '@/components/mangaInfoModal.vue';
  import cardView from '@/components/titleInfo/recommendations/cardView.vue'
  import listView from '@/components/titleInfo/recommendations/listView.vue'
    export default{
        name: 'titleRecommendations',
        components: {
            'anime-info-modal': animeInfoModal,
            'manga-info-modal': mangaInfoModal,
            'card-view': cardView,
            'list-view': listView
        },
        head: {
            title() {
                return {
                    inner: this.$route.params.title.split('-').join(' ')+' - Recommendations',
                    separator: '-',
                    complement: 'Anime'
                }
            },
            meta(){
                return  [
                    {
                        name: 'description',
                        content: 'Check out all titles that have been recommended to you, if you liked '+this.$route.params.title.split('-').join(' '),
                        id: this.$route.params.titleid
                    }
                ]
            }
        },
        data(){
            return{
                recommendations: [],
                loaded: false,
                view: sessionStorage.recView !== undefined ? sessionStorage.recView : 'card'
            }
        },
        methods: {
            changeView(view){
                sessionStorage.setItem('recView',view);
                this.view=view;
            },
            openModal(ref,id,title) {
                this.$route.params.type == 'manga'
                ? this.$refs.mangaInfoModal.openModal(ref,id,title)
                : this.$refs.animeInfoModal.openModal(ref,id,title)
            }
        },
        created(){
            let self=this;
            let recommendations=[];

            axios.get("https://api.jikan.moe/v3/"+this.$route.params.type+"/"+this.$route.params.titleid+"/recommendations")
            .then(response =>{
                console.log(response.data)

                response.data.recommendations.slice(0,50).forEach(item => {
                    recommendations.push({
                        id: item.mal_id,
                        image: item.image_url,
                        title: item.title,
                        count: item.recommendation_count
                    });
                });

                let my_list=localStorage[this.$route.params.type+'List'];

                if(my_list){
                    recommendations.forEach(item => {
                        item.status = JSON.parse(my_list).filter(list_item => list_item.id === item.id)[0]
                        ? JSON.parse(my_list).filter(list_item => list_item.id === item.id)[0].status
                        : null
                    });
                }

                console.log('recommendations',recommendations);

                self.recommendations = recommendations;
                self.loaded = true;
            }).catch(error =>{
                console.log(error);
                this.$notify({
                    group: 'foo',
                    type: 'error',
                    title: '<h6>Failed to load recommendations. Please try again!</h6>'
                });
                self.loaded=true;
            });
        }
    }
</script>
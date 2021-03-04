<template>
    <div class="d-block align-items-start text-center">
        <manga-info-modal ref="mangaInfoModal"></manga-info-modal>

       <div class="w-100 text-left">
             <h3 class="text-light">
              Recommendations

              <button @click="changeView('list')" style="outline:0;" class="bg-transparent border-0 font-weight-bold float-right mt-1" :class="view=='list' ? 'text-primary' : 'text-light'">
                <i class="fas fa-th-list fa-sm"></i>
              </button>

              <button @click="changeView('card')" style="outline:0;" class="bg-transparent border-0 font-weight-bold float-right mt-1" :class="view=='card' ? 'text-primary' : 'text-light'">
                <i class="fas fa-th fa-sm"></i>
              </button>

            </h3>
        </div>

        <div v-if="loaded">
            <card-view v-if="view=='card'" @open-modal="openModal" :screen="screen" :recommendations="recommendations"></card-view>
            <list-view v-else @open-modal="openModal" :screen="screen" :recommendations="recommendations"></list-view>
        </div>

        <div v-else class="w-100 text-center font-weight-bold text-light">
            <span>
                <i class="fas fa-spinner fa-2x fa-spin"></i>
            </span>
        </div>
    </div>
</template>

<script>
  import axios from 'axios';
  import mangaInfoModal from '@/components/mangaInfoModal.vue';
  import cardView from '@/components/mangaInfo/recommendations/cardView.vue'
  import listView from '@/components/mangaInfo/recommendations/listView.vue'
    export default{
        name: 'mangaRecommendations',
        components: {
            'manga-info-modal': mangaInfoModal,
            'card-view': cardView,
            'list-view': listView
        },
        data(){
            let recommendations=[];
            axios.get("https://api.jikan.moe/v3/manga/"+this.$route.params.mangaid+"/recommendations")
            .then(response =>{
                console.log(response.data)
                for(let i=0; i<response.data.recommendations.length; i++){
                    recommendations.push({
                        id: response.data.recommendations[i].mal_id,
                        image: response.data.recommendations[i].image_url,
                        title: response.data.recommendations[i].title,
                        count: response.data.recommendations[i].recommendation_count
                    });
                }
                this.$data.loaded=true;
            }).catch(error =>{ console.log(error) });
            return{
                recommendations: recommendations,
                loaded: false,
                screen: window.innerWidth,
                info: {},
                infoLoaded: false,
                view: sessionStorage.recView!==undefined ? sessionStorage.recView : 'card'
            }
        },
        methods: {
            onResize(){
                this.screen=window.innerWidth
            },
            changeView(view){
                sessionStorage.setItem('recView',view);
                this.view=view;
            },
            openModal(ref,id,title) {
                this.$refs.mangaInfoModal.openModal(ref,id,title)
            },
            closeModal(ref) {
                this.$refs[ref].close();
            }
        },
        mounted(){
            window.addEventListener("resize",this.onResize)
        }
    }
</script>
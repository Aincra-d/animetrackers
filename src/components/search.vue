<template>
    <div>
        <manga-info-modal
        v-if="$route.params.type == 'manga'"
        ref="mangaInfoModal">
        </manga-info-modal>

        <anime-info-modal
        v-else
        ref="animeInfoModal">
        </anime-info-modal>

        <div>
            <div class="w-100 d-block">
                <div class="w-100 text-center text-light" v-if="!loaded">
                    <i class="fas fa-spinner fa-2x fa-spin"></i>
                </div>

                <search-item
                v-else
                :view="$root.searchView"
                @open-modal="openModal"
                :screen="$root.screen"
                :items="$root.search_results">
                </search-item>

                <!-- <paginate
                :array="items"
                :perPage="50">
                </paginate> -->
            </div>
        </div>
    </div>
</template>

<script>
import mangaInfoModal   from '@/components/mangaInfoModal.vue';
import animeInfoModal   from '@/components/animeInfoModal.vue';
import searchItem       from '@/components/search/searchItem.vue';
import axios            from 'axios';
import dayjs            from 'dayjs';
import relativeTime     from 'dayjs/plugin/relativeTime';
export default {
  name: 'search',
  components: {
      'manga-info-modal': mangaInfoModal,
      'anime-info-modal': animeInfoModal,
      'search-item': searchItem
    },
    head: {
        title() {
            return {
                inner: 'Search'+(this.$route.query.search!='' ? ' - '+this.$route.query.search.split('-').join(' ') : ''),
                separator: '-',
                complement: 'Anime'
            }
        },
        meta(){
            return  [
                {
                    name: 'description',
                    content: 'Search anime, manga, character and people.'
                }
            ]
        }
    },
    data() {
        return {
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
        }
    },
    mounted(){
        dayjs.extend(relativeTime);
    },
    created(){
        let items=[];
        let self=this;

        let type=this.$route.params.type=='characters' ? 'character' : this.$route.params.type;

        let request_url="https://api.jikan.moe/v3/search/"+type+"?q="+this.$route.query.search.split('-').join('%')
        +(this.$route.query.type ? '&type='+this.$route.query.type : '')
        +(this.$route.query.order_by ? '&order_by='+this.$route.query.order_by : '')
        +(this.$route.query.rated ? '&rated='+this.$route.query.rated : '')
        +(this.$route.query.sort ? '&sort='+this.$route.query.sort : '');
        
        axios.get(request_url)
        .then(response => {
            console.log(response.data);
            let list=response.data.results;

            for(let i=0;i<list.length;i++){
                let favourited = false;
                if(this.$route.params.type == 'characters'){
                    favourited = localStorage.favourites
                    ? JSON.parse(localStorage.favourites).characters.filter(character => character.id === list[i].mal_id).length > 0
                    : false
                }
                else{
                    favourited = localStorage.favourites
                    ? JSON.parse(localStorage.favourites).people.filter(person => person.id === list[i].mal_id).length > 0
                    : false
                }

                items.push({
                    id: list[i].mal_id,
                    cover: list[i].image_url,
                    title: list[i].title || list[i].name,
                    score: list[i].score,
                    members: list[i].members,
                    r18: list[i].rated == 'Rx',
                    aired_from: list[i].start_date && dayjs(list[i].start_date.substring(0,10)).format('MMM YYYY'),
                    story: list[i].synopsis,
                    storyToggled: false,
                    favourited: favourited
                });
            }

            let my_list=localStorage[this.$route.params.type+'List'];

            if(my_list){
                items.forEach(item => {
                    item.status = JSON.parse(my_list).filter(list_item => list_item.id === item.id)[0]
                    ? JSON.parse(my_list).filter(list_item => list_item.id === item.id)[0].status
                    : null
                });
            }

            self.$root.search_results=items;
            self.loaded=true;
        }).catch(error =>{
            console.log(error);
            this.$notify({
                group: 'foo',
                type: 'error',
                title: '<h6>Failed to load search results. Please try again!</h6>'
            });
            self.loaded=true;
        });
    }
}
</script>

<style>
@media(max-width: 991px){
    .ui-modal__container{
        max-height: 80vh !important;
      }
    .ui-modal__body{
        max-height: 80vh !important;
    }
  }
  .ui-modal__body{
    padding-left:0 !important;
    padding-right:0 !important;
  }
  .anime-cover-container{
    height:280px;
    background-size: cover;
    background-position: top;
    background-repeat: no-repeat;
  }
</style>

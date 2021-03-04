<template>
    <div style="height:100vh;">

        <manga-info-modal
        v-if="$route.params.type=='manga'"
        ref="mangaInfoModal">    
        </manga-info-modal>

        <anime-info-modal
        v-else
        ref="animeInfoModal">
        </anime-info-modal>

        <div>
            <div class="w-100 d-block">
                <div
                v-if="!loaded"
                class="w-100 text-center text-light">
                    <i class="fas fa-spinner fa-2x fa-spin"></i>
                </div>

                <top-list
                v-else
                :view="$root.topView"
                @open-modal="openModal"
                :screen="$root.screen"
                :items="items">
                </top-list>    
            </div>

            <paginate
            :array="items"
            :perPage="perPage">
            </paginate>
        </div>
    </div>
</template>

<script>
import mangaInfoModal from  '@/components/mangaInfoModal.vue';
import animeInfoModal from  '@/components/animeInfoModal.vue';
import topList        from  '@/components/toplist/topList.vue';
import paginate       from  '@/components/paginate.vue';
import axios          from  'axios';
import dayjs          from  'dayjs';
import relativeTime   from  'dayjs/plugin/relativeTime';
export default {
  name: 'toplist',
  components: {
      'manga-info-modal': mangaInfoModal,
      'anime-info-modal': animeInfoModal,
      'top-list': topList,
      paginate
    },
    head: {
        title() {
            return {
                inner: 'Toplist',
                separator: '-',
                complement: 'Anime'
            }
        },
        meta(){
            return  [
                {
                    name: 'description',
                    content: 'Check out the different toplist of Anime.'
                }
            ]
        }
    },
    data() {
        return {
            items: [],
            loaded: false,
            screen: window.innerWidth,
            perPage: this.$route.name == 'toplist' ? 50 : 100
        }
    },
    methods: {
        openModal(ref,id,title) {
            ref=="animeInfoModal"
            ? this.$refs.animeInfoModal.openModal(ref,id,title)
            : this.$refs.mangaInfoModal.openModal(ref,id,title)
        }
    },
    mounted(){
      dayjs.extend(relativeTime);
    },
    created(){
        let currentPage=this.$route.params.page;
        let items=[];
        let self=this;
        let request_url;
        let base_url="https://api.jikan.moe/v3/";

        switch(this.$route.name){
            case 'genreTop':
            request_url="genre/"+this.$route.params.type+"/"+this.$route.params.genreid+"/"+currentPage;
            break;

            case 'studioTop':
            request_url="producer/"+this.$route.params.studioid+"/"+currentPage;
            break;

            case 'magazineTop':
            request_url="magazine/"+this.$route.params.magazineid+"/"+currentPage;
            break;

            case 'toplist':
            request_url="top/"+this.$route.params.type+"/"+currentPage+(this.$route.params.subtype ? "/"+this.$route.params.subtype : '');
            break;
        }

          
        axios.get(base_url+request_url)
        .then(response => {
            console.log(response.data);
            let list;

            switch(this.$route.name){
                case 'genreTop':
                list=this.$route.params.type=='anime' ? response.data.anime : response.data.manga; break;

                case 'studioTop': list=response.data.anime; break;

                case 'magazineTop': list=response.data.manga; break;

                case 'toplist': list=response.data.top; break;
            }

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
                    title: list[i].title,
                    score: list[i].score,
                    favourites: list[i].favorites,
                    members: list[i].members,
                    aired_from: list[i].start_date
                    || (
                      (list[i].airing_start
                        && dayjs(list[i].airing_start.substring(0,10)).format('MMM YYYY'))
                      || (list[i].publishing_start
                        && dayjs(list[i].publishing_start.substring(0,10)).format('MMM YYYY'))
                      ),
                    story: list[i].synopsis,
                    storyToggled: false,
                    genres: list[i].genres,
                    r18: list[i].r18,
                    kids: list[i].kids,
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

            console.log('top_items', items);
            self.items=items;
            self.loaded=true;
        }).catch(error => {
            console.log(error);
            this.$notify({
                group: 'foo',
                type: 'error',
                title: '<h6>Failed to load toplist. Please try again!</h6>'
            });
        });
    }
}
</script>
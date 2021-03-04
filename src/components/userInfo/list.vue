<template>
    <div class="d-block align-items-start text-center">
        <manga-info-modal
        v-if="$route.params.type=='manga'"
        ref="mangaInfoModal">
        </manga-info-modal>
        
        <anime-info-modal
        v-else
        ref="animeInfoModal">
        </anime-info-modal>

        <div
        v-if="!loaded"
        class="w-100 text-center text-light font-weight-bold">
            <i class="fas fa-spinner fa-2x fa-spin"></i>
        </div>

        <div
        v-else
        class="w-100 d-block">
            <select-status class="w-50 d-inline-block text-left">
            </select-status>

            <change-view
            class="w-50 d-inline-block text-right align-bottom"
            :view="view"
            @change-view="changeView"
            @sort-by-score="sortByScore"
            @sort-by-title="sortByTitle">
            </change-view>
        </div>

    <div class="w-100 d-block">
        <slide-y-down-transition :duration="200">
            <card-view
            v-if="view == 'card'"
            @open-modal="openModal"
            :items="items">
            </card-view>

            <list-view
            v-else
            :view="view"
            @open-modal="openModal"
            :items="items">
            </list-view>
        </slide-y-down-transition>
    </div>

    <paginate
    v-if="$route.params.username"
    :array="items"
    :perPage="300">
    </paginate>

    <pagination
    v-else
    :perPage="per_page"
    :allPages="Math.round(list.length/per_page)">
    </pagination>
</div>

</template>

<script>
import axios            from   'axios';
import mangaInfoModal   from   '@/components/mangaInfoModal.vue';
import animeInfoModal   from   '@/components/animeInfoModal.vue';
import cardView         from   '@/components/userInfo/list/itemCards.vue'
import listView         from   '@/components/userInfo/list/itemList.vue'
import paginate         from   '@/components/paginate.vue'
import pagination       from   '@/components/pagination.vue'
import changeView       from   '@/components/userInfo/list/changeView.vue'
import selectStatus     from   '@/components/userInfo/list/selectStatus.vue'
export default{
    name: 'list',
    components: {
        paginate,
        pagination,
        'manga-info-modal': mangaInfoModal,
        'anime-info-modal': animeInfoModal,
        'card-view': cardView,
        'list-view': listView,
        'change-view': changeView,
        'select-status': selectStatus
    },
    head: {
        title() {
            return {
                inner: this.$route.params.username.split('-').join(' ')+' - List',
                separator: '-',
                complement: 'Anime'
            }
        },
        meta(){
            return  [
                {
                    name: 'description',
                    content: 'Check out all the anime/manga '+this.$route.params.username.split('-').join(' ')+' has watched, rated, dropped etc.',
                    id: this.$route.params.titleid
                }
            ]
        }
    },
    data(){
        return{
            items: [],
            list: [],
            loaded: false,
            view: sessionStorage.listView || 'card',
            per_page: 100
        }
    },
    methods: {
        sortByScore(sort){
            this.items.sort((a, b) => sort == 'desc' ? (parseFloat(b.score) - parseFloat(a.score))
                : parseFloat(a.score) - parseFloat(b.score));
        },
        sortByTitle(sort){
            this.items.sort((a, b) => sort == 'desc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title));
        },
        changeView(view){
            sessionStorage.setItem('listView',view);
            this.view=view;
        },
        openModal(ref,id,title) {
            ref=="animeInfoModal"
            ? this.$refs.animeInfoModal.openModal(ref,id,title)
            : this.$refs.mangaInfoModal.openModal(ref,id,title)
        },
        getMalList(){
            let items=[];
            let self=this;

            axios.get("https://api.jikan.moe/v3/user/"+self.$route.params.username+"/"+self.$route.params.type+"list/"+self.$route.params.status+'/'+self.$route.params.page)
            .then(response =>{
                console.log(response.data);

                let list=self.$route.params.type=='anime' ? response.data.anime : response.data.manga;
                for(let i=0; i<list.length; i++){
                    items.push({
                        id: list[i].mal_id,
                        image: list[i].image_url,
                        title: list[i].title,
                        score: list[i].score,
                        progress: list[i].watched_episodes || list[i].read_chapters,
                        status: list[i].reading_status || list[i].watching_status
                    });
                }
                self.items=items;
                self.loaded=true;
            }).catch(error =>{
                console.log(error);
                this.$notify({
                    group: 'foo',
                    type: 'error',
                    title: '<h6>Failed to load list. Please try again!</h6>'
                });
                self.loaded=true;
            });
        },
        getLocalList(){
            let items=[];
            let per_page=this.per_page;

            if(this.$route.params.type == 'anime'){
                items=this.$route.params.status != 'all'
                ? JSON.parse(localStorage.animeList).filter(anime => (anime.status.split(' ').join('').split('-').join('')).toLowerCase()==this.$route.params.status)
                : JSON.parse(localStorage.animeList)
            }
            else {
                items=this.$route.params.status != 'all'
                ? JSON.parse(localStorage.mangaList).filter(manga => (manga.status.split(' ').join('').split('-').join('')).toLowerCase() == this.$route.params.status)
                : JSON.parse(localStorage.mangaList)
            }

            this.list=items;
            this.items=items.slice((this.$route.params.page)*per_page-per_page,(this.$route.params.page)*per_page);
            this.loaded=true;
        }
    },
    created(){
        this.$route.params.username ? this.getMalList() : this.getLocalList();
    }
}
</script>
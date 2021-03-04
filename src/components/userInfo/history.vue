<template>
    <div class="d-block align-items-start text-center">
        <manga-info-modal
        v-if="$route.params.type=='manga' || !$route.params.type"
        ref="mangaInfoModal">
        </manga-info-modal>
        
        <anime-info-modal
        v-if="$route.params.type=='anime' || !$route.params.type"
        ref="animeInfoModal">
        </anime-info-modal>

        <div
        v-if="!loaded"
        class="w-100 text-center text-light font-weight-bold">
            <i class="fas fa-spinner fa-2x fa-spin"></i>
        </div>

        <br><br>

    <div class="w-100 d-block">
        <history-list
        :history="history"
        @open-modal="openModal">
        </history-list>
    </div>

    <pagination
    v-if="!$route.params.username"
    :perPage="per_page"
    :allPages="Math.round(list.length/per_page)">
    </pagination>
</div>

</template>

<script>
  import axios          from 'axios';
  import historyList    from '@/components/userInfo/history/historyList.vue'
  // import selectType     from '@/components/userInfo/history/selectType.vue'
  import mangaInfoModal from '@/components/mangaInfoModal.vue';
  import animeInfoModal from '@/components/animeInfoModal.vue';
  import pagination     from '@/components/pagination.vue';
  import dayjs          from 'dayjs';
  import relativeTime   from 'dayjs/plugin/relativeTime';
  import utc            from 'dayjs/plugin/utc'; 
    export default{
        name: 'history',
        components: {
            'history-list': historyList,
            // 'select-type': selectType,
            'manga-info-modal': mangaInfoModal,
            'anime-info-modal': animeInfoModal,
            pagination
        },
        data(){
            return{
                history: [],
                list: [],
                per_page: 30,
                loaded: false
            }
        },
        methods: {
            getMalHistory(){
                let history=[];
                let self=this;

                let request_url=(!this.$route.params.type)
                ? "https://api.jikan.moe/v3/user/"+this.$route.params.username+"/history"
                : "https://api.jikan.moe/v3/user/"+this.$route.params.username+"/history/"+this.$route.params.type;

                axios.get(request_url)
                .then(response =>{
                    console.log(response.data);

                    for(let i=0; i<response.data.history.length; i++){
                      history.push({
                        id: response.data.history[i].meta.mal_id,
                        type: response.data.history[i].meta.type,
                        title: response.data.history[i].meta.name,
                        increment: response.data.history[i].increment,
                        updated: dayjs.utc(
                            response.data.history[i].date.substring(0,10)
                            +' '+
                            response.data.history[i].date.substring(11,19)
                            ).fromNow()
                        });
                    }

                    self.history=history;
                    self.loaded=true;
                }).catch(error =>{
                    console.log(error);
                    this.$notify({
                        group: 'foo',
                        type: 'error',
                        title: '<h6>Failed to load history. Please try again!</h6>'
                    });
                    self.loaded=true;
                });
            },
            getLocalHistory(){
                let history=[];
                let list;
                let per_page=this.per_page;
                let anime_list=JSON.parse(localStorage.animeList);
                let manga_list=JSON.parse(localStorage.mangaList);

                anime_list.forEach(item => item.type='anime');
                manga_list.forEach(item => item.type='manga');

                if(this.$route.params.type)
                    list=this.$route.params.type === 'anime' ? anime_list : manga_list
                else
                    list=anime_list.concat(manga_list);

                list.sort((a,b) => new Date(b.date) - new Date(a.date));

                history=list.slice((this.$route.params.page)*per_page-per_page,(this.$route.params.page)*per_page);

                this.list=list;
                this.history=history;
                this.loaded=true;
                console.log(history)
                //console.log('paginated',history.slice((this.$route.params.page)*50-50,(this.$route.params.page)*50))
            },
            openModal(ref,id,title) {
                ref=="animeInfoModal"
                ? this.$refs.animeInfoModal.openModal(ref,id,title)
                : this.$refs.mangaInfoModal.openModal(ref,id,title)
            }
        },
        created(){
            this.$route.params.username ? this.getMalHistory() : this.getLocalHistory();
            dayjs.extend(relativeTime);
            dayjs.extend(utc);

            if(!this.$route.params.username)
                this.list.forEach(item => item.updated = dayjs(item.date).fromNow());
        }
    }
</script>

<style scoped>
  .anime-cover-container{
    height:280px;
    background-size: cover;
    background-position: top;
    background-repeat: no-repeat;
  }
</style>

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
</style>
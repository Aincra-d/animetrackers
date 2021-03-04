<template>
	<div>
        <h3 class="text-light">
            Episodes
        </h3>

        <episodes
        v-if="loaded"
        :episodes="episodes">
        </episodes>

        <div
        v-else
        class="w-100 text-center font-weight-bold text-light">
          <span>
            <i class="fas fa-spinner fa-2x fa-spin"></i>
          </span>
        </div>

        <div
        v-if="loaded && episodes.length==0"
        class="w-100 text-center text-light">
            <h6>No episodes have been added.</h6>
        </div>

        <paginate
        v-if="episodes.length==100"
        :array="episodes"
        :perPage="100">
        </paginate>
	</div>
</template>

<script>
  import axios from 'axios';
  import paginate from '@/components/paginate.vue';
  import episodes from '@/components/titleInfo/episodes/episode.vue';
	export default{
		name: 'titleEpisodes',
    components: {
      paginate,
      episodes
    },
    head: {
        title() {
            return {
                inner: this.$route.params.title.split('-').join(' ')+' - Episodes',
                separator: '-',
                complement: 'Anime'
            }
        },
        meta(){
            return  [
                {
                    name: 'description',
                    content: 'Check out all the episode information about '+this.$route.params.title.split('-').join(' '),
                    id: this.$route.params.titleid
                }
            ]
        }
    },
    data(){
        return{
            episodes: [],
            pages: 0,
            loaded: false
        }
    },
    created(){
        let currentPage=parseInt(this.$route.params.page);
        let episodes=[];
        let self=this;

        axios.get("https://api.jikan.moe/v3/anime/"+this.$route.params.titleid+"/episodes/"+currentPage)
        .then(response => {
            console.log(response.data);

            for(let i=0; i<response.data.episodes.length; i++){
                episodes.push({
                    id: response.data.episodes[i].episode_id,
                    title: response.data.episodes[i].title,
                    romanji_title: response.data.episodes[i].title_romanji,
                    aired: response.data.episodes[i].aired,
                    filler: response.data.episodes[i].filler,
                    recap: response.data.episodes[i].recap
                });
            }
            self.episodes=episodes;
            self.pages=response.data.episodes_last_page;
            self.loaded=true;
        }).catch(error =>{
            console.log(error);
            this.$notify({
                group: 'foo',
                type: 'error',
                title: '<h6>Failed to load episodes. Please try again!</h6>'
            });
            self.loaded=true;
        });
    }
}
</script>
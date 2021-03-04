<template>
	<div>
    <h3 class="text-light">
      Episodes
    </h3>

    <episodes v-if="loaded" :episodes="episodes"></episodes>
    <div v-else class="w-100 text-center font-weight-bold text-light">
      <span>
        <i class="fas fa-spinner fa-2x fa-spin"></i>
      </span>
    </div>

    <pagination v-show="episodes[0].allPages>1" :perPage="100" :allPages="episodes[0].allPages"></pagination>

	</div>

</template>

<script>
  import axios from 'axios';
  import pagination from '@/components/pagination.vue';
  import episodes from '@/components/animeInfo/episodes/episode.vue';
	export default{
		name: 'allEpisodes',
    components: {
      pagination,
      episodes
    },
    data(){
      let allPages;
      let currentPage=parseInt(this.$route.params.page);
      let episodes=[];
      let self=this;


      axios.get("https://api.jikan.moe/v3/anime/"+this.$route.params.animeid+"/episodes/"+currentPage)
      .then(response => {
        console.log(response.data);
        allPages=response.data.episodes_last_page;

        for(let i=0; i<response.data.episodes.length; i++){
          episodes.push({
            id: response.data.episodes[i].episode_id,
            title: response.data.episodes[i].title,
            romanji_title: response.data.episodes[i].title_romanji,
            aired: response.data.episodes[i].aired,
            filler: response.data.episodes[i].filler,
            recap: response.data.episodes[i].recap,
            allPages: allPages
          });
        }

        self.loaded=true;
      }).catch(error => { console.log(error) });


      return{
        episodes: episodes,
        loaded: false
      }
    }
	}
</script>
<template>
  <div>
    <h3 class="text-light">
      User updates
    </h3>

    <ratings v-if="loaded" :ratings="ratings"></ratings>
    <div v-else class="w-100 text-center font-weight-bold text-light">
      <span>
        <i class="fas fa-spinner fa-2x fa-spin"></i>
      </span>
    </div>

    <paginate :array="ratings" :perPage="75"></paginate>
  </div>
</template>

<script>
  import axios from 'axios';
  import paginate from '@/components/paginate.vue';
  import rating from '@/components/animeInfo/ratings/rating.vue';
  import dayjs from 'dayjs';
  import relativeTime from 'dayjs/plugin/relativeTime';
  import utc from 'dayjs/plugin/utc';
  export default{
    name: 'allRatings',
    components: {
        paginate,
        'ratings': rating
    },
    data(){
      let currentPage=parseInt(this.$route.params.page);
      let ratings=[];
      let self=this;


      axios.get("https://api.jikan.moe/v3/anime/"+this.$route.params.animeid+"/userupdates/"+currentPage)
      .then(response => {
        console.log(response.data);
        for(let i=0; i<response.data.users.length; i++){
            ratings.push({
                username: response.data.users[i].username,
                image: response.data.users[i].image_url,
                score: response.data.users[i].score || 0,
                status: response.data.users[i].status,
                episodes_seen: response.data.users[i].episodes_seen || 0,
                date: dayjs.utc(response.data.users[i].date.substring(0,10)+' '+response.data.users[i].date.substring(11,19)).fromNow()
            });
        }
       self.loaded=true;
      }).catch(error => { console.log(error) });


      return{
        ratings: ratings,
        loaded: false
      }
    },
    mounted(){
        dayjs.extend(relativeTime);
        dayjs.extend(utc);
        dayjs.utc().format()
    }
}
</script>
<template>
    <div>
    <h3 class="text-light">
      Reviews
    </h3>

    <reviews v-if="loaded" :reviews="reviews"></reviews>

    <div v-else class="w-100 text-center font-weight-bold text-light">
      <span>
        <i class="fas fa-spinner fa-2x fa-spin"></i>
      </span>
    </div>

    <paginate :array="reviews" :perPage="20"></paginate>

    </div>
</template>

<script>
  import axios from 'axios';
  import paginate from '@/components/paginate.vue';
  import review from '@/components/animeInfo/reviews/review.vue';
  export default{
    name: 'animeReviews',
    components: {
        paginate,
        'reviews': review
    },
    data(){
      let currentPage=parseInt(this.$route.params.page);
      let reviews=[];
      let self=this;


      axios.get("https://api.jikan.moe/v3/anime/"+this.$route.params.animeid+"/reviews/"+currentPage)
      .then(response => {
        console.log(response.data);

        for(let i=0; i<response.data.reviews.length; i++){
          reviews.push({
            id: response.data.reviews[i].mal_id,
            helpful_count: response.data.reviews[i].helpful_count,
            date: response.data.reviews[i].date,
            reviewer: {
                image: response.data.reviews[i].reviewer.image_url,
                username: response.data.reviews[i].reviewer.username,
                episodes_seen: response.data.reviews[i].reviewer.episodes_seen,
            },
            scores: {
                overall: response.data.reviews[i].reviewer.scores.overall,
                story: response.data.reviews[i].reviewer.scores.story,
                animation: response.data.reviews[i].reviewer.scores.animation,
                sound: response.data.reviews[i].reviewer.scores.sound,
                character: response.data.reviews[i].reviewer.scores.character,
                enjoyment: response.data.reviews[i].reviewer.scores.enjoyment
            },
            review: response.data.reviews[i].content,
            toggled: false
          });
        }

        self.loaded=true;
      }).catch(error => { console.log(error) });


      return{
        reviews: reviews,
        loaded: false
      }
    }
}
</script>
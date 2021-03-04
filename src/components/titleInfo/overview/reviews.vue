<template>
    <div>
        <ui-collapsible
            v-if="reviews.length!=0"
            title="Reviews"
            class="text-dark bg-transparent border-0"
            :open="$root.screen>991">
            <reviews
            v-if="loaded"
            :reviews="reviews">
            </reviews>

            <div
            v-else
            class="w-100 text-center font-weight-bold text-light">
              <span>
                <i class="fas fa-spinner fa-2x fa-spin"></i>
              </span>
            </div>
        </ui-collapsible>
    </div>
</template>

<script>
  import axios from 'axios';
  import review from '@/components/titleInfo/reviews/review.vue';
  export default{
    name: 'titleReviews',
    components: {
        'reviews': review
    },
    data(){
        return{
            reviews: [],
            loaded: false
        }
    },
    methods: {
        getReviews(){
            let reviews=[];
            let self=this;

            axios.get("https://api.jikan.moe/v3/"+this.$route.params.type+"/"+this.$route.params.titleid+"/reviews/1")
            .then(response => {
                console.log(response.data);

                for(let i=0; i<response.data.reviews.length && i<=4; i++){
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
                            art: response.data.reviews[i].reviewer.scores.art,
                            sound: response.data.reviews[i].reviewer.scores.sound,
                            character: response.data.reviews[i].reviewer.scores.character,
                            enjoyment: response.data.reviews[i].reviewer.scores.enjoyment
                        },
                        review: response.data.reviews[i].content,
                        toggled: false
                    });
                }
                self.reviews=reviews;
                self.loaded=true;
          }).catch(error =>{
            console.log(error);
            this.$notify({
                group: 'foo',
                type: 'error',
                title: '<h6>Failed to load reviews. Please try again!</h6>'
            });
            self.loaded=true;
        });
      }
  },
    created(){
        let self=this;
        setTimeout(function() {
            self.getReviews();
        }, 2000);
    }
}
</script>
<template>
  <div class="d-block align-items-start">
    <h3 class="text-light">
      News
    </h3>

    <news v-if="loaded" :allNews="news"></news>
    <div v-else class="w-100 text-center font-weight-bold text-light">
      <span>
        <i class="fas fa-spinner fa-2x fa-spin"></i>
      </span>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import mangaNew from '@/components/mangaInfo/news/news.vue';
  export default{
    name: 'mangaNews',
    components: {
      'news': mangaNew
    },
    data(){
      let news=[];
      let self=this;

        axios.get("https://api.jikan.moe/v3/manga/"+this.$route.params.mangaid+"/news")
        .then(response =>{
          console.log(response.data);
          for(let i=0; i<response.data.articles.length; i++){
             news.push({
              title: response.data.articles[i].title,
              date: response.data.articles[i].date,
              writer: response.data.articles[i].author_name,
              image: response.data.articles[i].image_url,
              intro: response.data.articles[i].intro
            });
          }
          self.loaded=true;
        }).catch(error =>{ console.log(error) });
        return{
            news: news,
            loaded: false
        }
    }
  }
</script>
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

        <div v-if="loaded && news.length==0" class="w-100 text-center text-light">
            <h6>No news have been added.</h6>
        </div>
    </div>
</template>

<script>
  import axios from 'axios';
  import titleNew from '@/components/titleInfo/news/news.vue';
  export default{
    name: 'titleNews',
    components: {
      'news': titleNew
    },
    head: {
        title() {
            return {
                inner: this.$route.params.title.split('-').join(' ')+' - News',
                separator: '-',
                complement: 'Anime'
            }
        },
        meta(){
            return  [
                {
                    name: 'description',
                    content: 'Read all news related to '+this.$route.params.title.split('-').join(' '),
                    id: this.$route.params.titleid
                }
            ]
        }
    },
    data(){
        return{
            news: [],
            loaded: false
        }
    },
    created(){
        let news=[];
        let self=this;

        axios.get("https://api.jikan.moe/v3/"+this.$route.params.type+"/"+this.$route.params.titleid+"/news")
        .then(response =>{
            // console.log(response.data);
            for(let i=0; i<response.data.articles.length; i++){
                news.push({
                    id: response.data.articles[i].url.match(/[0-9]+/),
                    title: response.data.articles[i].title,
                    date: response.data.articles[i].date.substring(0,10),
                    writer: response.data.articles[i].author_name,
                    image: response.data.articles[i].image_url,
                    intro: response.data.articles[i].intro
                });
            }
            self.news=news;
            self.loaded=true;
        }).catch(error =>{
                console.log(error);
                this.$notify({
                    group: 'foo',
                    type: 'error',
                    title: '<h6>Failed to load news. Please try again!</h6>'
                });
                self.loaded=true;
            });
    }
}
</script>
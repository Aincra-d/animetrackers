<template>
  <div>
    <div>
      <router-link to="/top/1" class="font-weight-bolder text-primary font-18">Check toplist</router-link>
      <pagination :perPage="data.perPage" :allPages="data.allPages"></pagination>
      <anime :data="data" :animeInfo="data.animeInfo"></anime>
      <addAnime :animeInfo="data.animeInfo"></addAnime>
      <pagination :perPage="data.perPage" :allPages="data.allPages"></pagination>
    </div>
  </div>
</template>

<script>
import anime from '@/components/anime.vue';
import addAnime from '@/components/addAnime.vue';
import pagination from '@/components/pagination.vue';
import axios from 'axios';
export default {
  name: 'home',
  components: {
      anime,
      addAnime,
      pagination
    },
    data() {
      let currentPage=this.$route.params.page;
      let perPage=10;
      let allAnime = JSON.parse(localStorage.animeInfo).length;
      let allPages=Math.round(allAnime/perPage);
      let limitStart=currentPage*perPage-perPage;
      let array=JSON.parse(localStorage.animeInfo);
      let anime=[];
      for(let i=0;i<array.length;i++){
        anime.push(
          {
            id: array[i].id,
            cover: array[i].cover,
            title: array[i].title,
            status: array[i].status,
            favourite: array[i].favourite,
            myScore: array[i].myScore
          }
        );
      }
      let animeInfo=anime.splice(limitStart,perPage);
      return {
        data: {
          animeInfo: animeInfo,
          limitStart: limitStart,
          allPages: allPages,
          perPage: perPage
        }
      }
    },
    methods: {
      goBack() {
        window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
      }
    },
    created(){
      let anime=[];
      axios.get("https://api.jikan.moe/v3/top/anime/1/tv")
      .then(response => {
        console.log(response.data.top);
        for(let i=0;i<response.data.top.length;i++){
          anime.push({
            id: response.data.top[i].mal_id,
            cover: response.data.top[i].image_url,
            title: response.data.top[i].title,
            status: 'Select status',
            favourite: false,
            myScore: ''
          })
        }
      })
      .catch(error => { console.log(error) })
    }
}
</script>

<style>
  @media (max-width: 776px){
  .page-buttons{
    width: 25px !important;
    border-radius: 100% !important;
    padding-left: 2px;
    padding-right: 2px;
  }

  .page-buttons-container{
    margin:0!important;
  }

  .select-page{
    border-radius: 100%;
    width: 25px;
    height: 25px;
    border-width: 2px;
  }
}
@media(min-width: 776px){
  .page-buttons{
    width: 40px !important;
  }
}
.select-page{
  -webkit-appearance: none !important;
  -moz-appearance: none !important;
  text-align-last:center !important;
  text-align: center !important ;
  width: 30px;
  height: 30px;
  border-width: 2px;
}
</style>
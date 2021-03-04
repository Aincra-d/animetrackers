<template>
  <div>
    <div v-if="loaded" class="mt-4">
        <h5 class="text-light">
            Top airing
            <router-link to="/top/anime/airing/1" class="text-light">
                <span class="float-right font-weight-normal font-italic font-14 mt-2">
                    See more <i class="fas fa-angle-right"></i>
                </span>
            </router-link>
        </h5>
        <div class="w-100 slider rounded" style="overflow-x: auto !important;overflow-y: hidden !important;height:relative;white-space: nowrap;">
            <div :key="anime.id" v-for="anime in animes" class="d-inline-block slider-card mx-1 position-relative">
                <router-link :to="'/anime/'+anime.id+'/'+(anime.title.split(' ').join('-')).replace('/','-')">
                    <img v-if="lazy" :alt="anime.title" style="object-fit: cover;" v-lazy="anime.image" class="rounded">
                    <img v-else :alt="anime.title" style="object-fit: cover;" :src="anime.image" class="rounded">
                </router-link>
                <span class="position-absolute top-2 right-2 rounded px-1 item-stat font-weight-normal text-light" :class="screen<991 ? 'font-11' : 'font-13'">
                    <i class="fas fa-star text-warning" :class="screen<991 ? 'fa-sm' : 'fa-md'"></i>
                    {{anime.score || '-'}}
                </span>
                
                <div class="w-100">
                    <router-link :to="'/anime/'+anime.id+'/'+(anime.title.split(' ').join('-')).replace('/','-')">
                        <span style="font-size: 9px !important;" class="font-weight-bold text-light">
                            <a class="text-light">
                                {{anime.title.length>15 ? anime.title.substring(0,15)+"..." : anime.title}}
                            </a>
                        </span>
                    </router-link>
                </div>
            </div>
        </div>
    </div>

    <div v-else class="w-100 text-center">
      <i class="fas fa-spinner text-light fa-2x fa-spin"></i>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default{
    name: 'topAiring',
    data(){
      return{
        screen: window.innerWidth,
        loaded: false,
        lazy: true,
        animes: []
      }
    },
    methods: {
      onResize(){
        this.screen=window.innerWidth
      },
      getTopAiring(){
        let self=this;
        let animes=[];
        axios.get("https://api.jikan.moe/v3/top/anime/1/airing")
        .then(response => {
          console.log(response.data);

          let list=response.data.top;
          for(let i=0;i<list.length && i<=14;i++){
            animes.push({
              id: list[i].mal_id,
              image: list[i].image_url,
              title: list[i].title,
              score: list[i].score
            });
          }
          self.loaded=true;
          self.animes=animes;
          sessionStorage.setItem('topAiring',JSON.stringify(animes));
        })
        .catch(error => { console.log(error) });
      }
    },
    created(){
      if(!sessionStorage.topAiring) {
        this.getTopAiring();
      }
      else {
        this.animes=JSON.parse(sessionStorage.topAiring)
        this.loaded=true;
        this.lazy=false;
      }
    },
    mounted(){
      window.addEventListener("resize",this.onResize)
    }
  }
</script>
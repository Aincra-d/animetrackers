<template>
  <div>
    <div v-if="loaded" class="mt-4">
        <h5 class="text-light">
            Popular characters
            <router-link to="/top/characters/1" class="text-light">
                <span class="float-right font-weight-normal font-italic font-14 mt-2">
                    See more <i class="fas fa-angle-right"></i>
                </span>
            </router-link>
        </h5>
        <div class="w-100 slider rounded" style="overflow-x: auto !important;overflow-y: hidden !important;height:relative;white-space: nowrap;">
            <div :key="char.id" v-for="char in characters" class="d-inline-block slider-card mx-1 position-relative">
                <router-link :to="'/character/'+char.id+'/'+(char.title.split(',').join('').split(' ').join('-')).replace('/','-')">
                    <img v-if="lazy" :alt="char.title" style="object-fit: cover;" v-lazy="char.image" class="rounded">
                    <img v-else :alt="char.title" style="object-fit: cover;" :src="char.image" class="rounded">
                </router-link>
                <span class="position-absolute top-2 right-2 rounded px-1 item-stat font-weight-normal text-light" :class="screen<991 ? 'font-11' : 'font-13'">
                    <i class="fas fa-heart text-danger" :class="screen<991 ? 'fa-sm' : 'fa-md'"></i>
                    {{char.favourites || '-'}}
                </span>
                
                <div class="w-100">
                    <router-link :to="'/character/'+char.id+'/'+(char.title.split(',').join('').split(' ').join('-')).replace('/','-')">
                        <span style="font-size: 9px !important;" class="font-weight-bold text-light">
                            <a class="text-light">
                                {{char.title.length>15 ? char.title.substring(0,15)+"..." : char.title}}
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
    name: 'topCharacters',
    data(){
      return{
        screen: window.innerWidth,
        loaded: false,
        lazy: true,
        characters: []
      }
    },
    methods: {
      onResize(){
        this.screen=window.innerWidth
      },
      getTopCharacters(){
        let self=this;
        let characters=[];
        axios.get("https://api.jikan.moe/v3/top/characters/1")
        .then(response => {
          console.log(response.data);

          let list=response.data.top;
          for(let i=0;i<list.length && i<=14;i++){
            characters.push({
              id: list[i].mal_id,
              image: list[i].image_url,
              title: list[i].title,
              favourites: list[i].favorites
            });
          }
          self.loaded=true;
          self.characters=characters;
          sessionStorage.setItem('topCharacters',JSON.stringify(characters));
        })
        .catch(error => { console.log(error) });
      }
    },
    created(){
      if(!sessionStorage.topCharacters) {
        let self=this;
        setTimeout(function() {
            self.getTopCharacters();
        }, 2000);
      }
      else {
        this.characters=JSON.parse(sessionStorage.topCharacters)
        this.loaded=true;
        this.lazy=false;
      }
    },
    mounted(){
      window.addEventListener("resize",this.onResize)
    }
  }
</script>
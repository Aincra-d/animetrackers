<template>
  <div>
    <div v-if="loaded" class="mt-4">
        <h5 class="text-light">
            Popular people
            <router-link to="/top/people/1" class="text-light">
                <span class="float-right font-weight-normal font-italic font-14 mt-2">
                    See more <i class="fas fa-angle-right"></i>
                </span>
            </router-link>
        </h5>
        <div class="w-100 slider rounded" style="overflow-x: auto !important;overflow-y: hidden !important;height:relative;white-space: nowrap;">
            <div :key="person.id" v-for="person in people" class="d-inline-block slider-card mx-1 position-relative">
                <router-link :to="'/people/'+person.id+'/'+(person.title.split(',').join('').split(' ').join('-')).replace('/','-')">
                    <img v-if="lazy" :alt="person.title" style="object-fit: cover;" v-lazy="person.image" class="rounded">
                    <img v-else :alt="person.title" style="object-fit: cover;" :src="person.image" class="rounded">
                </router-link>
                <span class="position-absolute top-2 right-2 rounded px-1 item-stat font-weight-normal text-light" :class="screen<991 ? 'font-11' : 'font-13'">
                    <i class="fas fa-heart text-danger" :class="screen<991 ? 'fa-sm' : 'fa-md'"></i>
                    {{person.favourites || '-'}}
                </span>
                
                <div class="w-100">
                    <router-link :to="'/people/'+person.id+'/'+(person.title.split(',').join('').split(' ').join('-')).replace('/','-')">
                        <span style="font-size: 9px !important;" class="font-weight-bold text-light">
                            <a class="text-light">
                                {{person.title.length>15 ? person.title.substring(0,15)+"..." : person.title}}
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
    name: 'topPeople',
    data(){
      return{
        screen: window.innerWidth,
        loaded: false,
        lazy: true,
        people: []
      }
    },
    methods: {
      onResize(){
        this.screen=window.innerWidth
      },
      getTopPeople(){
        let self=this;
        let people=[];
        axios.get("https://api.jikan.moe/v3/top/people/1")
        .then(response => {
          console.log(response.data);

          let list=response.data.top;
          for(let i=0;i<list.length && i<=14;i++){
            people.push({
              id: list[i].mal_id,
              image: list[i].image_url,
              title: list[i].title,
              favourites: list[i].favorites
            });
          }
          self.loaded=true;
          self.people=people;
          sessionStorage.setItem('topPeople',JSON.stringify(people));
        })
        .catch(error => { console.log(error) });
      }
    },
    created(){
      if(!sessionStorage.topPeople) {
        let self=this;
        setTimeout(function() {
            self.getTopPeople();
        }, 2000);
      }
      else {
        this.people=JSON.parse(sessionStorage.topPeople)
        this.loaded=true;
        this.lazy=false;
      }
    },
    mounted(){
      window.addEventListener("resize",this.onResize)
    }
  }
</script>
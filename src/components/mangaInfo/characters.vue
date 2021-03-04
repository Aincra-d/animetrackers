<template>
  <div>
    <h3 class="text-light">
      Characters
    </h3>

    <characters v-if="loaded" :screen="screen" :characters="characters"></characters>
    <div v-else class="w-100 text-center font-weight-bold text-light">
      <span>
        <i class="fas fa-spinner fa-2x fa-spin"></i>
      </span>
    </div>
  </div>

</template>

<script>
  import axios from 'axios';
  import characters from '@/components/mangaInfo/characters/character.vue';
  export default{
    name: 'mangaCharacters',
    components: {
      characters
    },
    data(){
      let characters=[];
      axios.get("https://api.jikan.moe/v3/manga/"+this.$route.params.mangaid+"/characters")
      .then(response =>{
        console.log(response.data);

        for(let i=0; i<response.data.characters.length; i++){
          characters.push({
            id: response.data.characters[i].mal_id,
            image: response.data.characters[i].image_url,
            name: response.data.characters[i].name,
            role: response.data.characters[i].role
          });
        }
        this.$data.loaded=true;
      }).catch(error =>{ console.log(error) });

      return{
        characters: characters,
        loaded: false,
        screen: window.innerWidth
      }
    },
    methods: {
      onResize(){
        this.screen=window.innerWidth
      }
    },
    mounted(){
      window.addEventListener("resize",this.onResize)
    }
  }
</script>
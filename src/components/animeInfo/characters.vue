<template>
  <div>
    <h3 class="text-light">
      Characters
    </h3>

    <characters v-if="loaded" :characters="characters"></characters>
    <div v-else class="w-100 text-center font-weight-bold text-light">
      <span>
        <i class="fas fa-spinner fa-2x fa-spin"></i>
      </span>
    </div>
  </div>

</template>

<script>
  import axios from 'axios';
  import character from '@/components/animeInfo/characters/character.vue';
  export default{
    name: 'allCharacters',
    components: {
      'characters': character
    },
    data(){
      let characters=[];
      let voice_actor={};
      let self=this;


      axios.get("https://api.jikan.moe/v3/anime/"+this.$route.params.animeid+"/characters_staff")
      .then(response =>{
        console.log(response.data);

        for(let i=0; i<response.data.characters.length; i++){
          for(let j=0; j<response.data.characters[i].voice_actors.length; j++){
            if(response.data.characters[i].voice_actors[j].language=='Japanese') voice_actor={
              id: response.data.characters[i].voice_actors[j].mal_id,
              name: response.data.characters[i].voice_actors[j].name,
              image: response.data.characters[i].voice_actors[j].image_url
              .split('r/42x62').join('')
              .substring(0,response.data.characters[i].voice_actors[j].image_url.indexOf('?'))
            }
          }
          characters.push({
            id: response.data.characters[i].mal_id,
            image: response.data.characters[i].image_url,
            name: response.data.characters[i].name,
            role: response.data.characters[i].role,
            voice_actor: voice_actor
          });
        }

        self.loaded=true;
      }).catch(error =>{ console.log(error) });


      return{
        characters: characters,
        loaded: false
      }
    }
  }
</script>
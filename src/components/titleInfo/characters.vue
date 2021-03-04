<template>
    <div>
        <h3 class="text-light">
          Characters
        </h3>

        <div v-if="loaded">
            <anime-characters
            v-if="$route.params.type=='anime'"
            :slider="false"
            :characters="characters">
            </anime-characters>

            <manga-characters
            v-else
            :slider="false"
            :characters="characters">
            </manga-characters>
        </div>

        <div
        v-else
        class="w-100 text-center font-weight-bold text-light">
          <span>
            <i class="fas fa-spinner fa-2x fa-spin"></i>
          </span>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import animeCharacters from '@/components/titleInfo/characters/anime.vue';
import mangaCharacters from '@/components/titleInfo/characters/manga.vue';
export default{
    name: 'titleCharacters',
    components: {
        'anime-characters': animeCharacters,
        'manga-characters': mangaCharacters
    },
    data(){
        return{
            characters: [],
            loaded: false,
        }
    },
    head: {
        title() {
            return {
                inner: this.$route.params.title.split('-').join(' ')+' - Characters',
                separator: '-',
                complement: 'Anime'
            }
          },
          meta(){
            return  [
                {
                    name: 'description',
                    content: 'Check out all the characters in '+this.$route.params.title.split('-').join(' '),
                    id: this.$route.params.titleid
                }
            ]
        }
    },
    methods: {
        onResize(){
            this.screen=window.innerWidth
        }
    },
    mounted(){
        window.addEventListener("resize",this.onResize)
    },
    created(){
        let characters=[];
        let self=this;

        if(this.$route.params.type=='anime'){
            let voice_actor={};
            
            axios.get("https://api.jikan.moe/v3/anime/"+this.$route.params.titleid+"/characters_staff")
            .then(response =>{
                console.log(response.data);

                for(let i=0; i<response.data.characters.length; i++){
                    for(let j=0; j<response.data.characters[i].voice_actors.length; j++){
                        if(response.data.characters[i].voice_actors[j].language=='Japanese') voice_actor={
                            id: response.data.characters[i].voice_actors[j].mal_id,
                            name: response.data.characters[i].voice_actors[j].name,
                            image: response.data.characters[i].voice_actors[j].image_url
                            .split('r/42x62').join('')
                            .substring(0,response.data.characters[i].voice_actors[j].image_url.indexOf('?')),
                            favourited: localStorage.favourites
                            ? JSON.parse(localStorage.favourites).people.filter(person => person.id === response.data.characters[i].voice_actors[j].mal_id).length > 0
                            : false
                        }
                    }
                    characters.push({
                        id: response.data.characters[i].mal_id,
                        image: response.data.characters[i].image_url,
                        name: response.data.characters[i].name,
                        role: response.data.characters[i].role,
                        favourited: localStorage.favourites
                        ? JSON.parse(localStorage.favourites).characters.filter(character => character.id === response.data.characters[i].mal_id).length > 0
                        : false,
                        voice_actor: voice_actor
                    });
                }

                self.characters=characters;
                self.loaded=true;
                console.log('characters',self.characters)
            }).catch(error =>{
                console.log(error);
                this.$notify({
                    group: 'foo',
                    type: 'error',
                    title: '<h6>Failed to load characters. Please try again!</h6>'
                });
                self.loaded=true;
            });
        }
        else{
            axios.get("https://api.jikan.moe/v3/manga/"+this.$route.params.titleid+"/characters")
            .then(response =>{
                console.log(response.data);

                for(let i=0; i<response.data.characters.length; i++){
                    characters.push({
                        id: response.data.characters[i].mal_id,
                        image: response.data.characters[i].image_url,
                        name: response.data.characters[i].name,
                        role: response.data.characters[i].role,
                        favourited: localStorage.favourites
                        ? JSON.parse(localStorage.favourites).characters.filter(character => character.id === response.data.characters[i].mal_id).length > 0
                        : false
                    });
                }

                self.characters=characters;
                self.loaded=true;
            }).catch(error =>{
                console.log(error);
                this.$notify({
                    group: 'foo',
                    type: 'error',
                    title: '<h6>Failed to load characters. Please try again!</h6>'
                });
                self.loaded=true;
            });
        }
    }
}
</script>
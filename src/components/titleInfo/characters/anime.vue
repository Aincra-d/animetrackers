<template>
    <div>
        <div
        :style="{whiteSpace: slider ? 'nowrap' : 'normal'}"
        class="w-100 text-center character-container position-relative">
            <div
            :key="character.id"
            v-for="character in characters"
            class="w-xs-98 mx-auto w-sm-48 w-md-48 w-lg-48 w-xl-48
            d-inline-block my-1 align-middle mx-sm-1 position-relative">
                <div class="w-50 d-inline-block text-left float-left character-cover">
                    <router-link
                    class="text-left"
                    :to="'/character/'+character.id+'/'+
                    ((character.name+'')
                    .split(',').join('')
                    .split(' ').join('-')
                    .replace('/','-'))">
                        <img
                        :alt="character.name"
                        v-lazy="character.image"
                        class="cover character-cover">
                    </router-link>

                    <button
                    @click="updateFavourite('characters',character.id, character.name, character.image)"
                    class="position-absolute top-0 left-0 bg-transparent border-0 anime-info py-1">
                        <i
                        style="text-shadow: 0px 0px 10px black"
                        :class="character.favourited ? 'text-danger' : 'text-light'"
                        class="fas fa-heart rounded fa-lg">
                        </i>
                    </button>

                    <span
                    class="float-right w-50 font-xs-12 font-13 mr-3 mr-sm-2 mr-md-4 mr-lg-0"
                    style="height: 100%">
                      {{(character.name+'').split(', ').join(' ')}}

                      <br>

                      <i class="align-middle">{{character.role}}</i>
                    </span>
                </div>

                 <div class="w-50 d-inline-block text-right float-right voice-actor-cover">
                    <span
                    v-if="character.voice_actor.id"
                    class="float-left w-50 font-xs-12 font-13 ml-3 ml-sm-2 ml-md-4 ml-lg-0"
                    style="height: 100%">
                      {{(character.voice_actor.name+'').split(', ').join(' ')}}

                      <br>

                      <i class="align-middle">Japanese</i>
                    </span>

                    <router-link
                    class="text-right"
                    v-if="character.voice_actor.id"
                    :to="'/people/'+character.voice_actor.id+'/'+
                    ((character.voice_actor.name+'')
                    .split(',').join('')
                    .split(' ').join('-'))
                    .replace('/','-')">
                        <img
                        :alt="character.voice_actor.name"
                        v-lazy="character.voice_actor.image"
                        class="cover voice-actor-cover">
                    </router-link>

                    <button
                    @click="updateFavourite('people',character.voice_actor.id, character.voice_actor.name, character.voice_actor.image)"
                    class="position-absolute top-0 right-0 bg-transparent border-0 anime-info py-1">
                        <i
                        style="text-shadow: 0px 0px 10px black"
                        :class="character.voice_actor.favourited ? 'text-danger' : 'text-light'"
                        class="fas fa-heart rounded fa-lg">
                        </i>
                    </button>
                </div>
            </div>
        </div>
    </div>
    </template>

<script>
export default {
    name: 'character',
    props: {
        characters: Array,
        slider: Boolean
    },
    data(){
        return {
            favourites: localStorage.favourites
            ? JSON.parse(localStorage.favourites).characters
            : []
        }
    },
    methods: {
        updateFavourite(type,id,name,image){
            if(localStorage.favourites){
                let favourites=JSON.parse(localStorage.favourites);
                let favourited=favourites[type].filter(favourite => favourite.id === id).length > 0;

                if(favourited){
                    favourites[type].splice(favourites[type].findIndex(favourite => favourite.id === id),1);
                }
                else{
                    favourites[type].push({
                        id: id,
                        name: name,
                        image: image
                    });
                }

                this.$notify({
                    group: 'foo',
                    type: 'success',
                    title: '<h6>'+(favourited ? 'Removed' : 'Added')+' <u>'+name+'</u> '+(favourited ? 'from' : 'to')+' favourites!</h6>'
                });
                localStorage.setItem('favourites', JSON.stringify(favourites));
            }
            else{
                let favourites={
                    anime: [],
                    manga: [],
                    characters: type === 'characters' ?
                    [{
                        id: id,
                        name: name,
                        image: image
                    }] : [],
                    people: type === 'people' ?
                    [{
                        id: id,
                        name: name,
                        image: image
                    }] : [],
                };

                this.$notify({
                    group: 'foo',
                    type: 'success',
                    title: '<h6>Added <u>'+name+'</u> to favourites!</h6>'
                });
                localStorage.setItem('favourites', JSON.stringify(favourites));
            }

            if(type === 'characters'){
                this.characters.filter(character => character.id === id)[0].favourited = !this.characters.filter(character => character.id === id)[0].favourited;
            }
            else{
                this.characters.filter(character => character.voice_actor.id === id)[0].voice_actor.favourited = !this.characters.filter(character => character.voice_actor.id === id)[0].voice_actor.favourited;
            }
        }
    }
}
</script>

<style scoped>
    @media(max-width: 991px){
      .cover{
        width:65px;
        height:110px;
      }
      .character-container div{
        height:110px;
      }
    }

    @media(min-width: 992px) and (max-width: 1200px){
      .cover{
        width:90px;
        height:140px;
      }
      .character-container div{
        height:140px;
      }
    }

    @media(min-width: 1201px){
      .cover{
        width:90px;
        height:140px;
      }
      .character-container div{
        height:140px;
      }
    }
    
    .cover{
      object-fit: cover;
    }

    .voice-actor-cover{
      border-top-right-radius: 5%;
      border-bottom-right-radius: 5%;
    }

    .character-cover{
      border-top-left-radius: 5%;
      border-bottom-left-radius: 5%;
    }

    .character-container div{
      background-color: rgba(0,0,0,0.3);
    }

    .character-container{
        overflow-x: auto;
    }
</style>
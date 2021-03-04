<template>
    <div>
        <div
        :style="{whiteSpace: slider ? 'nowrap' : 'normal'}"
        class="text-center wrapper">
            <div
            :key="character.id"
            v-for="character in characters"
            class="d-inline-block align-items-end ml-2 my-1 character-container">
                <div class="position-relative">
                    <router-link :to="'/character/'+character.id+'/'+character.name.split(',').join('').split(' ').join('-')">
                        <img
                        :alt="character.name"
                        v-lazy="character.image"
                        class="rounded character-cover">
                    </router-link>

                    <button
                    @click="updateFavourite(character.id, character.name, character.image)"
                    class="position-absolute top-0 right-0 bg-transparent border-0 anime-info py-1">
                        <i
                        style="text-shadow: 0px 0px 10px black"
                        :class="character.favourited ? 'text-danger' : 'text-light'"
                        class="fas fa-heart rounded fa-lg">
                        </i>
                    </button> 

                    <span
                    style="background-color: rgba(0,0,0,0.65);"
                    class="position-absolute top-2 left-2 rounded px-1 font-weight-normal text-light"
                    :class="screen<991 ? 'font-11' : 'font-13'">
                        {{character.role}}
                    </span>
                </div>

                <div class="w-100 bg-dark text-light text-left">
                    <router-link :to="'/character/'+character.id+'/'+character.name.split(',').join('').split(' ').join('-')">
                        <span
                        v-if="screen<991"
                        class="font-12 font-weight-bold text-light">
                            {{character.name.length > 15 ? character.name.substring(0,12)+'...' : character.name}}
                        </span>

                        <span
                        v-else
                        class="font-12 font-weight-bold text-light">
                            {{character.name.length > 20 ? character.name.substring(0,17)+'...' : character.name}}
                        </span>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'mangaCharacter',
    props: {
        characters: Array,
        screen: Number,
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
        updateFavourite(id,name,image){
            if(localStorage.favourites){
                let favourites=JSON.parse(localStorage.favourites);
                let favourited=favourites.characters.filter(character => character.id === id).length > 0;

                if(favourited){
                    favourites.characters.splice(favourites.characters.findIndex(character => character.id === id),1);
                }
                else{
                    favourites.characters.push({
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
                    characters: [{
                        id: id,
                        name: name,
                        image: image
                    }],
                    people: []
                };

                this.$notify({
                    group: 'foo',
                    type: 'success',
                    title: '<h6>Added <u>'+name+'</u> to favourites!</h6>'
                });
                localStorage.setItem('favourites', JSON.stringify(favourites));
            }
            this.characters.filter(character => character.id === id)[0].favourited = !this.characters.filter(character => character.id === id)[0].favourited;
        }
    }
}
</script>

<style scoped>
  @media(max-width: 991px){
    .character-container div:first-child .character-cover{
      width:105px;
      height:155px;
    }
  }

  @media(min-width: 991px){
    .character-container div:first-child .character-cover{
      width:150px;
      height:220px;
    }
  }
  .character-container div:first-child .character-cover{
    vertical-align: bottom;
    object-fit: cover;
  }

  .wrapper{
    overflow-x: auto;
  }
  
</style>
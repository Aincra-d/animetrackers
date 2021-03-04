<template>
    <div>
        <div class="w-100 text-center character-container">
            <div :key="character.id" v-for="character in characters" class="w-xs-100 w-sm-48 w-md-48 w-lg-48 w-xl-48 d-block d-sm-inline-block my-2 align-middle mx-sm-1">
                <router-link :to="'/character/'+character.id+'/'+((character.name+'').split(',').join('').split(' ').join('-').replace('/','-'))">
                    <img v-lazy="character.image" class="cover mx-2 my-2">
                </router-link>

                <router-link v-show="character.voice_actor.id" :to="'/people/'+character.voice_actor.id+'/'+((character.voice_actor.name+'').split(',').join('').split(' ').join('-')).replace('/','-')">
                    <img v-lazy="character.voice_actor.image" class="cover mx-2 my-2">
                </router-link>

                <p class="ml-2 text-light">
                   <span>
                      {{(character.name+'').split(', ').join(' ')}}<br>
                   </span>

                   <span v-show="character.voice_actor.id">
                        - {{(character.voice_actor.name+'').split(', ').join(' ')}}
                    </span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'character',
    props: {
        characters: Array
    }
}
</script>

<style scoped>
    @media(max-width: 991px){
      .cover{
        width:100px;
        height:140px;
        border-radius: 10%;
      }
    }

    @media(min-width: 991px){
      .cover{
        width:120px;
        height:160px;
        border-radius: 10%;
      }
    }

    .cover{
      object-fit: cover;
    }

    .character-container div{
      background-color: rgba(0,0,0,0.3);
      border-radius: 1%;
    }
</style>
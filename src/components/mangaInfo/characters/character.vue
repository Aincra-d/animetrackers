<template>
    <div>
        <div class="text-center">
            <div :key="char.id" v-for="char in characters" class="d-inline-block align-items-end ml-2 my-1 character-container">
                <div>
                    <router-link :to="'/people/'+char.id+'/'+char.name.split(',').join('').split(' ').join('-')">
                        <img v-lazy="char.image" class="rounded">
                    </router-link>
                </div>
                <div class="w-100 bg-dark text-light text-left">
                    <router-link :to="'/people/'+char.id+'/'+char.name.split(',').join('').split(' ').join('-')">
                      <span v-if="screen<991" class="font-12 font-weight-bold text-light">
                        {{char.name.length > 15 ? char.name.substring(0,12)+'...' : char.name}}
                      </span>

                      <span v-else class="font-12 font-weight-bold text-light">
                        {{char.name.length > 20 ? char.name.substring(0,17)+'...' : char.name}}
                      </span>
                    </router-link>
                    <br>
                    <span class="font-12 font-weight-bold text-light">
                      {{char.role}}
                    </span>
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
        screen: Number
    }
}
</script>

<style scoped>
  @media(max-width: 991px){
    .character-container div:first-child img{
      width:105px;
      height:155px;
    }
  }

  @media(min-width: 991px){
    .character-container div:first-child img{
      width:150px;
      height:220px;
    }
  }
  .character-container div:first-child img{
    vertical-align: bottom;
    object-fit: cover;
  }
  
</style>
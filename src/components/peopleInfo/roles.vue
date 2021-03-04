<template>
  <div>
    <ui-collapsible title="Voice acting roles" class="text-light bg-transparent anime-roles" open>
        <div class="w-100 text-center role-container position-relative text-light">
          <div :key="index"
          v-for="(role,index) in roles"
          class="w-xs-98 mx-auto w-sm-48 w-md-48 w-lg-48 w-xl-48 d-block
          d-sm-inline-block my-2 align-middle mx-sm-1 position-relative">

            <div class="w-50 d-inline-block text-left float-left role-cover text-light">
                <router-link
                :to="'/anime/'+role.anime.mal_id+'/'+
                (
                    role.anime.name
                    .split(' ').join('-')
                )
                .replace('/','-')">
                    <img :alt="role.anime.name"
                    v-lazy="role.anime.image_url"
                    class="cover role-cover">
                </router-link>

                <span class="float-right w-50 font-xs-12 font-13 mr-3 mr-sm-2 mr-md-4 mr-lg-0" style="height: 100%">
                  {{role.anime.name.length > 35 ? role.anime.name.substr(0,32)+'...' : role.anime.name}}
                  <br>
                  <i class="align-middle">{{role.role}}</i>
                </span>

                <button 
                @click="openModal('animeInfoModal',role.anime.mal_id,role.anime.name)"
                class="position-absolute top-0 left-0 bg-transparent border-0 anime-info py-1">
                    <i
                    style="text-shadow: 0px 0px 5px black;"
                    class="fas fa-info-circle text-light rounded fa-lg">
                    </i>
                </button> 
            </div>

           <div class="w-50 d-inline-block text-right float-right anime-cover text-light">
            <span class="float-left w-50 font-xs-12 font-13 ml-3 ml-sm-2 ml-md-4 ml-lg-0" style="height: 100%">
                  {{role.character.name}}
                  <br>
                  <i class="align-middle">Japanese</i>
                </span>
                <router-link class="text-right"
                :to="'/character/'+role.character.mal_id+'/'+
                (
                    role.character.name
                    .split(',').join('')
                    .split(' ').join('-')
                )
                .replace('/','-')">
                    <img :alt="role.character.name"
                    v-lazy="role.character.image_url"
                    class="cover anime-cover">
                </router-link>
            </div>

          </div>
        </div>
    </ui-collapsible>
  </div>
</template>

<script>
export default {
    name: 'roles',
    props: {
        roles: Array
    },
    methods: {
        openModal(ref,id,title){
            this.$emit('open-modal',ref,id,title);
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
      .role-container div{
        height:110px;
      }
    }

    @media(min-width: 992px) and (max-width: 1200px){
      .cover{
        width:90px;
        height:140px;
      }
      .role-container div{
        height:140px;
      }
    }

    @media(min-width: 1201px){
      .cover{
        width:90px;
        height:140px;
      }
      .role-container div{
        height:140px;
      }
    }
    
    .cover{
      object-fit: cover;
    }

    .anime-cover{
      border-top-right-radius: 5%;
      border-bottom-right-radius: 5%;
    }

    .role-cover{
      border-top-left-radius: 5%;
      border-bottom-left-radius: 5%;
    }

    .role-container div{
      background-color: rgba(0,0,0,0.3);
    }
</style>
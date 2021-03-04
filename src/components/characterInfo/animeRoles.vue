<template>
    <div>
        <ui-collapsible title="Anime roles" class="text-dark bg-transparent anime-roles" open>
            <div class="text-center">
                 <div :key="anime.id" v-for="anime in char.anime_roles" class="d-inline-block ml-2 my-1 roles-container rounded text-left position-relative">
                    <div class="position-relative">
                        <router-link :to="'/anime/'+anime.mal_id+'/'+(anime.name.split(' ').join('-')).replace('/','-')">
                            <img :alt="anime.name" v-lazy="anime.image_url" class="rounded">
                        </router-link>
                        
                        <span style="background-color: rgba(0,0,0,0.65);" class="position-absolute top-2 left-2 rounded px-1 font-weight-normal text-light" :class="$root.screen<991 ? 'font-11' : 'font-13'">
                            {{anime.role}}

                            <i
                            v-if="anime.status"
                            class="fas fa-circle fa-sm"
                            :class="{'text-success': anime.status === 'Watching',
                            'text-primary': anime.status === 'Completed',
                            'text-warning': anime.status === 'On-hold',
                            'text-danger': anime.status === 'Dropped',
                            'text-secondary': anime.status === 'Plan to watch'}">
                            </i>
                        </span>
                    </div>

                    <div class="w-100 bg-dark text-light">
                        <router-link :to="'/anime/'+anime.mal_id+'/'+anime.name.split(' ').join('-')">
                            <span v-if="$root.screen<991" class="font-12 font-weight-bold text-light">
                                {{anime.name.length > 15 ? anime.name.substring(0,12)+'...' : anime.name}}
                            </span>
                            <span v-else class="font-12 font-weight-bold text-light">
                                {{anime.name.length > 20 ? anime.name.substring(0,17)+'...' : anime.name}}
                            </span>
                        </router-link>
                    </div>

                    <button 
                    @click="openModal('animeInfoModal',anime.mal_id,anime.name)"
                    class="position-absolute top-0 right-0 bg-transparent border-0 anime-info py-1">
                        <i
                        style="text-shadow: 0px 0px 5px black;"
                        class="fas fa-info-circle text-light rounded fa-lg">
                        </i>
                    </button>  
                </div>
            </div>
        </ui-collapsible>
    </div>
</template>

<script>
    export default{
        name: 'animeRoles',
        props: {
            char: Object
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
        .roles-container div:first-child img{
            width:110px;
            height:155px;
        }
    }

    @media(min-width: 991px){
        .roles-container div:first-child img{
            width:150px;
            height:220px;
        }
    }

    .roles-container div:first-child img{
        vertical-align: bottom;
        object-fit: cover;
    }
</style>
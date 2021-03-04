<template>
    <div>
        <ui-collapsible title="Manga roles" class="text-dark bg-transparent manga-roles" open>
            <div class="text-center">
                 <div
                 :key="manga.id"
                 v-for="manga in char.manga_roles"
                 class="d-inline-block ml-2 my-1 roles-container rounded text-left position-relative">
                    <div class="position-relative">
                        <router-link :to="'/manga/'+manga.mal_id+'/'+(manga.name.split(' ').join('-')).replace('/','-')">
                            <img
                            :alt="manga.name"
                            v-lazy="manga.image_url"
                            class="rounded">
                        </router-link>
                        
                        <span
                        style="background-color: rgba(0,0,0,0.65);"
                        class="position-absolute top-2 left-2 rounded px-1 font-weight-normal text-light"
                        :class="$root.screen<991 ? 'font-11' : 'font-13'">
                            {{manga.role}}

                            <i
                            v-if="manga.status"
                            class="fas fa-circle fa-sm"
                            :class="{'text-success': manga.status === 'Reading',
                            'text-primary': manga.status === 'Completed',
                            'text-warning': manga.status === 'On-hold',
                            'text-danger': manga.status === 'Dropped',
                            'text-secondary': manga.status === 'Plan to read'}">
                            </i>
                        </span>
                    </div>

                    <div class="w-100 bg-dark text-light">
                        <router-link :to="'/manga/'+manga.mal_id+'/'+manga.name.split(' ').join('-')">
                            <span
                            v-if="$root.screen<991"
                            class="font-12 font-weight-bold text-light">
                                {{manga.name.length > 15 ? manga.name.substring(0,12)+'...' : manga.name}}
                            </span>

                            <span
                            v-else
                            class="font-12 font-weight-bold text-light">
                                {{manga.name.length > 20 ? manga.name.substring(0,17)+'...' : manga.name}}
                            </span>
                        </router-link>
                    </div>

                    <button 
                    @click="openModal('mangaInfoModal',manga.mal_id,manga.name)"
                    class="position-absolute top-0 right-0 bg-transparent border-0 manga-info py-1">
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
        name: 'mangaRoles',
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
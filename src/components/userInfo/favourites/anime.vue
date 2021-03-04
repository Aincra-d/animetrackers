<template>
    <div>
        <div
        class="w-100 slider rounded favourites-container"
        :class="reordering ? 'text-center re-ordering' : 'not-ordering'">
            <button
            v-if="reordering"
            @click="$emit('save-order',animes,'anime')"
            class="float-right text-light btn btn-link text-light rounded pb-0 my-1">
                <i class="fas fa-check text-success"></i>
            </button>

            <!-- <button
            v-if="reordering"
            @click="reordering=false"
            class="float-right text-light btn btn-link text-light rounded pb-0 my-1">
                <i class="fas fa-times text-danger"></i>
            </button> -->

            <draggable
            v-if="reordering"
            :list="animes"
            @end="test"
            class="list-group d-inline-block"
            ghost-class="ghost"
            >
                <div
                :key="anime.id"
                v-for="(anime,index) in animes"
                class="d-inline-block slider-card mx-1 position-relative text-left">
                    <img
                    :alt="anime.name"
                    style="object-fit: cover;"
                    :src="anime.image_url"
                    class="rounded">
                    
                    <div class="w-100">
                        <span
                        style="font-size: 9px !important;"
                        class="font-weight-bold text-light">
                            <a class="text-light">
                                {{anime.name.length>15 ? anime.name.substring(0,15)+"..." : anime.name}}
                            </a>
                        </span>
                    </div>

                    <button 
                    @click="animes.splice(index, 1)"
                    class="position-absolute top-0 right-0 bg-transparent border-0 anime-info py-1">
                        <i class="fas fa-times text-danger rounded fa-lg"></i>
                    </button>  
                </div>
            </draggable>

            <div
            v-else
            :key="anime.id"
            v-for="anime in animes"
            class="d-inline-block slider-card mx-1 position-relative text-left">
                <router-link :to="'/anime/'+anime.mal_id+'/'+(anime.name.split(' ').join('-')).replace('/','-')">
                    <img
                    :alt="anime.name"
                    style="object-fit: cover;"
                    :src="anime.image_url"
                    class="rounded">
                </router-link>
                
                <div class="w-100">
                    <router-link :to="'/anime/'+anime.mal_id+'/'+(anime.name.split(' ').join('-')).replace('/','-')">
                        <span
                        style="font-size: 9px !important;"
                        class="font-weight-bold text-light">
                            <a class="text-light">
                                {{anime.name.length>15 ? anime.name.substring(0,15)+"..." : anime.name}}
                            </a>
                        </span>
                    </router-link>
                </div>

                <button 
                @click="openModal('animeInfoModal',anime.mal_id,anime.name)"
                class="position-absolute top-0 right-0 bg-transparent border-0 anime-info py-1">
                    <i
                    style="text-shadow: 0px 0px 5px black"
                    class="fas fa-info-circle text-light rounded fa-lg">
                    </i>
                </button>  
            </div>
        </div>
    </div>
</template>

<script>
    import draggable from 'vuedraggable';
    export default{
        name: 'animeFavourites',
        components: {
            draggable
        },
        props: {
            animes: Array,
            reordering: Boolean
        },
        methods: {
            openModal(ref,id,title){
                this.$emit('open-modal',ref,id,title);
            }
        }
    }
</script>

<style scoped>
    .favourites-container.not-ordering{
        overflow-x: auto !important;
        overflow-y: hidden !important;
        height:relative;
        white-space: nowrap;
    }

    .re-ordering .slider-card *{
        cursor: move;
    }
</style>
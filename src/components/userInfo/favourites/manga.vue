<template>
    <div>
        <div
        class="w-100 slider rounded favourites-container"
        :class="reordering ? 'text-center re-ordering' : 'not-ordering'">
            <button
            v-if="reordering"
            @click="$emit('save-order',mangas,'manga')"
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
            :list="mangas"
            @end="test"
            class="list-group d-inline-block"
            ghost-class="ghost"
            >
                <div
                :key="manga.id"
                v-for="(manga,index) in mangas"
                class="d-inline-block slider-card mx-1 position-relative text-left">
                    <img
                    :alt="manga.name"
                    style="object-fit: cover;"
                    :src="manga.image_url"
                    class="rounded">
                    
                    <div class="w-100">
                        <span
                        style="font-size: 9px !important;"
                        class="font-weight-bold text-light">
                            <a class="text-light">
                                {{manga.name.length>15 ? manga.name.substring(0,15)+"..." : manga.name}}
                            </a>
                        </span>
                    </div>

                    <button 
                    @click="mangas.splice(index, 1)"
                    class="position-absolute top-0 right-0 bg-transparent border-0 manga-info py-1">
                        <i class="fas fa-times text-danger rounded fa-lg"></i>
                    </button>  
                </div>
            </draggable>

            <div
            v-else
            :key="manga.id"
            v-for="manga in mangas"
            class="d-inline-block slider-card mx-1 position-relative text-left">
                <router-link :to="'/manga/'+manga.mal_id+'/'+(manga.name.split(' ').join('-')).replace('/','-')">
                    <img
                    :alt="manga.name"
                    style="object-fit: cover;"
                    :src="manga.image_url"
                    class="rounded">
                </router-link>
                
                <div class="w-100">
                    <router-link :to="'/manga/'+manga.mal_id+'/'+(manga.name.split(' ').join('-')).replace('/','-')">
                        <span
                        style="font-size: 9px !important;"
                        class="font-weight-bold text-light">
                            <a class="text-light">
                                {{manga.name.length>15 ? manga.name.substring(0,15)+"..." : manga.name}}
                            </a>
                        </span>
                    </router-link>
                </div>

                <button 
                @click="openModal('mangaInfoModal',manga.mal_id,manga.name)"
                class="position-absolute top-0 right-0 bg-transparent border-0 manga-info py-1">
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
        name: 'mangaFavourites',
        components: {
            draggable
        },
        props: {
            mangas: Array,
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
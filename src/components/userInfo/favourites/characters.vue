<template>
    <div>
        <div
        class="w-100 slider rounded favourites-container"
        :class="reordering ? 'text-center re-ordering' : 'not-ordering'">
            <button
            v-if="reordering"
            @click="$emit('save-order',characters,'characters')"
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
            :list="characters"
            @end="test"
            class="list-group d-inline-block"
            ghost-class="ghost"
            >
               <div
               :key="character.mal_id"
               v-for="(character,index) in characters"
               class="d-inline-block slider-card mx-1 position-relative">
                    <img
                    :alt="character.name"
                    style="object-fit: cover;"
                    :src="character.image_url"
                    class="rounded">
                    
                    <div class="w-100">
                        <span
                        style="font-size: 9px !important;"
                        class="font-weight-bold text-light">
                            <a class="text-light">
                                {{character.name.length>15 ? character.name.substring(0,15)+"..." : character.name}}
                            </a>
                        </span>
                    </div>

                    <button 
                    @click="characters.splice(index, 1)"
                    class="position-absolute top-0 right-0 bg-transparent border-0 anime-info py-1">
                        <i class="fas fa-times text-danger rounded fa-lg"></i>
                    </button>
                </div>
            </draggable>

            <div
            v-else
            :key="character.mal_id"
            v-for="character in characters"
            class="d-inline-block slider-card mx-1 position-relative">
                <router-link :to="'/character/'+character.mal_id+'/'+(character.name.split(',').join('').split(' ').join('-')).replace('/','-')">
                    <img
                    :alt="character.name"
                    style="object-fit: cover;"
                    :src="character.image_url"
                    class="rounded">
                </router-link>
                
                <div class="w-100">
                    <router-link :to="'/character/'+character.mal_id+'/'+(character.name.split(',').join('').split(' ').join('-')).replace('/','-')">
                        <span
                        style="font-size: 9px !important;"
                        class="font-weight-bold text-light">
                            <a class="text-light">
                                {{character.name.length>15 ? character.name.substring(0,15)+"..." : character.name}}
                            </a>
                        </span>
                    </router-link>

                    <button
                    v-if="$route.params.username"
                    @click="updateFavourite(character.mal_id, character.name, character.image_url)"
                    class="position-absolute top-0 right-0 bg-transparent border-0 anime-info py-1">
                        <i
                        style="text-shadow: 0px 0px 10px black"
                        :class="character.favourited ? 'text-danger' : 'text-light'"
                        class="fas fa-heart rounded fa-lg">
                        </i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import draggable from 'vuedraggable';
    export default{
        name: 'characterFavourites',
        components: {
            draggable
        },
        props: {
            characters: Array,
            reordering: Boolean
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
                this.characters.filter(character => character.mal_id === id)[0].favourited = !this.characters.filter(character => character.mal_id === id)[0].favourited;
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
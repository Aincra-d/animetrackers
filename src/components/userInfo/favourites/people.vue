<template>
    <div>
        <div
        class="w-100 slider rounded favourites-container"
        :class="reordering ? 'text-center re-ordering' : 'not-ordering'">
            <button
            v-if="reordering"
            @click="$emit('save-order',people,'people')"
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
            :list="people"
            @end="test"
            class="list-group d-inline-block"
            ghost-class="ghost"
            >
               <div
               :key="person.mal_id"
               v-for="(person,index) in people"
               class="d-inline-block slider-card mx-1 position-relative">
                    <img
                    :alt="person.name"
                    style="object-fit: cover;"
                    :src="person.image_url"
                    class="rounded">
                    
                    <div class="w-100">
                        <span
                        style="font-size: 9px !important;"
                        class="font-weight-bold text-light">
                            <a class="text-light">
                                {{person.name.length>15 ? person.name.substring(0,15)+"..." : person.name}}
                            </a>
                        </span>
                    </div>

                    <button 
                    @click="people.splice(index, 1)"
                    class="position-absolute top-0 right-0 bg-transparent border-0 anime-info py-1">
                        <i class="fas fa-times text-danger rounded fa-lg"></i>
                    </button>
                </div>
            </draggable>

            <div
            v-else
            :key="person.mal_id"
            v-for="person in people"
            class="d-inline-block slider-card mx-1 position-relative">
                <router-link :to="'/person/'+person.mal_id+'/'+(person.name.split(',').join('').split(' ').join('-')).replace('/','-')">
                    <img
                    :alt="person.name"
                    style="object-fit: cover;"
                    :src="person.image_url"
                    class="rounded">
                </router-link>
                
                <div class="w-100">
                    <router-link :to="'/person/'+person.mal_id+'/'+(person.name.split(',').join('').split(' ').join('-')).replace('/','-')">
                        <span
                        style="font-size: 9px !important;"
                        class="font-weight-bold text-light">
                            <a class="text-light">
                                {{person.name.length>15 ? person.name.substring(0,15)+"..." : person.name}}
                            </a>
                        </span>
                    </router-link>

                    <button
                    v-if="$route.params.username"
                    @click="updateFavourite(person.mal_id, person.name, person.image_url)"
                    class="position-absolute top-0 right-0 bg-transparent border-0 anime-info py-1">
                        <i
                        style="text-shadow: 0px 0px 10px black"
                        :class="person.favourited ? 'text-danger' : 'text-light'"
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
        name: 'peopleFavourites',
        components: {
            draggable
        },
        props: {
            people: Array,
            reordering: Boolean
        },
        methods: {
            updateFavourite(id,name,image){
                if(localStorage.favourites){
                    let favourites=JSON.parse(localStorage.favourites);
                    let favourited=favourites.people.filter(person => person.id === id).length > 0;

                    if(favourited){
                        favourites.people.splice(favourites.people.findIndex(person => person.id === id),1);
                    }
                    else{
                        favourites.people.push({
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
                        characters: [],
                        people: [{
                            id: id,
                            name: name,
                            image: image
                        }]
                    };

                    this.$notify({
                        group: 'foo',
                        type: 'success',
                        title: '<h6>Added <u>'+name+'</u> to favourites!</h6>'
                    });
                    localStorage.setItem('favourites', JSON.stringify(favourites));
                }
                this.people.filter(person => person.mal_id === id)[0].favourited = !this.people.filter(person => person.mal_id === id)[0].favourited;
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
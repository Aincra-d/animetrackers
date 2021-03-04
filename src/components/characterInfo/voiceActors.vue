<template>
    <div>
        <ui-collapsible title="Voice actors" class="text-dark bg-transparent voice-actors" open>
            <div class="text-center">
                 <div :key="actor.mal_id" v-for="actor in char.voice_actors" class="d-inline-block ml-2 my-1 actors-container rounded text-left">
                    <div class="position-relative">
                        <router-link :to="'/people/'+actor.mal_id+'/'+(actor.name.split(',').join('').split(' ').join('-')).replace('/','-')">
                            <img :alt="actor.name" v-lazy="actor.image_url" class="rounded">
                        </router-link>

                        <span style="background-color: rgba(0,0,0,0.65);" class="position-absolute top-2 left-2 rounded px-1 font-weight-normal text-light" :class="$root.screen<991 ? 'font-11' : 'font-13'">
                            {{actor.language}}
                        </span>

                        <button
                        @click="updateFavourite(actor.mal_id, actor.name, actor.image_url)"
                        class="position-absolute top-0 right-0 bg-transparent border-0 py-1">
                            <i
                            style="text-shadow: 0px 0px 10px black"
                            :class="actor.favourited ? 'text-danger' : 'text-light'"
                            class="fas fa-heart rounded fa-lg">
                            </i>
                        </button>
                    </div>

                   <div class="w-100 bg-dark text-light">
                        <router-link :to="'/people/'+actor.mal_id+'/'+actor.name.split(',').join('').split(' ').join('-')">
                            <span v-if="$root.screen<991" class="font-12 font-weight-bold text-light">
                                {{actor.name.length > 15 ? actor.name.substring(0,12)+'...' : actor.name}}
                            </span>
                            <span v-else class="font-12 font-weight-bold text-light">
                                {{actor.name.length > 20 ? actor.name.substring(0,17)+'...' : actor.name}}
                            </span>
                        </router-link>
                    </div>
                </div>
            </div>
        </ui-collapsible>
    </div>
</template>

<script>
    export default{
        name: 'voiceActors',
        props: {
            char: Object
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
                this.char.voice_actors.filter(actor => actor.mal_id === id)[0].favourited = !this.char.voice_actors.filter(actor => actor.mal_id === id)[0].favourited;
            }
        }
    }
</script>

<style scoped>
    @media(max-width: 991px){
        .actors-container div:first-child img{
            width:110px;
            height:155px;
        }
    }

    @media(min-width: 991px){
        .actors-container div:first-child img{
            width:150px;
            height:220px;
        }
    }

    .actors-container div:first-child img{
        vertical-align: bottom;
        object-fit: cover;
    }
</style>
<template>
    <div>
        <div
        :key="item.id"
        v-for="(item,index) in items"
        class="w-xs-95 w-sm-95 w-md-100 w-lg-100 w-xl-100 text-left text-light
        d-block my-2 mx-auto mx-lg-0 item-container rounded position-relative">
            
            <!-- <scale-transition :duration="200"> -->
                <item-cover
                class="d-inline-block"
                :item="item"
                :index="index"
                :view="view">
                </item-cover>
            <!-- </scale-transition> -->

            <div
            class="d-inline-block ml-2 text-left align-top"
            :class="{
                'table-sm-info': view == 'list-sm',
                'table-lg-info': view == 'list-lg',
                'list-info': view == 'list'
            }">
                <item-title
                :item="item"
                :index="index"
                :view="view">
                </item-title>

                <item-stats
                :item="item"
                :index="index">
                </item-stats>

                <div
                v-if="$route.params.type != 'characters'
                && $route.params.type != 'people'
                && $route.name != 'toplist'"
                class="genres-container mt-lg-2" :class="view == 'list' ? 'mb-2' : ''">
                    <!-- <router-link
                    :to="'/top/anime/genre/'+genre.id+'/'+genre.name.split(' ').join('-')"
                    :key="genre.id"
                    v-for="genre in item.genres"> -->
                        <button
                        :key="genre.id"
                        v-for="genre in item.genres"
                        type="button"
                        class="btn btn-dark py-0 px-2 mr-1 btn-sm d-inline-block genre
                        font-weight-normal font-xs-11 font-sm-12 font-md-12 font-lg-13 font-xl-15">{{genre.name}}</button>
                    <!-- </router-link> -->
                </div>
            </div>

            <button
            v-if="$route.params.type == 'characters'
            || $route.params.type == 'people'"
            @click="updateFavourite($route.params.type, item.id, item.title, item.cover)"
            class="float-right bg-transparent border-0 py-1">
                <i
                :class="item.favourited ? 'text-danger' : 'text-light'"
                class="fas fa-heart rounded fa-lg">
                </i>
            </button>

            <button
            v-if="$route.params.type != 'characters'
            && $route.params.type != 'people'"
            @click="openModal($route.params.type+'InfoModal',item.id,item.title)"
            class="float-right border-0 rounded bg-transparent py-1">
                <i class="fas fa-info-circle text-light fa-lg"></i>
            </button>

            <button
            v-if="$route.params.type != 'characters'
            && $route.params.type != 'people'
            && $route.name != 'toplist'"
            @click="item.storyToggled=!item.storyToggled"
            class="position-absolute bottom-0 right-0 mr-1 border-0 rounded bg-transparent py-1">
                <i
                :class="item.storyToggled ? 'fas fa-angle-up' : 'fas fa-angle-down'"
                class="text-light fa-lg"></i>
            </button>

            <slide-y-up-transition
            v-if="$route.params.type != 'characters'
            && $route.params.type != 'people'"
            :duration="250">
                <p
                v-if="$route.name != 'toplist' && item.storyToggled"
                class="font-xs-12 font-sm-13 font-md-13 font-lg-14 font-xl-15 pointer m-1 p-1"
                @click="item.storyToggled=!item.storyToggled">
                    {{item.story}}
                </p>
            </slide-y-up-transition>
        </div>
    </div>
</template>

<script>
    import cover from '@/components/toplist/topItem/cover.vue';
    import title from '@/components/toplist/topItem/title.vue';
    import stats from '@/components/toplist/topItem/stats.vue';
    export default{
        name: 'topItem',
        props: {
            items: Array,
            screen: Number,
            view: String
        },
        components: {
            'item-cover': cover,
            'item-title': title,
            'item-stats': stats
        },
        methods: {
            openModal(ref,id,title){
                this.$emit('open-modal',ref,id,title)
            },
            updateFavourite(type,id,name,image){
                if(localStorage.favourites){
                    let favourites=JSON.parse(localStorage.favourites);
                    let favourited=favourites[type].filter(favourite => favourite.id === id).length > 0;

                    if(favourited){
                        favourites[type].splice(favourites[type].findIndex(favourite => favourite.id === id),1);
                    }
                    else{
                        favourites[type].push({
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
                        characters: type === 'characters' ?
                        [{
                            id: id,
                            name: name,
                            image: image
                        }] : [],
                        people: type === 'people' ?
                        [{
                            id: id,
                            name: name,
                            image: image
                        }] : [],
                    };

                    this.$notify({
                        group: 'foo',
                        type: 'success',
                        title: '<h6>Added <u>'+name+'</u> to favourites!</h6>'
                    });
                    localStorage.setItem('favourites', JSON.stringify(favourites));
                }

                this.items.filter(item => item.id === id)[0].favourited = !this.items.filter(item => item.id === id)[0].favourited;
            }
        }
    }
</script>

<style scoped>
   @media(max-width: 991px){

        .table-sm-info{
            max-width: 65%;
        }


        .table-lg-info{
            max-width: 55%;
        }

        .list-info{
            max-width: 80%;
        }
    }

    @media(min-width: 991px){

        .table-sm-info{
            max-width: 80%;
        }


        .table-lg-info{
            max-width: 80%;
        }

        .list-info{
            max-width: 80%;
        }
    }


    .anime-info{
        border-radius: 50%;
    }

    .item-container{
        background-color: rgba(0,0,0,0.3);
        border-bottom-left-radius: 5%;
        border-top-left-radius: 5%;
    }

    .table-sm-info, .table-lg-info{
        white-space: pre-line;
    }

    .genres-container{
        overflow-x: auto;
        white-space: nowrap;
    }

    .genres-container .genre{
        outline:none!important;
        border-radius: 1rem;
    }
</style>
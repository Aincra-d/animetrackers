<template>
    <div>
        <div class="text-center">
            <div
            style="overflow-y: hidden;"
            :key="index"
            v-for="(collection,index) in collections"
            class="d-inline-block collection-container w-xs-30 w-sm-20 w-md-20 w-lg-18 w-xl-18 mx-1 my-2 position-relative">
                <router-link
                :to="'/local/collections/'+collection.type+'/'+collection.id+'/'+collection.name.split(' ').join('-').replace('/','')">
                    <div>
                        <b-carousel
                        id="carousel-fade"
                        interval="3000">
                            <b-carousel-slide
                            :key="item.id"
                            v-for="item in collection.items.slice(0,5)"
                            :img-src="item.image"
                            :img-alt="item.title">
                            </b-carousel-slide>
                        </b-carousel>
                    </div>
                </router-link>

                <span
                class="position-absolute top-2 left-5 text-light bg-dark rounded px-2 font-14"
                style="z-index: 20;">
                    <i
                    class="fas fa-sm mr-1"
                    :class="collection.type == 'anime' ? 'fa-tv' : 'fa-book'"></i>
                    {{collection.items.length}}
                </span>

                <span
                v-if="$root.screen<991"
                class="font-12 font-weight-bold text-light d-block position-absolute bottom-1 left-5 bg-dark w-90"
                style="z-index: 20;">
                    {{collection.name.length > 15 ? collection.name.substring(0,12)+'...' : collection.name}}
                </span>

                <span
                v-else
                class="font-12 font-weight-bold text-light d-block position-absolute bottom-1 left-5 bg-dark w-90"
                style="z-index: 20;">
                    {{collection.name.length > 21 ? collection.name.substring(0,18)+'...' : collection.name}}
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        name: 'collections',
        props: {
            collections: Array
        }
    }
</script>

<style scoped>
    @media(max-width: 991px){
        .collection-cover, .collection-container{
            width:110px;
            height:155px;
        }
    }

    @media(min-width: 991px){
        .collection-container{
            width:150px;
            height:220px;
        }

        .collection-cover{
            height:220px;
        }
    }

    .collection-cover:hover{
        z-index: 10;
        left:0;
    }

    .collection-container{
        overflow-x: hidden;
    }
</style>
<template>
    <div>
         <b-nav-item-dropdown class="text-light" text="Anime" right>
            <router-link class="text-dark ml-4 my-2 d-block w-100" to="/top/anime/1">
                Top rated
            </router-link>

            <router-link class="text-dark ml-4 my-2 d-block w-100" to="/top/anime/bypopularity/1">
                Most popular
            </router-link>

            <router-link class="text-dark ml-4 my-2 d-block w-100" to="/top/anime/airing/1">
                Top airing
            </router-link>

            <router-link class="text-dark ml-4 my-2 d-block w-100" to="/top/anime/upcoming/1">
                Top upcoming
            </router-link>

            <router-link class="text-dark ml-4 my-2 d-block w-100" to="/top/anime/favorite/1">
                Most favourited
            </router-link>

            <router-link class="text-dark ml-4 my-2 d-block w-100" to="/top/anime/tv/1">
                Top TV
            </router-link>

            <router-link class="text-dark ml-4 my-2 d-block w-100" to="/top/anime/movie/1">
                Top movie
            </router-link>

            <router-link class="text-dark ml-4 my-2 d-block w-100" to="/top/anime/ova/1">
                Top OVA
            </router-link>

            <router-link class="text-dark ml-4 my-2 d-block w-100" to="/top/anime/special/1">
                Top special
            </router-link>

            <router-link class="text-dark ml-4 my-2 d-block w-100" to="/top/anime/genre/1/Action/1">
                Genre search
            </router-link>

             <router-link class="text-dark ml-4 my-2 d-block w-100" to="/top/anime/studio/1/Studio-Pierrot/1">
                Studio search
            </router-link>
        </b-nav-item-dropdown>
    </div>
</template>

<script>
    export default {
        name: 'anime'
    }
</script>
<template>
    <div>
        <b-nav-item-dropdown class="text-light" text="Manga" right>
            <router-link class="text-dark ml-4 my-2 d-block w-100" to="/top/manga/1">
                Top rated
            </router-link>

            <router-link class="text-dark ml-4 my-2 d-block w-100" to="/top/manga/bypopularity/1">
                Most popular
            </router-link>

            <router-link class="text-dark ml-4 my-2 d-block w-100" to="/top/manga/novels/1">
                Top novels
            </router-link>

            <router-link class="text-dark ml-4 my-2 d-block w-100" to="/top/manga/doujin/1">
                Top doujin
            </router-link>

            <router-link class="text-dark ml-4 my-2 d-block w-100" to="/top/manga/manhwa/1">
                Top manhwa
            </router-link>

             <router-link class="text-dark ml-4 my-2 d-block w-100" to="/top/manga/manhua/1">
                Top manhua
            </router-link>

            <router-link class="text-dark ml-4 my-2 d-block w-100" to="/top/manga/oneshots/1">
                Top oneshots
            </router-link>

            <router-link class="text-dark ml-4 my-2 d-block w-100" to="/top/manga/favorite/1">
                Most favourited
            </router-link>

            <router-link class="text-dark ml-4 my-2 d-block w-100" to="/top/manga/genre/1/Action/1">
                Genre search
            </router-link>
        </b-nav-item-dropdown>
    </div>
</template>

<script>
    export default {
        name: 'manga'
    }
</script>
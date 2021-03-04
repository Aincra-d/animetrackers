<template>
  <div>
    <anime-info-modal ref="animeInfoModal"></anime-info-modal>
    <manga-info-modal ref="mangaInfoModal"></manga-info-modal>

    <ui-collapsible
    title="Favourites"
    class="text-dark bg-transparent"
    open>
        <h5
        v-if="favourites.anime.length > 0"
        class="float-left text-light">
            Anime
        </h5>

        <button
        v-if="!$route.params.username && favourites.anime.length > 1"
        @click="reordering.anime=!reordering.anime"
        class="float-right text-light btn btn-link text-light rounded pb-0 my-1">
            <i class="fas fa-arrows-alt mr-1"></i> Reorder
        </button>

        <anime-favourites
        v-if="favourites.anime.length > 0"
        @open-modal="openModal"
        @save-order="saveOrder"
        :animes="favourites.anime"
        :reordering="reordering.anime">
        </anime-favourites>

        <br v-if="favourites.anime.length > 0">

        <h5
        v-if="favourites.manga.length > 0"
        class="float-left text-light">
            Manga
        </h5>

        <button
        v-if="!$route.params.username && favourites.manga.length > 1"
        @click="reordering.manga=!reordering.manga"
        class="float-right text-light btn btn-link text-light rounded pb-0 my-1">
            <i class="fas fa-arrows-alt mr-1"></i> Reorder
        </button>

        <manga-favourites
        v-if="favourites.manga.length > 0"
        @open-modal="openModal"
        @save-order="saveOrder"
        :mangas="favourites.manga"
        :reordering="reordering.manga">
        </manga-favourites>

        <br v-if="favourites.manga.length > 0">

        <h5
        v-if="favourites.characters.length > 0"
        class="float-left text-light">
            Characters
        </h5>

        <button
        v-if="!$route.params.username && favourites.characters.length > 1"
        @click="reordering.characters=!reordering.characters"
        class="float-right text-light btn btn-link text-light rounded pb-0 my-1">
            <i class="fas fa-arrows-alt mr-1"></i> Reorder
        </button>

        <character-favourites
        v-if="favourites.characters.length > 0"
        @save-order="saveOrder"
        :characters="favourites.characters"
        :reordering="reordering.characters">
        </character-favourites>
        
        <br v-if="favourites.characters.length > 0">

        <h5
        v-if="favourites.people.length > 0"
        class="float-left text-light">
            People
        </h5>

        <button
        v-if="!$route.params.username && favourites.people.length > 1"
        @click="reordering.people=!reordering.people"
        class="float-right text-light btn btn-link text-light rounded pb-0 my-1">
            <i class="fas fa-arrows-alt mr-1"></i> Reorder
        </button>

        <people-favourites
        v-if="favourites.people.length > 0"
        @save-order="saveOrder"
        :people="favourites.people"
        :reordering="reordering.people">
        </people-favourites>
    </ui-collapsible>
  </div>
</template>

<script>
import animeFavourites      from '@/components/userInfo/favourites/anime.vue';
import mangaFavourites      from '@/components/userInfo/favourites/manga.vue';
import characterFavourites  from '@/components/userInfo/favourites/characters.vue';
import peopleFavourites     from '@/components/userInfo/favourites/people.vue';
import animeInfoModal       from '@/components/animeInfoModal.vue';
import mangaInfoModal       from '@/components/mangaInfoModal.vue';
export default{
    name: 'favourites',
    props: {
      favourites: Object
    },
    components: {
        'anime-favourites': animeFavourites,
        'manga-favourites': mangaFavourites,
        'character-favourites': characterFavourites,
        'people-favourites': peopleFavourites,
        'anime-info-modal': animeInfoModal,
        'manga-info-modal': mangaInfoModal
    },
    data(){
        return {
            reordering: {
                anime: false,
                manga: false,
                characters: false,
                people: false
            }
        }
    },
    methods: {
        openModal(ref,id,title) {
            ref=="animeInfoModal"
            ? this.$refs.animeInfoModal.openModal(ref,id,title)
            : this.$refs.mangaInfoModal.openModal(ref,id,title)
        },
        saveOrder(ordered_favourites,type){
            let favourites=JSON.parse(localStorage.favourites);
            let new_favourites=[];

            ordered_favourites.forEach(item => new_favourites.push({
                id: item.mal_id,
                image: item.image_url,
                name: item.name
            }));

            favourites[type]=new_favourites;
            this.reordering[type]=false;

            console.log(favourites);

            this.$notify({
                group: 'foo',
                type: 'success',
                title: '<h6>Saved new order of '+type+' favourites.</h6>'
            });

            localStorage.setItem('favourites',JSON.stringify(favourites));
        }
    }
}
</script>

<style>
  @media (max-width: 450px){
  .slider .slider-card, .slider .slider-card img{
    height: 120px !important;
    width: 90px !important;
  }
}

@media (min-width: 450px) and (max-width: 991px){
  .slider .slider-card, .slider .slider-card img{
    height: 140px !important;
    width: 95px !important;
  }
}

@media (min-width: 991px) and (max-width: 1200px){
  .slider .slider-card, .slider .slider-card img{
    height: 140px !important;
    width: 95px !important;
  }
}

@media (min-width: 1200px) and (max-width: 1400px){
  .slider .slider-card, .slider .slider-card img{
    height: 160px !important;
    width: 120px !important;
  }
}

@media (min-width: 1400px){
  .slider .slider-card, .slider .slider-card img{
    height: 170px !important;
    width: 130px !important;
  }
}
</style>
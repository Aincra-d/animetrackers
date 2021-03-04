<template>
    <div>
        <current-season></current-season>
        <top-airing></top-airing>
        <top-rated></top-rated>
        <most-popular></most-popular>
        <top-characters></top-characters>
        <top-people></top-people>
    </div>
</template>

<script>
import topAiring from '@/components/home/sliders/topAiring.vue';
import currentSeason from '@/components/home/sliders/currentSeason.vue';
import topRated from '@/components/home/sliders/topRated.vue';
import mostPopular from '@/components/home/sliders/mostPopular.vue';
import topCharacters from '@/components/home/sliders/topCharacters.vue';
import topPeople from '@/components/home/sliders/topPeople.vue';
export default{
    name: 'sliders',
    components: {
        'top-airing': topAiring,
        'current-season': currentSeason,
        'top-rated': topRated,
        'most-popular': mostPopular,
        'top-characters': topCharacters,
        'top-people': topPeople
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

.slider .item-stat{
  background-color: rgba(0,0,0,0.65);
}
</style>
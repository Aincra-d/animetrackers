<template>
  <div>
    <h3 class="text-light">
      Staff
    </h3>

    <staff v-if="loaded" :screen="screen" :staff="staff"></staff>

    <div v-else class="w-100 text-center font-weight-bold text-light">
      <span>
        <i class="fas fa-spinner fa-2x fa-spin"></i>
      </span>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import staff from '@/components/animeInfo/staff/staff.vue';
  export default{
    name: 'allStaff',
    components: {
      staff
    },
    data(){
      let staff=[];
      axios.get("https://api.jikan.moe/v3/anime/"+this.$route.params.animeid+"/characters_staff")
      .then(response =>{
        console.log(this.$data.loaded)

        console.log(response.data)
        for(let i=0; i<response.data.staff.length; i++){
          staff.push({
            id: response.data.staff[i].mal_id,
            image: response.data.staff[i].image_url,
            name: response.data.staff[i].name,
            positions: response.data.staff[i].positions
          });
        }
        this.$data.loaded=true;
      }).catch(error =>{ console.log(error) });

      return{
        staff: staff,
        loaded: false,
        screen: window.innerWidth
      }
    },
    methods: {
      onResize(){
        this.screen=window.innerWidth
      }
    },
    mounted(){
      window.addEventListener("resize",this.onResize)
    }
  }
</script>
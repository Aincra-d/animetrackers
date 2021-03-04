<template>
    <div>
        <h3 class="text-light">
          Staff
        </h3>

        <staff
        v-if="loaded"
        :staff="staff">
        </staff>

        <div
        v-else
        class="w-100 text-center font-weight-bold text-light">
            <span>
                <i class="fas fa-spinner fa-2x fa-spin"></i>
            </span>
        </div>

        <div
        v-if="loaded && staff.length==0"
        class="w-100 text-center text-light">
            <h6>No staff members have been added.</h6>
        </div>
    </div>
</template>

<script>
  import axios from 'axios';
  import staff from '@/components/titleInfo/staff/staff.vue';
  export default{
    name: 'titleStaff',
    components: {
      staff
    },
    head: {
        title() {
            return {
                inner: this.$route.params.title.split('-').join(' ')+' - Staff',
                separator: '-',
                complement: 'Anime'
            }
        },
        meta(){
            return  [
                {
                    name: 'description',
                    content: 'Check out all the staff members who worked on '+this.$route.params.title.split('-').join(' '),
                    id: this.$route.params.titleid
                }
            ]
        }
    },
    data(){
        return{
            staff: [],
            loaded: false
        }
    },
    created(){
        let staff=[];
        let self=this;

        axios.get("https://api.jikan.moe/v3/anime/"+this.$route.params.titleid+"/characters_staff")
        .then(response =>{

            console.log(response.data)
            for(let i=0; i<response.data.staff.length; i++){
                staff.push({
                    id: response.data.staff[i].mal_id,
                    image: response.data.staff[i].image_url,
                    name: response.data.staff[i].name,
                    positions: response.data.staff[i].positions,
                    favourited: localStorage.favourites
                    ? JSON.parse(localStorage.favourites).people.filter(item => item.id === response.data.staff[i].mal_id).length > 0
                    : false
                });
            }

            self.staff=staff;
            self.loaded=true;
        }).catch(error =>{
            console.log(error);
            this.$notify({
                group: 'foo',
                type: 'error',
                title: '<h6>Failed to load staff. Please try again!</h6>'
            });
            self.loaded=true;
        });
    }
}
</script>
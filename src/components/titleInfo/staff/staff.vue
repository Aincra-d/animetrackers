<template>
    <div>
        <div class="text-center">
            <div :key="person.id" v-for="person in staff" class="d-inline-block align-items-end ml-2 my-1 staff-container position-relative">
                <div>
                    <router-link :to="'/people/'+person.id+'/'+person.name.split(',').join('').split(' ').join('-')">
                        <img :alt="person.name" v-lazy="person.image" class="rounded person-image">
                    </router-link>

                    <button
                    @click="updateFavourite(person.id, person.name, person.image)"
                    class="position-absolute top-0 right-0 bg-transparent border-0 anime-info py-1">
                        <i
                        style="text-shadow: 0px 0px 10px black"
                        :class="person.favourited ? 'text-danger' : 'text-light'"
                        class="fas fa-heart rounded fa-lg">
                        </i>
                    </button> 
                </div>
                <div class="w-100 bg-dark text-light text-left">
                    <router-link :to="'/people/'+person.id+'/'+person.name.split(',').join('').split(' ').join('-')">
                      <span v-if="$root.screen < 991" class="font-12 font-weight-bold text-light">
                        {{person.name.length > 15 ? person.name.substring(0,12)+'...' : person.name}}
                      </span>

                      <span v-else class="font-12 font-weight-bold text-light">
                        {{person.name.length > 20 ? person.name.substring(0,17)+'...' : person.name}}
                      </span>
                    </router-link>
                    <br>
                    <span class="font-12 font-weight-normal text-light">
                      {{person.positions[0].length > 15 ? person.positions[0].substring(0,12)+'...' : person.positions[0]}}
                    </span>
                  </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'staff',
    props: {
        staff: Array
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
            this.staff.filter(person => person.id === id)[0].favourited = !this.staff.filter(person => person.id === id)[0].favourited;
        }
    }
}
</script>

<style scoped>
  @media(max-width: 991px){
    .staff-container .person-image{
      width:105px;
      height:155px;
    }
  }

  @media(min-width: 991px){
    .staff-container .person-image{
      width:150px;
      height:220px;
    }
  }
  .staff-container .person-image{
    vertical-align: bottom;
    object-fit: cover;
  }
  
</style>
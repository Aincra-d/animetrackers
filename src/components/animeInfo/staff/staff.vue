<template>
    <div>
        <div class="text-center">
            <div :key="person.id" v-for="person in staff" class="d-inline-block align-items-end ml-2 my-1 staff-container">
                <div>
                    <router-link :to="'/people/'+person.id+'/'+person.name.split(',').join('').split(' ').join('-')">
                        <img v-lazy="person.image" class="rounded">
                    </router-link>
                </div>
                <div class="w-100 bg-dark text-light text-left">
                    <router-link :to="'/people/'+person.id+'/'+person.name.split(',').join('').split(' ').join('-')">
                      <span v-if="screen<991" class="font-12 font-weight-bold text-light">
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
    }
}
</script>

<style scoped>
  @media(max-width: 991px){
    .staff-container div:first-child img{
      width:105px;
      height:155px;
    }
  }

  @media(min-width: 991px){
    .staff-container div:first-child img{
      width:150px;
      height:220px;
    }
  }
  .staff-container div:first-child img{
    vertical-align: bottom;
    object-fit: cover;
  }
  
</style>
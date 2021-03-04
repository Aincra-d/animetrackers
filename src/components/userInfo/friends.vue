<template>
    <div>
        <h3 class="text-light">
            Friends
        </h3>

        <div
        v-if="loaded"
        class="text-center">
            <div
            :key="friend.name"
            v-for="friend in friends"
            class="d-inline-block ml-2 my-1 friends-container rounded text-left">
                <div>
                    <router-link :to="'/user/'+friend.name">
                        <img
                        :alt="friend.name"
                        v-lazy="friend.image">
                    </router-link>  

                    <div
                    class="w-100 bg-dark text-light"
                    style="opacity: 0.8;">
                        <router-link :to="'/user/'+friend.name">
                            <span
                            v-if="$root.screen<991"
                            class="font-12 font-weight-bold text-light">
                                {{ friend.name.length > 15 ? friend.name.substring(0,12)+'...' : friend.name }}
                            </span>

                            <span
                            v-else
                            class="font-12 font-weight-bold text-light">
                                {{ friend.name.length > 20 ? friend.name.substring(0,17)+'...' : friend.name }}
                            </span>
                        </router-link>

                        <br>

                        <span class="font-12 font-weight-bold text-light">
                            {{ friend.role }}
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <div
        v-else
        class="w-100 text-center text-light">
            <i class="fas fa-spinner fa-2x fa-spin"></i>
        </div>

        <paginate
        :array="friends"
        :perPage="100">
        </paginate>
    </div>
</template>

<script>
    import axios      from 'axios';
    import paginate   from '@/components/paginate.vue';
    export default{
        name: 'friends',
        components: {
            paginate
        },
        data(){
            return{
                friends: [],
                loaded: false,
            }
        },
        methods: {
            getFriends(){
                let current_page=parseInt(this.$route.params.page);
                let friends=[];
                let self=this;

                axios.get("https://api.jikan.moe/v3/user/"+this.$route.params.username+"/friends/"+current_page)
                .then(response =>{
                    console.log(response.data);

                    for(let i=0; i<response.data.friends.length; i++){
                        friends.push({
                            name: response.data.friends[i].username,
                            image: response.data.friends[i].image_url
                        });
                    }

                    self.loaded=true;
                    self.friends=friends;
                }).catch(error =>{
                    console.log(error);
                    this.$notify({
                        group: 'foo',
                        type: 'error',
                        title: '<h6>Failed to load friends. Please try again!</h6>'
                    });
                    self.loaded=true;
                });
            }
        },
        created(){
            this.getFriends();
        }
    }
</script>

<style scoped>
  @media(max-width: 991px){
    .friends-container img{
      width:110px;
      height:155px;
    }
  }

  @media(min-width: 991px){
    .friends-container img{
      width:150px;
      height:220px;
    }
  }
  .friends-container img{
    vertical-align: bottom;
    object-fit: cover;
  }
  
</style>